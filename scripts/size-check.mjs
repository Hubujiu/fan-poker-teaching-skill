import { stat } from "node:fs/promises";

const file = new URL("../dist/fan-poker.js", import.meta.url);
const { size } = await stat(file);
const budget = 48 * 1024;

if (size > budget) {
  console.error(
    `✗ dist/fan-poker.js is ${size} bytes, above the ${budget}-byte v2 budget`
  );
  process.exit(1);
}

console.log(
  `✓ distribution size ${size} bytes is within the ${budget}-byte budget`
);
