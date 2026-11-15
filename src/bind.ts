// 바인딩 객체 빌더. 키 순서 고정, undefined 키 생략.
import type { JsonObject } from "./types";

function clean(o: Record<string, string | undefined>): JsonObject {
  const r: JsonObject = {};
  for (const [k, v] of Object.entries(o)) if (v !== undefined) r[k] = v;
  return r;
}

export function view(source: string, target: string, opts: { condition?: string; control?: string } = {}): JsonObject {
  return clean({
    binding_type: "view",
    binding_condition: opts.condition,
    source_control_name: opts.control,
    source_property_name: source,
    target_property_name: target,
  });
}

export function collection(name: string, collection: string, condition?: string): JsonObject {
  return clean({
    binding_type: "collection",
    binding_collection_name: collection,
    binding_name: name,
    binding_condition: condition,
  });
}

export function details(collection: string, condition?: string): JsonObject {
  return clean({
    binding_type: "collection_details",
    binding_collection_name: collection,
    binding_condition: condition,
  });
}

export function global(name: string, condition?: string): JsonObject {
  return clean({ binding_name: name, binding_condition: condition });
}

// ───────── 타입 바인딩 (T9) ─────────
// checkBindings가 구현하는 규칙:
//  - BND-05: view 소스 식에 `#속성`이 없으면(리터럴뿐) 배열 전체가 버려진다 (warn). `$변수` 소스는 BND-12라 건너뜀
//  - BND-36: view 의 source/target 속성 이름 누락, collection 의 binding_collection_name 누락 (error)
//  - BND-01: view 대상(target_property_name)이 `#`로 시작하지 않음 (warn)
//  - BND-22/BND-35: 모르는 binding_condition 값 (error, 조용히 none 으로 동작하므로)
//  - BND-02: 알 수 없는 binding_type (error)
import type { Diagnostic } from "./lint";

export type BindingCondition =
  | "always"
  | "always_when_visible"
  | "visible"
  | "once"
  | "none"
  | "visibility_changed";

const CONDITIONS: readonly string[] = ["always", "always_when_visible", "visible", "once", "none", "visibility_changed"];

export interface GlobalBinding {
  binding_type?: "global";
  binding_name: `#${string}`;
  binding_name_override?: string;
  binding_condition?: BindingCondition;
}
export interface ViewBinding {
  binding_type: "view";
  source_property_name: string;
  target_property_name: `#${string}`;
  source_control_name?: string;
  resolve_sibling_scope?: boolean;
  binding_condition?: BindingCondition;
}
export interface CollectionBinding {
  binding_type: "collection";
  binding_collection_name: string;
  binding_name: string;
  binding_name_override?: string;
  binding_condition?: BindingCondition;
}
export interface CollectionDetailsBinding {
  binding_type: "collection_details";
  binding_collection_name: string;
  binding_collection_prefix?: string;
  binding_condition?: BindingCondition;
}
export type BindingObj = GlobalBinding | ViewBinding | CollectionBinding | CollectionDetailsBinding;

type Opt = { condition?: BindingCondition };

/** undefined 키를 뺀 새 객체 (키 순서는 입력 순서) */
function pick<T extends object>(o: Record<string, unknown>): T {
  const r: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) if (v !== undefined) r[k] = v;
  return r as T;
}

export const bind = {
  global(name: `#${string}`, opts: Opt & { override?: string } = {}): GlobalBinding {
    return pick({
      binding_name: name,
      binding_name_override: opts.override,
      binding_condition: opts.condition,
    });
  },
  view(
    source: string,
    target: `#${string}`,
    opts: Opt & { control?: string; sibling?: boolean } = {},
  ): ViewBinding {
    return pick({
      binding_type: "view",
      binding_condition: opts.condition,
      source_control_name: opts.control,
      resolve_sibling_scope: opts.sibling,
      source_property_name: source,
      target_property_name: target,
    });
  },
  collection(name: string, collection: string, opts: Opt & { override?: string } = {}): CollectionBinding {
    return pick({
      binding_type: "collection",
      binding_collection_name: collection,
      binding_name: name,
      binding_name_override: opts.override,
      binding_condition: opts.condition,
    });
  },
  details(collection: string, opts: Opt & { prefix?: string } = {}): CollectionDetailsBinding {
    return pick({
      binding_type: "collection_details",
      binding_collection_name: collection,
      binding_collection_prefix: opts.prefix,
      binding_condition: opts.condition,
    });
  },
};

/** 바인딩 목록 하나에서 검사 가능한 규칙 (위 주석 참고). path 는 목록 경로 */
export function checkBindings(list: BindingObj[], path: string): Diagnostic[] {
  const out: Diagnostic[] = [];
  const add = (rule: string, level: Diagnostic["level"], p: string, message: string) =>
    out.push({ rule, level, path: p, message });
  list.forEach((raw, i) => {
    const b = raw as unknown as Record<string, unknown>;
    const p = `${path}[${i}]`;
    const type = (b.binding_type as string | undefined) ?? "global";
    if (!["global", "view", "collection", "collection_details", "none"].includes(type)) {
      add("BND-02", "error", `${p}.binding_type`, `알 수 없는 binding_type '${type}' (조용히 global 로 동작)`);
    }
    const cond = b.binding_condition;
    if (cond !== undefined && !(typeof cond === "string" && (CONDITIONS.includes(cond) || cond.startsWith("$")))) {
      add("BND-22", "error", `${p}.binding_condition`, `알 수 없는 binding_condition '${String(cond)}' (조용히 none 으로 동작)`);
    }
    if (type === "view") {
      const src = b.source_property_name;
      const tgt = b.target_property_name;
      if (typeof src !== "string" || src === "") {
        add("BND-36", "error", `${p}.source_property_name`, "source_property_name 이 없다 (Must define a source property name)");
      } else if (!src.startsWith("$") && !src.includes("#")) {
        add("BND-05", "warn", `${p}.source_property_name`, `view 소스 식 '${src}' 에 #속성이 없다: bindings 배열 전체가 버려진다`);
      }
      if (typeof tgt !== "string" || tgt === "") {
        add("BND-36", "error", `${p}.target_property_name`, "target_property_name 이 없다 (Must define a target property name)");
      } else if (!tgt.startsWith("#") && !tgt.startsWith("$")) {
        add("BND-01", "warn", `${p}.target_property_name`, `view 대상 '${tgt}' 은 '#'로 시작해야 한다`);
      }
    } else if (type === "collection" || type === "collection_details") {
      if (typeof b.binding_collection_name !== "string" || b.binding_collection_name === "") {
        add("BND-36", "error", `${p}.binding_collection_name`, "binding_collection_name 이 없다 (Must define a collection name)");
      }
    }
  });
  return out;
}
