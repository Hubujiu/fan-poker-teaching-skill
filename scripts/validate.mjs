import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const files = ["assets/fan-poker-base.html", "index.html"];
const forbidden = [
  /class=["'][^"']*\btoolbar\b/,
  /id=["']counter["']/,
  /id=["']motionState["']/,
  /id=["']pageNav["']/,
  /id=["']speedControl["']/,
  /class=["'][^"']*\bpage-nav\b/,
  /class=["'][^"']*\bpage-button\b/
];

let failed = false;
const temp = await mkdtemp(join(tmpdir(), "fan-poker-validate-"));

for (const file of files) {
  const html = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  const errors = [];
  if (file.includes("fan-poker-base")) {
    if (!html.includes("AI CONTENT ZONE")) errors.push("missing AI CONTENT ZONE");
    if (!/const\s+cardData\s*=\s*\[\s*\{/s.test(html)) errors.push("cardData missing or empty");
    if (!html.includes("window.fanPokerDeck")) errors.push("public API missing");
    for (const pattern of forbidden) if (pattern.test(html)) errors.push(`removed UI returned: ${pattern}`);
  }
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
  for (let i = 0; i < scripts.length; i++) {
    const path = join(temp, `${i}.js`);
    await writeFile(path, scripts[i]);
    const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
    if (result.status !== 0) errors.push(result.stderr.trim());
  }
  if (errors.length) {
    failed = true;
    console.error(`✗ ${file}`);
    errors.forEach(error => console.error(`  - ${error}`));
  } else console.log(`✓ ${file}`);
}

await rm(temp, { recursive: true, force: true });
if (failed) process.exit(1);
