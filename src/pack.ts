// 네임스페이스별 정의를 모아 결정적 JSON 파일 묶음을 만든다.
import type { JsonObject, JuiNode } from "./types.ts";
import { render, toBody } from "./render.ts";

export interface Namespace {
  name: string;
  file: string;
  /** key는 `이름` 또는 `이름@부모`. 반환값은 참조용 `네임스페이스.이름`. */
  define(key: string, body: JuiNode | JsonObject): string;
}

export interface Pack {
  ns(name: string, file?: string): Namespace;
  files(): Record<string, string>;
  modify(file: string, namespace: string, key: string, body: JsonObject): void;
  json(file: string): JsonObject;
}

const normFile = (f: string): string => (f.includes("/") ? f : `ui/${f}`);
const baseName = (key: string): string => key.split("@")[0];
const UI_DEFS = "ui/_ui_defs.json";

function isElement(v: unknown): boolean {
  return typeof v === "object" && v !== null && !Array.isArray(v) &&
    "type" in v && "props" in v && typeof (v as any).props === "object";
}

export function createPack(): Pack {
  // 파일 경로 -> JSON 객체 (삽입 순서 유지)
  const docs = new Map<string, JsonObject>();
  const defined = new Map<string, Namespace>(); // ns() 로 만든 파일 (ui_defs 대상)
  const nsByName = new Map<string, Namespace>();

  const doc = (file: string, namespace: string): JsonObject => {
    let d = docs.get(file);
    if (!d) {
      d = { namespace };
      docs.set(file, d);
    } else if (d.namespace !== namespace) {
      throw new Error(`파일 "${file}"은 네임스페이스 "${String(d.namespace)}"용입니다 (요청: "${namespace}")`);
    }
    return d;
  };

  const findKey = (d: JsonObject, base: string): string | undefined =>
    Object.keys(d).find((k) => k !== "namespace" && baseName(k) === base);

  return {
    ns(name, file) {
      const existing = nsByName.get(name);
      const path = normFile(file ?? `${name}.json`);
      if (existing) {
        if (existing.file !== path) throw new Error(`네임스페이스 "${name}"은 이미 "${existing.file}"에 등록됨`);
        return existing;
      }
      if (docs.has(path)) throw new Error(`파일 "${path}"은 이미 사용 중입니다`);
      const d = doc(path, name);
      const ns: Namespace = {
        name,
        file: path,
        define(key, body) {
          const base = baseName(key);
          if (!base) throw new Error(`빈 키는 정의할 수 없습니다: "${key}"`);
          if (findKey(d, base) !== undefined) throw new Error(`네임스페이스 "${name}"에 "${base}"가 이미 정의됨`);
          let out: JsonObject;
          if (body !== null && typeof body === "object" && !Array.isArray(body) && !isElement(body)) {
            out = body as JsonObject;
          } else {
            const nodes = render(body as JuiNode);
            if (nodes.length !== 1) {
              throw new Error(`"${key}"의 본문은 요소 1개여야 합니다 (렌더 결과 ${nodes.length}개)`);
            }
            out = toBody(nodes[0]);
          }
          d[key] = out;
          return `${name}.${base}`;
        },
      };
      nsByName.set(name, ns);
      defined.set(path, ns);
      return ns;
    },
    modify(file, namespace, key, body) {
      const d = doc(normFile(file), namespace);
      const old = findKey(d, baseName(key));
      if (old !== undefined && old !== key) delete d[old];
      d[key] = body;
    },
    json(file) {
      const d = docs.get(normFile(file));
      if (!d) throw new Error(`알 수 없는 파일: "${file}"`);
      return d;
    },
    files() {
      const out: Record<string, string> = {};
      for (const [f, d] of docs) out[f] = JSON.stringify(d, null, 2) + "\n";
      if (defined.size > 0) {
        out[UI_DEFS] = JSON.stringify({ ui_defs: [...defined.keys()] }, null, 2) + "\n";
      }
      return out;
    },
  };
}
