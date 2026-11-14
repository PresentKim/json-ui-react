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
