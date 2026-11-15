// 엔티티 예시 애드온 패키저: BP·RP mcpack 두 개를 하나의 mcaddon으로 묶는다(결정적 출력).
// 사용: tsx --tsconfig site/tsconfig.build.json example-entity/pack.ts [출력 파일]
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { zipSync, type Zippable } from "fflate";
import { buildVersion, stampManifest } from "../example/pack-addon.ts";
import { buildEntityAddonFiles, type FileMap } from "./build.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const MTIME = new Date(1980, 0, 1, 0, 0, 0);
const BP_NAME = "json-ui-react-entity-examples_bp.mcpack";
const RP_NAME = "json-ui-react-entity-examples_rp.mcpack";

function toZip(map: FileMap, manifest: Uint8Array): Uint8Array {
  const all = new Map(map);
  all.set("manifest.json", manifest);
  const z: Zippable = {};
  for (const k of [...all.keys()].sort()) z[k] = [all.get(k)!, { mtime: MTIME, level: 6 }];
  return zipSync(z, { mtime: MTIME });
}

export function packEntityAddon(outFile: string): { bytes: number; entries: string[] } {
  const { bp, rp } = buildEntityAddonFiles();
  const v = buildVersion();
  const stamped = (dir: string): Uint8Array =>
    new TextEncoder().encode(JSON.stringify(stampManifest(JSON.parse(readFileSync(join(HERE, dir, "manifest.json"), "utf8")), v), null, 2) + "\n");
  const outer: Zippable = {
    [BP_NAME]: [toZip(bp, stamped("bp")), { mtime: MTIME, level: 0 }],
    [RP_NAME]: [toZip(rp, stamped("rp")), { mtime: MTIME, level: 0 }],
  };
  const data = zipSync(outer, { mtime: MTIME });
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, data);
  return { bytes: data.length, entries: [BP_NAME, RP_NAME] };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv[2] ?? "dist/json-ui-react-entity-examples.mcaddon";
  const r = packEntityAddon(out);
  console.log(`${out}: ${r.bytes}바이트, 항목 ${r.entries.join(", ")}`);
}
