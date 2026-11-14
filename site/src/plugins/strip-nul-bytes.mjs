// React 18.3의 renderToPipeableStream은 여러 바이트 글자(한글, →)가 2048바이트 버퍼 끝에 걸리면
// 버퍼의 남은 0바이트까지 내보낸다(react-dom-server writeStringChunk, facebook/react#24985, #31134).
// 그래서 정적 HTML의 글자 사이에 NUL이 끼므로 빌드가 끝난 뒤 HTML에서 NUL 바이트를 지운다.
import fs from "node:fs/promises";
import path from "node:path";

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

export async function stripNulBytes(outDir) {
  let changed = 0;
  for (const f of await htmlFiles(outDir)) {
    const buf = await fs.readFile(f);
    if (!buf.includes(0)) continue;
    await fs.writeFile(f, buf.filter((b) => b !== 0));
    changed++;
  }
  return changed;
}

export default function stripNulBytesPlugin() {
  return {
    name: "strip-nul-bytes",
    async postBuild({ outDir }) {
      await stripNulBytes(outDir);
    },
  };
}
