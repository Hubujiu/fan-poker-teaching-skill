import { copyFile, mkdir } from "node:fs/promises";

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await copyFile(
  new URL("../src/fan-poker.js", import.meta.url),
  new URL("../dist/fan-poker.js", import.meta.url)
);
console.log("Built dist/fan-poker.js");
