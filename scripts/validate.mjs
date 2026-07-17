import { access, readFile, readdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const htmlRoots = ["assets", "examples", "."];
const files = new Set();
let failed = false;

function report(name, errors) {
  if (errors.length) {
    failed = true;
    console.error(`✗ ${name}`);
    for (const error of errors) console.error(`  - ${error}`);
  } else {
    console.log(`✓ ${name}`);
  }
}

// Validate Agent Skill frontmatter and referenced bundled resources.
const skillText = await readFile(new URL("SKILL.md", root), "utf8");
const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const skillErrors = [];

if (!skillText.startsWith("---\n")) {
  skillErrors.push("missing YAML frontmatter");
} else {
  const end = skillText.indexOf("\n---\n", 4);
  if (end < 0) {
    skillErrors.push("frontmatter is not closed");
  } else {
    const frontmatter = skillText.slice(4, end);
    const name = frontmatter.match(/^name:\s*([^\s#]+)\s*$/m)?.[1];
    const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim();
    if (!name) skillErrors.push("frontmatter name is missing");
    if (!description) skillErrors.push("frontmatter description is missing");
    if (name && name !== packageJson.name) {
      skillErrors.push(`frontmatter name ${name} does not match package name ${packageJson.name}`);
    }
    if (name && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      skillErrors.push("frontmatter name must use lowercase kebab-case");
    }
  }
}

const referencedPaths = [...skillText.matchAll(/`((?:assets|examples|references|scripts)\/[^`]+)`/g)].map(match => match[1]);
for (const path of new Set(referencedPaths)) {
  try {
    await access(new URL(path, root));
  } catch {
    skillErrors.push(`referenced resource is missing: ${path}`);
  }
}
report("SKILL.md", skillErrors);

for (const directory of htmlRoots) {
  const url = new URL(`${directory}/`, root);
  try {
    for (const entry of await readdir(url, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".html")) files.add(new URL(entry.name, url));
    }
  } catch {
    // Optional directory.
  }
}

const forbidden = [
  /class=["'][^"']*\btoolbar\b/,
  /id=["']counter["']/,
  /id=["']motionState["']/,
  /id=["']pageNav["']/,
  /id=["']speedControl["']/,
  /class=["'][^"']*\bpage-nav\b/,
  /class=["'][^"']*\bpage-button\b/
];

const temp = await mkdtemp(join(tmpdir(), "fan-poker-validate-"));

for (const file of [...files].sort((a, b) => a.pathname.localeCompare(b.pathname))) {
  const html = await readFile(file, "utf8");
  const name = relative(new URL(".", root).pathname, file.pathname);
  const errors = [];
  const isDeckTemplate = name === "assets/fan-poker-base.html" || html.includes("AI CONTENT ZONE");

  if (isDeckTemplate) {
    if (!html.includes("AI CONTENT ZONE")) errors.push("missing AI CONTENT ZONE marker");
    if (!/const\s+cardData\s*=\s*\[\s*\{/s.test(html)) errors.push("cardData is missing or empty");
    if (!html.includes("window.fanPokerDeck")) errors.push("public deck API is missing");
  }

  for (const pattern of forbidden) {
    if (pattern.test(html)) errors.push(`removed UI returned: ${pattern}`);
  }

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
  for (let index = 0; index < scripts.length; index += 1) {
    const scriptPath = join(temp, `${name.replaceAll("/", "-")}-${index}.js`);
    await writeFile(scriptPath, scripts[index]);
    const result = spawnSync(process.execPath, ["--check", scriptPath], { encoding: "utf8" });
    if (result.status !== 0) errors.push(`script ${index + 1} syntax error: ${result.stderr.trim()}`);
  }

  report(name, errors);
}

await rm(temp, { recursive: true, force: true });
if (failed) process.exit(1);
console.log(`\nValidated SKILL.md and ${files.size} HTML files.`);
