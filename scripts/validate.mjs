import { readFile, access } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const source = await readFile(new URL("src/fan-poker.js", root), "utf8");
const dist = await readFile(new URL("dist/fan-poker.js", root), "utf8");
const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const skill = await readFile(new URL("SKILL.md", root), "utf8");
const readme = await readFile(new URL("README.md", root), "utf8");
const requiredFiles = [
  "examples/basic.html",
  "examples/javascript-api.html",
  "types/fan-poker.d.ts"
];

const errors = [];
if (source !== dist) errors.push("dist/fan-poker.js is not built from src/fan-poker.js");
for (const marker of [
  'customElements.define("fan-poker"',
  'customElements.define("fan-card"',
  "next()",
  "previous()",
  "goTo(e)",
  'new CustomEvent("cardchange"',
  "attachShadow"
]) if (!source.includes(marker)) errors.push(`component marker missing: ${marker}`);

for (const forbidden of ["page-nav", "page-button", 'id="counter"', 'class="toolbar"']) {
  if (source.includes(forbidden)) errors.push(`removed UI returned: ${forbidden}`);
}

if (pkg.version !== "0.1.0") errors.push("package version must be 0.1.0");
if (pkg.name !== "@hubujiu/fan-poker-deck") errors.push("unexpected package name");
if (!skill.includes("<fan-poker") || !skill.includes("<fan-card")) errors.push("SKILL.md does not teach the Web Component API");
if (!readme.includes("dist/fan-poker.js")) errors.push("README does not include the component quick start");

for (const file of requiredFiles) {
  try { await access(new URL(file, root)); }
  catch { errors.push(`required file missing: ${file}`); }
}

for (const file of ["src/fan-poker.js", "dist/fan-poker.js", "scripts/build.mjs", "scripts/validate.mjs"]) {
  const result = spawnSync(process.execPath, ["--check", new URL(file, root).pathname], { encoding: "utf8" });
  if (result.status !== 0) errors.push(`${file}: ${result.stderr.trim()}`);
}

if (errors.length) {
  errors.forEach(error => console.error(`✗ ${error}`));
  process.exit(1);
}
console.log("✓ source and dist match");
console.log("✓ Web Component API markers present");
console.log("✓ Skill and README describe the component API");
console.log("✓ package metadata is ready for v0.1.0");
