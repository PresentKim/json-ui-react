// 제목 접두 바이트로 화면을 고르는 사전 조회 라우터(collection_panel + factory).
import type { JsonObject, JuiElement } from "../types.ts";

export function ScreenRouter(props: {
  name: string;
  factory: string;
  prefixBytes: number;
  routes: { title: string; id: string; control: string }[];
}): JuiElement {
  const { routes } = props;
  if (routes.length === 0) throw new Error(`ScreenRouter '${props.name}': routes가 비어 있다`);
  const titles = new Set<string>();
  const ids = new Set<string>();
  for (const r of routes) {
    if (titles.has(r.title)) throw new Error(`ScreenRouter '${props.name}': 제목 중복 '${r.title}'`);
    if (ids.has(r.id)) throw new Error(`ScreenRouter '${props.name}': id 중복 '${r.id}'`);
    titles.add(r.title);
    ids.add(r.id);
  }
  const controlIds: JsonObject = {};
  const bag: JsonObject = {};
  for (const r of routes) {
    controlIds[r.id] = `@${r.control}`;
    bag[`#${r.title}`] = [r.id];
  }
  return (
    <collection_panel
      name={props.name}
      size={["100%", "100%"]}
      factory={{ name: props.factory, control_ids: controlIds }}
      property_bag={bag}
      bindings={[
        { binding_name: "#title_text" },
        {
          binding_type: "view",
          source_property_name: `('#' + ('%.${props.prefixBytes}s' * #title_text))`,
          target_property_name: "#collection_length",
        },
      ]}
    />
  );
}
