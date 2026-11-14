// 연구 화면 예제를 빌드해 out/rp/ui/*.json 과 out/bp/scripts/layout.js 를 쓴다.
// 사용: tsx examples/research/build.ts [출력 폴더]
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildResearch } from "./screen.tsx";
import { serverModule } from "../../src/slots.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = process.argv[2] ?? join(root, "out");
const { files, layout } = buildResearch();

const write = (rel: string, text: string): void => {
  const path = join(out, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text, "utf8");
  console.log(`쓰기: ${path}`);
};

for (const [file, text] of Object.entries(files)) write(join("rp", file), text);
write(join("bp", "scripts", "layout.js"), serverModule(layout));
