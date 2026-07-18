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
const readme = await readFile(new URL("README.md", root), "utf8");
const readmeEnglish = await readFile(new URL("README_EN.md", root), "utf8");
const skill = await readFile(new URL("SKILL.md", root), "utf8");
const frameworks = await readFile(new URL("docs/FRAMEWORKS.md", root), "utf8");
const versioning = await readFile(new URL("docs/VERSIONING.md", root), "utf8");
const releaseNotes = await readFile(new URL("RELEASE_NOTES.md", root), "utf8");
const landingPage = await readFile(new URL("index.html", root), "utf8");
const errors = [];

if (source !== dist) errors.push("dist/fan-poker.js does not match src/fan-poker.js");
if (pkg.name !== "@hubujiu/fan-poker-deck") errors.push("unexpected package name");
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(pkg.version)) errors.push("package version must be valid semantic versioning");
if (pkg.publishConfig?.access !== "public") errors.push("publishConfig.access must be public");
if (pkg.publishConfig?.provenance !== true) errors.push("publishConfig.provenance must be true");
if (pkg.customElements !== "./custom-elements.json") errors.push("customElements manifest is not declared");
if (!pkg.exports?.["./package.json"]) errors.push("package.json export is missing");
if (!Array.isArray(pkg.sideEffects) || !pkg.sideEffects.includes("./dist/fan-poker.js")) errors.push("registration side effect is not declared");

const sourceMarkers = [
  'export class FanPokerElement extends HTMLElementBase',
  'export class FanCardElement extends HTMLElementBase',
  'export function defineFanPokerElements',
  'globalThis.HTMLElement ?? class {}',
  'globalThis.matchMedia?.',
  'registry = globalThis.customElements',
  'aria-roledescription", "interactive card deck',
  'aria-keyshortcuts',
  'part="status"',
  'aria-live="polite"',
  'aria-roledescription", "card',
  'setCards(cards',
  'appendCard(card)',
  'updateCard(index, patch)',
  'removeCard(index)',
  'new CustomEvent("cardschange"',
  'setAttribute("part", "card")',
  'attachShadow'
];
for (const marker of sourceMarkers) {
  if (!source.includes(marker)) errors.push(`component marker missing: ${marker}`);
}

for (const marker of [
  "FanPokerTheme",
  "FanPokerReadyDetail",
  "FanPokerChangeDetail",
  "FanPokerCardsChangeDetail",
  "FanPokerElement",
  "FanCardElement",
  "defineFanPokerElements",
  "setCards",
  "appendCard",
  "updateCard",
  "removeCard",
  "cardschange"
]) {
  if (!types.includes(marker)) errors.push(`type declaration marker missing: ${marker}`);
}

const modules = manifest.modules || [];
const declarations = modules.flatMap((module) => module.declarations || []);
const tags = declarations.map((item) => item.tagName).filter(Boolean);
const exports = modules.flatMap((module) => module.exports || []).map((item) => item.name);
const pokerDeclaration = declarations.find((item) => item.tagName === "fan-poker");
const parts = (pokerDeclaration?.cssParts || []).map((item) => item.name);

if (!tags.includes("fan-poker") || !tags.includes("fan-card")) errors.push("custom-elements.json is missing component tags");
for (const name of ["FanPokerElement", "FanCardElement", "defineFanPokerElements"]) {
  if (!exports.includes(name)) errors.push(`custom-elements.json export missing: ${name}`);
}
for (const part of ["stage", "deck", "card", "title", "body", "status", "empty"]) {
  if (!parts.includes(part)) errors.push(`stable CSS Part missing: ${part}`);
}

const requiredFiles = [
  "docs/API.md",
  "docs/ACCESSIBILITY.md",
  "docs/FRAMEWORKS.md",
  "docs/VERSIONING.md",
  "docs/PUBLISHING.md",
  "examples/basic.html",
  "examples/javascript-api.html",
  "examples/theme-and-runtime.html",
  "examples/vue-example.vue",
  "examples/react-example.jsx",
  "scripts/node-smoke.mjs",
  "scripts/size-check.mjs",
  "SKILL.md",
  "README.md",
  "README_EN.md"
];
for (const file of requiredFiles) {
  try { await access(new URL(file, root)); }
  catch { errors.push(`required file missing: ${file}`); }
}

const currentPackagePin = `${pkg.name}@${pkg.version}`;
for (const [name, document] of [
  ["README.md", readme],
  ["README_EN.md", readmeEnglish],
  ["SKILL.md", skill],
  ["docs/FRAMEWORKS.md", frameworks],
  ["docs/VERSIONING.md", versioning],
  ["index.html", landingPage]
]) {
  if (!document.includes(currentPackagePin)) {
    errors.push(`${name} must reference the current package version ${currentPackagePin}`);
  }
}
if (!releaseNotes.startsWith(`# Fan Poker Deck v${pkg.version}\n`)) {
  errors.push(`RELEASE_NOTES.md must target v${pkg.version}`);
}

for (const forbidden of ["page-nav", "page-button", 'id="counter"', 'class="toolbar"']) {
  if (source.includes(forbidden)) errors.push(`removed component UI returned: ${forbidden}`);
}

for (const file of [
  "src/fan-poker.js",
  "dist/fan-poker.js",
  "scripts/build.mjs",
  "scripts/validate.mjs",
  "scripts/node-smoke.mjs",
  "scripts/size-check.mjs"
]) {
  const result = spawnSync(process.execPath, ["--check", new URL(file, root).pathname], { encoding: "utf8" });
  if (result.status !== 0) errors.push(`${file}: ${result.stderr.trim()}`);
}

const temp = await mkdtemp(join(tmpdir(), "fan-poker-v1-"));
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
console.log("✓ stable v1 module exports and SSR guards are present");
console.log("✓ accessibility semantics and live status are present");
console.log("✓ TypeScript and Custom Elements metadata match the v1 contract");
console.log(`✓ documentation and package metadata consistently reference v${pkg.version}`);
