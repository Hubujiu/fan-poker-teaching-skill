import { access, readFile, readdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("src/fan-poker.js", root), "utf8");
const dist = await readFile(new URL("dist/fan-poker.js", root), "utf8");
const types = await readFile(new URL("types/fan-poker.d.ts", root), "utf8");
const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const manifest = JSON.parse(await readFile(new URL("custom-elements.json", root), "utf8"));
const errors = [];

if (source !== dist) errors.push("dist/fan-poker.js does not match src/fan-poker.js");
if (pkg.name !== "@hubujiu/fan-poker-deck") errors.push("unexpected package name");
if (pkg.version !== "0.2.0") errors.push("package version must be 0.2.0");
if (pkg.publishConfig?.access !== "public") errors.push("publishConfig.access must be public");
if (pkg.customElements !== "./custom-elements.json") errors.push("customElements manifest is not declared");

const sourceMarkers = [
  'customElements.define("fan-poker"',
  'customElements.define("fan-card"',
  'theme="dark"',
  'theme="light"',
  "setCards(cards",
  "appendCard(card)",
  "updateCard(index, patch)",
  "removeCard(index)",
  "clear()",
  'new CustomEvent("cardschange"',
  'setAttribute("part", "card")',
  "attachShadow"
];
for (const marker of sourceMarkers) {
  if (!source.includes(marker)) errors.push(`component marker missing: ${marker}`);
}

for (const marker of ["FanPokerTheme", "setCards", "appendCard", "updateCard", "removeCard", "cardschange"]) {
  if (!types.includes(marker)) errors.push(`type declaration marker missing: ${marker}`);
}

const tags = manifest.modules?.flatMap((module) => module.declarations || []).map((item) => item.tagName).filter(Boolean) || [];
if (!tags.includes("fan-poker") || !tags.includes("fan-card")) errors.push("custom-elements.json is missing component tags");

const requiredFiles = [
  "examples/basic.html",
  "examples/javascript-api.html",
  "examples/theme-and-runtime.html",
  "examples/vue-example.vue",
  "examples/react-example.jsx",
  "SKILL.md",
  "README.md",
  "README_EN.md"
];
for (const file of requiredFiles) {
  try { await access(new URL(file, root)); }
  catch { errors.push(`required file missing: ${file}`); }
}

for (const forbidden of ["page-nav", "page-button", 'id="counter"', 'class="toolbar"']) {
  if (source.includes(forbidden)) errors.push(`removed component UI returned: ${forbidden}`);
}

for (const file of ["src/fan-poker.js", "dist/fan-poker.js", "scripts/build.mjs", "scripts/validate.mjs"]) {
  const result = spawnSync(process.execPath, ["--check", new URL(file, root).pathname], { encoding: "utf8" });
  if (result.status !== 0) errors.push(`${file}: ${result.stderr.trim()}`);
}

const temp = await mkdtemp(join(tmpdir(), "fan-poker-v02-"));
for (const directory of ["examples", "scripts"]) {
  for (const entry of await readdir(new URL(`${directory}/`, root), { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const html = await readFile(new URL(`${directory}/${entry.name}`, root), "utf8");
    const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
    for (let index = 0; index < scripts.length; index += 1) {
      const path = join(temp, `${entry.name}-${index}.mjs`);
      await writeFile(path, scripts[index]);
      const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
      if (result.status !== 0) errors.push(`${entry.name} inline script ${index + 1}: ${result.stderr.trim()}`);
    }
  }
}
await rm(temp, { recursive: true, force: true });

if (errors.length) {
  errors.forEach((error) => console.error(`✗ ${error}`));
  process.exit(1);
}

console.log("✓ source and dist match");
console.log("✓ v0.2.0 theme and runtime APIs are present");
console.log("✓ TypeScript and Custom Elements metadata are present");
console.log("✓ framework and runtime examples are present");
console.log("✓ package metadata is ready for v0.2.0");
