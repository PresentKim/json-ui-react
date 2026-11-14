import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import plugin, { stripNulBytes } from '../src/plugins/strip-nul-bytes.mjs';

test('removes NUL bytes from built HTML only', async () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'nul-'));
  fs.mkdirSync(path.join(d, 'a', 'b'), { recursive: true });
  fs.writeFileSync(path.join(d, 'a', 'b', 'index.html'), Buffer.from('<p>실측 \0\0사진 → ok</p>'));
  fs.writeFileSync(path.join(d, 'index.html'), '<p>clean</p>');
  fs.writeFileSync(path.join(d, 'x.bin'), Buffer.from([1, 0, 2]));
  assert.equal(await stripNulBytes(d), 1);
  assert.equal(fs.readFileSync(path.join(d, 'a', 'b', 'index.html'), 'utf8'), '<p>실측 사진 → ok</p>');
  assert.deepEqual([...fs.readFileSync(path.join(d, 'x.bin'))], [1, 0, 2]);
  await plugin().postBuild({ outDir: d });
  assert.equal(await stripNulBytes(d), 0);
});
