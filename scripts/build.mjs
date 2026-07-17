import { copyFile, mkdir } from "node:fs/promises";

const root = new URL("../", import.meta.url);
await mkdir(new URL("dist/", root), { recursive: true });
await copyFile(new URL("src/fan-poker.js", root), new URL("dist/fan-poker.js", root));
console.log("Built dist/fan-poker.js from src/fan-poker.js");
