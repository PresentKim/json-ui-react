// 엔티티 예시 팩 빌드: 화면 4개를 한 네임스페이스(jure)로 묶고, 에셋 4벌을 BP 하나·RP 하나로 합친다.
// 파일 시스템에는 쓰지 않고 { 경로: 내용 } 맵만 돌려준다(쓰기·압축은 pack.ts).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildEntityScreens } from "../src/entity/build.tsx";
import menuLab from "./screens/menu-lab.tsx";
import { research } from "./screens/research.tsx";
import { e2048 } from "./screens/e2048.tsx";
import { matchmaking } from "./screens/matchmaking.tsx";

const HERE = dirname(fileURLToPath(import.meta.url));
export const NAMESPACE = "jure";
export const SCREEN_IDS = ["menu-lab", "research", "e2048", "matchmaking"] as const;
const ITEM_TEXTURE = "textures/item_texture.json";

export type FileMap = Map<string, Uint8Array>;
export interface EntityAddonFiles {
  bp: FileMap;
  rp: FileMap;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const enc = (s: string): Uint8Array => new TextEncoder().encode(s);

function same(a: Uint8Array, b: Uint8Array): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** 경로 충돌: 내용이 같으면 한 벌만 두고, 다르면 던진다. */
function put(map: FileMap, path: string, data: Uint8Array, from: string): void {
  const prev = map.get(path);
  if (prev && !same(prev, data)) throw new Error(`에셋 경로 충돌(내용이 다름): ${path} (${from})`);
  map.set(path, data);
}

function addDir(map: FileMap, root: string, from: string, itemTextures: Record<string, unknown>): void {
  let names: string[] = [];
  try {
    names = walk(root);
  } catch {
    return;
  }
  for (const p of names) {
    const rel = p.slice(root.length + 1).split("\\").join("/");
    const data = new Uint8Array(readFileSync(p));
    if (rel === ITEM_TEXTURE) {
      // 화면마다 하나씩 있는 item_texture.json은 texture_data를 합친다.
      const json = JSON.parse(readFileSync(p, "utf8")) as { texture_data: Record<string, unknown> };
      for (const [k, v] of Object.entries(json.texture_data)) {
        if (k in itemTextures && JSON.stringify(itemTextures[k]) !== JSON.stringify(v)) throw new Error(`아이콘 이름 충돌: ${k} (${from})`);
        itemTextures[k] = v;
      }
    } else put(map, rel, data, from);
  }
}

export function buildEntityAddonFiles(): EntityAddonFiles {
  const built = buildEntityScreens([menuLab, research, e2048, matchmaking], { namespace: NAMESPACE, strict: false }) // menu-lab은 원본의 상수 막대(ENT-CLIP)를 일부러 남겨 경고로 낮춘다;
  const bp: FileMap = new Map();
  const rp: FileMap = new Map();
  const itemTextures: Record<string, unknown> = {};
  for (const id of SCREEN_IDS) {
    addDir(bp, join(HERE, "assets", id, "bp"), id, {});
    addDir(rp, join(HERE, "assets", id, "rp"), id, itemTextures);
  }
  rp.set(ITEM_TEXTURE, enc(JSON.stringify({ resource_pack_name: "jure_entity_examples", texture_name: "atlas.items", texture_data: itemTextures }, null, 2) + "\n"));
  for (const [file, text] of Object.entries(built.files)) put(rp, file, enc(text), "생성 UI");
  put(rp, "pack_icon.png", new Uint8Array(readFileSync(join(HERE, "rp", "pack_icon.png"))), "pack_icon");
  put(bp, "pack_icon.png", new Uint8Array(readFileSync(join(HERE, "rp", "pack_icon.png"))), "pack_icon");
  put(bp, "scripts/generated/entity-screens.js", enc(built.serverModule), "생성 서버 모듈");
  put(bp, "scripts/runtime.js", new Uint8Array(readFileSync(join(HERE, "..", "src", "entity", "runtime.js"))), "runtime");
  for (const p of walk(join(HERE, "bp", "scripts"))) {
    const rel = "scripts/" + p.slice(join(HERE, "bp", "scripts").length + 1).split("\\").join("/");
    put(bp, rel, new Uint8Array(readFileSync(p)), "예시 스크립트");
  }
  return { bp, rp };
}
