// 골든 스냅샷: 세 예제의 생성 결과를 메모리/임시 폴더에 만들어 골든 파일과 비교한다.
// UPDATE_GOLDEN=1 이면 골든 파일을 다시 쓴다. 바이너리는 sha256 으로만 비교한다.
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildExampleRp } from "../../example/build-rp.ts";
import { buildResearch } from "../../examples/research/screen.tsx";
import { serverModule } from "../../src/slots.ts";
import { buildEntityAddonFiles } from "../../example-entity/build.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const GOLDEN = join(HERE, "golden");
const UPDATE = process.env.UPDATE_GOLDEN === "1";
const BINARY = /\.(png|jpg|jpeg|ogg|wav|tga|zip|mcpack)$/i;

type Out = Map<string, Uint8Array>;
const enc = (s: string): Uint8Array => new TextEncoder().encode(s);

function walk(dir: string, base = dir, out: string[] = []): string[] {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, base, out);
    else out.push(p.slice(base.length + 1).split("\\").join("/"));
  }
  return out;
}

function packExample(): Out {
  const tmp = mkdtempSync(join(tmpdir(), "jur-golden-"));
  try {
    buildExampleRp(tmp);
    const m: Out = new Map();
    for (const rel of walk(tmp)) m.set(rel, new Uint8Array(readFileSync(join(tmp, rel))));
    return m;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function research(): Out {
  const { files, layout } = buildResearch();
  const m: Out = new Map();
  for (const [f, t] of Object.entries(files)) m.set(`rp/${f}`, enc(t));
  m.set("bp/scripts/layout.js", enc(serverModule(layout)));
  return m;
}

function entity(): Out {
  const { bp, rp } = buildEntityAddonFiles();
  const m: Out = new Map();
  for (const [k, v] of bp) m.set(`bp/${k}`, v);
  for (const [k, v] of rp) m.set(`rp/${k}`, v);
  return m;
}

const sha = (b: Uint8Array): string => createHash("sha256").update(b).digest("hex");
const examples: Record<string, () => Out> = { "pack-addon": packExample, research, entity };

describe("golden", () => {
  for (const [name, build] of Object.entries(examples)) {
    it(name, () => {
      const out = build();
      const dir = join(GOLDEN, name);
      if (UPDATE) {
        rmSync(dir, { recursive: true, force: true });
        for (const [rel, data] of out) {
          const p = join(dir, rel);
          mkdirSync(dirname(p), { recursive: true });
          writeFileSync(p, data);
        }
      }
      expect([...out.keys()].sort()).toEqual(walk(dir));
      for (const [rel, data] of out) {
        const gold = new Uint8Array(readFileSync(join(dir, rel)));
        if (BINARY.test(rel)) expect(sha(data), rel).toBe(sha(gold));
        else expect(new TextDecoder().decode(data), rel).toBe(new TextDecoder().decode(gold));
      }
    });
  }
});
