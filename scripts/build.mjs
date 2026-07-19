import { copyFile, mkdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
await mkdir(new URL("dist/", root), { recursive: true });
await Promise.all([
  copyFile(new URL("src/fan-poker.js", root), new URL("dist/fan-poker.js", root)),
  copyFile(
    new URL("src/fan-poker-fixed.js", root),
    new URL("dist/fan-poker-fixed.js", root)
  )
]);
console.log("Built dist entries from src");
