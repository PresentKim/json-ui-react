// 예시 애드온 패키저: BP와 RP를 각각 mcpack으로 묶고 하나의 mcaddon으로 만든다.
// 사용: tsx example/pack-addon.ts [출력 파일]
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
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

export interface BuildVersion {
  /** package.json의 version, 예: "0.1.0" */
  version: string;
  /** 커밋 짧은 해시. git이 없으면 "dev" */
  commit: string;
  /** 커밋 날짜(YYYY-MM-DD). git이 없으면 "" */
  date: string;
}

/**
 * 애드온에 찍을 버전 정보. 같은 커밋이면 같은 값이라 출력이 결정적이다.
 * 환경 변수 JUR_COMMIT, JUR_DATE로 덮어쓸 수 있다.
 */
export function buildVersion(): BuildVersion {
  const pkg = JSON.parse(readFileSync(join(HERE, "..", "package.json"), "utf8")) as { version: string };
  const git = (args: string[]): string => {
    try {
      return execFileSync("git", args, { cwd: HERE, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    } catch {
      return "";
    }
  };
  const commit = process.env.JUR_COMMIT ?? (git(["rev-parse", "--short=7", "HEAD"]) || "dev");
  const date = process.env.JUR_DATE ?? git(["log", "-1", "--format=%cs"]);
  return { version: pkg.version, commit, date };
}

/** "v0.1.0 · 3c40396 · 2026-11-14" 꼴의 표시 문자열 */
export function versionLabel(v: BuildVersion): string {
  return [`v${v.version}`, v.commit, v.date].filter(Boolean).join(" · ");
}

function semver(v: string): [number, number, number] {
  const m = /^(\d+)\.(\d+)\.(\d+)/.exec(v);
  if (!m) throw new Error(`package.json version 형식이 아닙니다: ${v}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/**
 * 매니페스트 이름·설명에 버전을 넣고, header·module·팩 사이 의존 버전을 package.json 버전으로 맞춘다.
 * 게임의 팩 설정 화면은 버전 숫자를 보여 주지 않으므로 이름과 설명에서 구분한다.
 */
export function stampManifest(manifest: any, v: BuildVersion): any {
  const ver = semver(v.version);
  const label = versionLabel(v);
  const m = structuredClone(manifest);
  m.header.name = `${m.header.name} ${`v${v.version}`}`;
  m.header.description = `${m.header.description}\n§7${label}`;
  m.header.version = ver;
  for (const mod of m.modules ?? []) mod.version = ver;
  for (const dep of m.dependencies ?? []) if (dep.uuid) dep.version = ver;
  return m;
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
    const v = buildVersion();
    const enc = (s: string) => new TextEncoder().encode(s);
    for (const pack of [bp, rp]) {
      const raw = JSON.parse(readFileSync(join(HERE, pack === bp ? "bp" : "rp", "manifest.json"), "utf8"));
      pack["manifest.json"] = [enc(JSON.stringify(stampManifest(raw, v), null, 2) + "\n"), { mtime: MTIME, level: 6 }];
    }
    // 게임 안 예시 고르기 창에도 같은 버전을 보인다.
    const script = readFileSync(join(HERE, "bp", "scripts", "main.js"), "utf8").replaceAll("__JUR_VERSION__", versionLabel(v));
    bp["scripts/main.js"] = [enc(script), { mtime: MTIME, level: 6 }];
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
