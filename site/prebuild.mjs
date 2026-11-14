// 사이트 빌드 전 준비: mcaddon 복사, 생성 JSON 발췌, 사진 목록.
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { unzipSync } from "fflate";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const ADDON = join(ROOT, "dist", "json-ui-react-examples.mcaddon");

// 예시 id -> [파일, 키 판별]
const PICK = {
  "router": ["ui/jur.json", (k) => k === "ro_panes" || k.startsWith("ro@")],
  "tabs-inside": ["ui/jur.json", (k) => k.startsWith("ti_tabs") || k.startsWith("ti_pane_0") || k.startsWith("ti_on_0")],
  "tabs-follow": ["ui/jur.json", (k) => k.startsWith("tf_")],
  "tabs-lazy": ["ui/jur.json", (k) => k.startsWith("tl_tabs") || k.startsWith("tl_lazy_1")],
  "slot-grid": ["ui/jur.json", (k) => k.startsWith("sg_")],
  "virtual-list-500": ["ui/jur.json", (k) => k === "vl_body_500" || k.startsWith("v5@")],
  "virtual-list-2000": ["ui/jur.json", (k) => k === "vl_body_2000" || k.startsWith("v2@")],
  "research": ["ui/ffr.json", (k) => k.startsWith("screen_router") || /research/.test(k)],
};
const MAX_LINES = 70;

const text = (u8) => Buffer.from(u8).toString("utf8");

mkdirSync(join(HERE, "static", "downloads"), { recursive: true });
copyFileSync(ADDON, join(HERE, "static", "downloads", "json-ui-react-examples.mcaddon"));

const outer = unzipSync(new Uint8Array(readFileSync(ADDON)));
const rp = unzipSync(outer["json-ui-react-examples_rp.mcpack"]);

mkdirSync(join(HERE, "src", "generated"), { recursive: true });
for (const [id, [file, pick]] of Object.entries(PICK)) {
  const json = JSON.parse(text(rp[file]));
  const keys = Object.keys(json).filter((k) => k !== "namespace" && pick(k)).slice(0, 4);
  const sub = {};
  for (const k of keys) sub[k] = json[k];
  let lines = JSON.stringify(sub, null, 2).split("\n");
  if (lines.length > MAX_LINES) lines = [...lines.slice(0, MAX_LINES), "  ... (이하 생략)"];
  writeFileSync(
    join(HERE, "src", "generated", `${id}.json`),
    JSON.stringify({ id, file, keys, text: lines.join("\n") }, null, 2) + "\n",
  );
}

const photos = {};
const base = join(HERE, "static", "img", "components");
for (const id of Object.keys(PICK)) {
  let files = [];
  try {
    files = readdirSync(join(base, id)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && statSync(join(base, id, f)).isFile()).sort();
  } catch {}
  photos[id] = files;
}
writeFileSync(join(HERE, "src", "photos.json"), JSON.stringify(photos, null, 2) + "\n");
console.log("site/prebuild: 완료");
