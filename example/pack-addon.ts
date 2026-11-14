// 예시 애드온 패키저: BP와 RP를 각각 mcpack으로 묶고 하나의 mcaddon으로 만든다.
// 사용: tsx example/pack-addon.ts [출력 파일]
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync, type Zippable } from "fflate";
import { buildExampleRp } from "./build-rp.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const MTIME = new Date(1980, 0, 1, 0, 0, 0); // 결정적 출력을 위한 고정 시각
const BP_NAME = "json-ui-react-examples_bp.mcpack";
const RP_NAME = "json-ui-react-examples_rp.mcpack";

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** 폴더의 파일을 정렬된 순서로 zip 항목에 넣는다. prefix는 zip 안의 하위 경로. */
function collect(root: string, into: Zippable, prefix = ""): void {
  for (const p of walk(root)) {
    const rel = prefix + relative(root, p).split(sep).join("/");
    into[rel] = [new Uint8Array(readFileSync(p)), { mtime: MTIME, level: 6 }];
  }
}

function zip(files: Zippable): Uint8Array {
  return zipSync(files, { mtime: MTIME });
}

export function packAddon(outFile: string): { bytes: number; entries: string[] } {
  const tmp = mkdtempSync(join(tmpdir(), "jur-addon-"));
  try {
    buildExampleRp(tmp);
    const bp: Zippable = {};
    collect(join(HERE, "bp"), bp);
    const rp: Zippable = {};
    collect(join(HERE, "rp"), rp);
    collect(join(tmp, "rp"), rp); // 생성된 ui/*.json
    const entries = [BP_NAME, RP_NAME];
    const outer: Zippable = {
      [BP_NAME]: [zip(sortKeys(bp)), { mtime: MTIME, level: 0 }],
      [RP_NAME]: [zip(sortKeys(rp)), { mtime: MTIME, level: 0 }],
    };
    const data = zip(outer);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, data);
    return { bytes: data.length, entries };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function sortKeys(z: Zippable): Zippable {
  const r: Zippable = {};
  for (const k of Object.keys(z).sort()) r[k] = z[k]!;
  return r;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv[2] ?? "dist/json-ui-react-examples.mcaddon";
  const r = packAddon(out);
  console.log(`${out}: ${r.bytes}바이트, 항목 ${r.entries.join(", ")}`);
}
