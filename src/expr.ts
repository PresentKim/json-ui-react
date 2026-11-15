// 식 조립 도우미. 리터럴 검증과 접두사 비교, 부재 검사.
export function lit(s: string): string {
  if (/[*@']/.test(s)) {
    throw new Error(`EXP-36: 리터럴에 '*', '@', "'"를 쓸 수 없다: ${s}`);
  }
  return `'${s}'`;
}

// 접두사 비교. '%.Ns'의 N은 UTF-8 바이트 길이.
export function prefixEq(prop: string, prefix: string): string {
  const n = Buffer.byteLength(prefix, "utf8");
  return `(('%.${n}s' * ${prop}) = ${lit(prefix)})`;
}

// marker를 뺐을 때 값이 그대로면 marker가 없는 것.
export function lacks(prop: string, marker: string): string {
  return `((${prop} - ${lit(marker)}) = ${prop})`;
}

// ---- 타입 있는 식 빌더 ----------------------------------------------------
// 모든 이항 연산은 괄호로 감싼다(우선순위 함정 회피, EXP-29/EXP-37).
import type { Diagnostic } from "./lint.ts";

export class Expr {
  constructor(readonly src: string) {}
  private bin(op: string, o: Expr | number): Expr {
    return new Expr(`(${this.src} ${op} ${(typeof o === "number" ? E.num(o) : o).src})`);
  }
  add(o: Expr | number): Expr { return this.bin("+", o); }
  sub(o: Expr | number): Expr { return this.bin("-", o); }
  mul(o: Expr | number): Expr { return this.bin("*", o); }
  div(o: Expr | number): Expr { return this.bin("/", o); }
  mod(o: Expr | number): Expr { return this.bin("%", o); }
  eq(o: Expr | number): Expr { return this.bin("=", o); }
  // 엔진에 `!=`가 없어 not으로 감싼다.
  neq(o: Expr | number): Expr { return E.not(this.eq(o)); }
  gt(o: Expr | number): Expr { return this.bin(">", o); }
  lt(o: Expr | number): Expr { return this.bin("<", o); }
  gte(o: Expr | number): Expr { return this.bin(">=", o); }
  lte(o: Expr | number): Expr { return this.bin("<=", o); }
  and(o: Expr): Expr { return this.bin("and", o); }
  or(o: Expr): Expr { return this.bin("or", o); }
  not(): Expr { return E.not(this); }
  // 문자열 빼기로 접두/표식 제거. text는 lit 검증(EXP-36).
  strip(text: string): Expr { return new Expr(`(${this.src} - ${lit(text)})`); }
  toString(): string { return this.src; }
}

export const E = {
  prop(name: `#${string}` | `$${string}`): Expr {
    // 속성 이름의 `-`는 뺄셈이 된다(EXP-36 토큰 규칙).
    if (!/^[#$][\w:.]+$/.test(name)) throw new Error(`EXP-36: 속성 이름이 올바르지 않다: ${name}`);
    return new Expr(name);
  },
  num(n: number): Expr {
    if (!Number.isFinite(n)) throw new Error(`EXP-27: 유한한 수만 쓸 수 있다: ${n}`);
    const s = String(n);
    if (/e/i.test(s)) throw new Error(`EXP-27/DBG-30: 지수 표기는 쓸 수 없다: ${s}`);
    // 앞자리 0이 있는 소수는 정수로 읽힌다 -> 점으로 시작한다.
    return new Expr(s.replace(/^(-?)0\./, "$1."));
  },
  str(s: string): Expr { return new Expr(lit(s)); },
  // '%.Ns' * e: 앞 N바이트만 남긴다.
  fmt(n: number, e: Expr): Expr {
    if (!Number.isInteger(n) || n < 1) throw new Error(`EXP-09: N은 1 이상의 정수여야 한다: ${n}`);
    return new Expr(`('%.${n}s' * ${e.src})`);
  },
  not(e: Expr): Expr { return new Expr(`(not ${e.src})`); },
};

// 식 문자열의 텍스트 검사.
export function checkExpr(src: string, path: string): Diagnostic[] {
  const out: Diagnostic[] = [];
  const add = (rule: string, level: Diagnostic["level"], message: string) =>
    out.push({ rule, level, path, message });
  // 따옴표 리터럴을 분리해 바깥 텍스트에는 자리표시 Q만 남긴다.
  let outer = "";
  const lits: string[] = [];
  let i = 0;
  while (i < src.length) {
    if (src[i] === "'") {
      const j = src.indexOf("'", i + 1);
      if (j < 0) { add("EXP-36", "error", "따옴표가 닫히지 않았다"); outer += "Q"; break; }
      lits.push(src.slice(i + 1, j));
      outer += "Q";
      i = j + 1;
    } else outer += src[i++];
  }
  for (const l of lits) {
    if (/[*@]/.test(l)) add("EXP-36", "error", `리터럴에 '*', '@'를 쓸 수 없다: '${l}'`);
  }
  // 괄호 균형 + 그룹별 비교 연산자 수(사슬 비교).
  const stack: number[] = [0];
  let bad = false;
  const toks = outer.match(/<=|>=|[()<>]|[^()<>]+/g) ?? [];
  for (const t of toks) {
    if (t === "(") stack.push(0);
    else if (t === ")") {
      if (stack.length === 1) { bad = true; continue; }
      stack.pop();
    } else if (t === "<" || t === ">" || t === "<=" || t === ">=") {
      if (++stack[stack.length - 1] === 2) {
        add("EXP-28", "error", "비교를 사슬로 쓸 수 없다: ((a < b) and (b < c))로 쓴다");
      }
    }
  }
  if (bad || stack.length > 1) add("EXP-36", "error", "괄호가 맞지 않는다");
  // 앞자리 있는 소수 리터럴(EXP-27).
  for (const m of outer.matchAll(/(?<![\w#$:.])\d+\.\d+/g)) {
    add("EXP-27", "error", `앞자리가 있는 소수 리터럴 '${m[0]}'는 정수로 읽힌다: '.${m[0].split(".")[1]}'처럼 점으로 시작한다`);
  }
  // 지수 표기 리터럴(DBG-30).
  for (const m of outer.matchAll(/(?<![\w#$:.])\d*\.?\d+e[+-]?\d+/gi)) {
    add("DBG-30", "error", `지수 표기 '${m[0]}'는 쓸 수 없다`);
  }
  // 문자열 리터럴에 % 연산(EXP-32).
  if (/Q\s*%|%\s*Q/.test(outer)) add("EXP-32", "error", "문자열에 `%`를 쓸 수 없다");
  return out;
}
