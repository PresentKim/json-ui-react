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
