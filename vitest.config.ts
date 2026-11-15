import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^json-ui-react\/jsx-(dev-)?runtime$/, replacement: src("jsx-runtime.ts") },
      { find: /^json-ui-react$/, replacement: src("index.ts") },
      { find: /^json-ui-react\/(.+)$/, replacement: src("$1") },
    ],
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "json-ui-react",
  },
  test: {
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
  },
});
