// 사이트 빌드 전 준비: mcaddon 복사, 생성 JSON 발췌, 사진 목록.
import { copyFileSync, mkdirSync, rmSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
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

// example/pack-addon.ts의 buildVersion()과 같은 규칙으로 버전을 계산한다.
const git = (args) => {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
};
const version = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;
const commit = process.env.JUR_COMMIT ?? (git(["rev-parse", "--short=7", "HEAD"]) || "dev");
const date = process.env.JUR_DATE ?? git(["log", "-1", "--format=%cs"]);
const file = `json-ui-react-examples-v${version}-${commit}.mcaddon`;
const bytes = statSync(ADDON).size;
const label = [`v${version}`, commit, date].filter(Boolean).join(" · ");

const dlDir = join(HERE, "static", "downloads");
mkdirSync(dlDir, { recursive: true });
for (const f of readdirSync(dlDir)) {
  if (/^json-ui-react-examples.*\.mcaddon$/.test(f)) rmSync(join(dlDir, f), { force: true });
}
copyFileSync(ADDON, join(dlDir, file));
mkdirSync(join(HERE, "src", "generated"), { recursive: true });
writeFileSync(join(HERE, "src", "generated", "addon.json"), JSON.stringify({ file, version, commit, date, label, bytes }, null, 2) + "\n");

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

// "JSX로 쓰기" 절용 원본 소스: 손으로 복사하지 않고 빌드할 때 example/ 과 examples/ 에서 읽는다.
const readSrc = (rel) => readFileSync(join(ROOT, rel), "utf8").replace(/\s+$/, "") + "\n";
// 최상위 `export function <name>` 한 개를 (주석 포함) 줄 단위로 잘라 낸다.
const cutFunction = (code, name) => {
  const lines = code.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`export function ${name}(`));
  if (start < 0) throw new Error(`site/prebuild: ${name} 함수를 찾지 못했습니다`);
  let from = start;
  while (from > 0 && /^\s*(\/\/|\/\*\*|\*)/.test(lines[from - 1])) from--;
  let end = start;
  while (end < lines.length && lines[end] !== "}") end++;
  return lines.slice(from, end + 1).join("\n") + "\n";
};
const SOURCES = {
  "router": [["example/screens/router.tsx"]],
  "tabs-inside": [["example/screens/tabs-inside.tsx"]],
  "tabs-follow": [["example/screens/tabs-follow.tsx"]],
  "tabs-lazy": [["example/screens/tabs-lazy.tsx"]],
  "slot-grid": [["example/screens/slot-grid.tsx"]],
  "virtual-list-500": [["example/screens/virtual-list-500.tsx"], ["example/screens/virtual-list.tsx"]],
  "virtual-list-2000": [["example/screens/virtual-list-2000.tsx"], ["example/screens/virtual-list.tsx"]],
  "research": [["examples/research/screen.tsx", "defineResearch"], ["examples/research/items.tsx", "defineItems"]],
};
for (const [id, parts] of Object.entries(SOURCES)) {
  const list = parts.map(([rel, fn]) => ({
    file: fn ? `${rel} (${fn})` : rel,
    code: fn ? cutFunction(readSrc(rel), fn) : readSrc(rel),
  }));
  writeFileSync(join(HERE, "src", "generated", `${id}.source.json`), JSON.stringify(list, null, 2) + "\n");
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
