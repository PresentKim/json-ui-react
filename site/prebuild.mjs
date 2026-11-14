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
  "tabs-inside": ["ui/jur.json", (k) => k === "ti_tabs" || k === "ti_on_0" || k.startsWith("ti@")],
  "tabs-follow": ["ui/jur.json", (k) => k === "tf_tabs" || k === "tf_panes" || k.startsWith("tf@")],
  "tabs-lazy": ["ui/jur.json", (k) => k === "tl_tabs" || k === "tl_lazy_1" || k.startsWith("tl@")],
  "slot-grid": ["ui/jur.json", (k) => k === "sg_right" || k === "sg_detail" || k === "sg_panes" || k.startsWith("sg@")],
  "virtual-list-500": ["ui/jur.json", (k) => k === "v5_list" || k.startsWith("v5@")],
  "virtual-list-2000": ["ui/jur.json", (k) => k === "v2_list" || k.startsWith("v2@")],
  // 고수준 연구 화면: 칸 0의 상세 본문·상세 판과 탭, 판 정의(jur 네임스페이스의 re_ 정의)
  "research": ["ui/jur.json", (k) => k === "re_needed_body_0" || k === "re_needed_detail_0" || k === "re_tabs" || k === "re_panes"],
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

// "서버에서 열기" 절용: 생성 서버 모듈(행동팩 scripts/generated/screens.js)의 LAYOUTS에서 화면별 배치를 뽑는다.
{
  const bp = unzipSync(outer["json-ui-react-examples_bp.mcpack"]);
  const mod = text(bp["scripts/generated/screens.js"]);
  const m = /export const LAYOUTS = (\{[\s\S]*?\n\});/.exec(mod);
  if (!m) throw new Error("site/prebuild: 생성 모듈에서 LAYOUTS를 찾지 못했습니다");
  const layouts = JSON.parse(m[1]);
  for (const id of Object.keys(PICK)) {
    if (!layouts[id]) throw new Error(`site/prebuild: LAYOUTS에 ${id}가 없습니다`);
    let lines = JSON.stringify({ [id]: layouts[id] }, null, 2).split("\n");
    if (lines.length > 40) lines = [...lines.slice(0, 40), "  ... (이하 생략)"];
    writeFileSync(join(HERE, "src", "generated", `${id}.layout.json`), JSON.stringify({ id, text: lines.join("\n") }, null, 2) + "\n");
  }
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
// 최상위 `export interface <name>` 한 개를 (주석 포함) 잘라 낸다.
const cutInterface = (code, name) => {
  const lines = code.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`export interface ${name} `));
  if (start < 0) throw new Error(`site/prebuild: ${name} 인터페이스를 찾지 못했습니다`);
  let end = start;
  while (end < lines.length && lines[end] !== "}") end++;
  return lines.slice(start, end + 1).join("\n") + "\n";
};
// 최상위 `function <name>` (export 없음, main.js)를 (앞 주석 포함) 잘라 낸다.
const cutPlainFunction = (code, name) => {
  const lines = code.split("\n");
  const start = lines.findIndex((l) => l.startsWith(`function ${name}(`));
  if (start < 0) throw new Error(`site/prebuild: ${name} 함수를 찾지 못했습니다`);
  let from = start;
  while (from > 0 && /^\s*\/\//.test(lines[from - 1])) from--;
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
  "research": [["example/screens/research.tsx"]],
};
for (const [id, parts] of Object.entries(SOURCES)) {
  const list = parts.map(([rel, fn]) => ({
    file: fn ? `${rel} (${fn})` : rel,
    code: fn ? cutFunction(readSrc(rel), fn) : readSrc(rel),
  }));
  writeFileSync(join(HERE, "src", "generated", `${id}.source.json`), JSON.stringify(list, null, 2) + "\n");
}

// research 페이지의 서버 쪽: 예시 행동팩(main.js)에서 레코드를 만드는 부분과 openScreen을 부르는 부분.
{
  const main = readSrc("example/bp/scripts/main.js");
  const list = ["researchRecord", "openResearch"].map((fn) => ({ file: `example/bp/scripts/main.js (${fn})`, code: cutPlainFunction(main, fn) }));
  writeFileSync(join(HERE, "src", "generated", "research.server.json"), JSON.stringify(list, null, 2) + "\n");
}

// "컴포넌트 직접 만들기" 페이지: 고수준 컴포넌트 IconRow의 소스(src/high/record.tsx)와 낮춘 결과(칸 0 상세 본문의 mats 줄).
{
  const rec = readSrc("src/high/record.tsx");
  const list = [
    { file: "src/high/record.tsx (IconRowProps)", code: cutInterface(rec, "IconRowProps") },
    { file: "src/high/record.tsx (IconRow)", code: cutFunction(rec, "IconRow") },
  ];
  writeFileSync(join(HERE, "src", "generated", "custom-component.source.json"), JSON.stringify(list, null, 2) + "\n");
  const jur = JSON.parse(text(rp["ui/jur.json"]));
  const body = jur["re_needed_body_0"];
  if (!body) throw new Error("site/prebuild: ui/jur.json에 re_needed_body_0이 없습니다");
  const picked = body.controls.filter((c) => /^mats(_head)?(@|$)/.test(Object.keys(c)[0]));
  if (picked.length !== 2) throw new Error("site/prebuild: re_needed_body_0에서 mats 줄을 찾지 못했습니다");
  let lines = JSON.stringify({ controls: picked }, null, 2).split("\n");
  if (lines.length > MAX_LINES) lines = [...lines.slice(0, MAX_LINES), "  ... (이하 생략)"];
  writeFileSync(join(HERE, "src", "generated", "custom-component.json"), JSON.stringify({ id: "custom-component", file: "ui/jur.json (re_needed_body_0)", text: lines.join("\n") }, null, 2) + "\n");
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
