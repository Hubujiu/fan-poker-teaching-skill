const moduleUrl = new URL("../dist/fan-poker-fixed.js", import.meta.url);
const component = await import(`${moduleUrl.href}?node-smoke=${Date.now()}`);

const failures = [];

if (typeof component.FanPokerElement !== "function") failures.push("FanPokerElement export is missing");
if (typeof component.FanCardElement !== "function") failures.push("FanCardElement export is missing");
if (typeof component.defineFanPokerElements !== "function") failures.push("defineFanPokerElements export is missing");
if (component.defineFanPokerElements() !== false) failures.push("Node import should not register elements without a registry");

const definitions = new Map();
const fakeRegistry = {
  get(name) { return definitions.get(name); },
  define(name, constructor) {
    if (definitions.has(name)) throw new Error(`duplicate definition: ${name}`);
    definitions.set(name, constructor);
  }
};

if (component.defineFanPokerElements(fakeRegistry) !== true) failures.push("custom registry definition failed");
if (component.defineFanPokerElements(fakeRegistry) !== true) failures.push("idempotent custom registry definition failed");
if (definitions.get("fan-poker") !== component.FanPokerElement) failures.push("fan-poker registered with wrong constructor");
if (definitions.get("fan-card") !== component.FanCardElement) failures.push("fan-card registered with wrong constructor");

if (failures.length) {
  failures.forEach((failure) => console.error(`✗ ${failure}`));
  process.exit(1);
}

console.log("✓ Node/SSR import is safe");
console.log("✓ public constructors and idempotent registration are available");
