import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const sourceUrl = new URL("src/fan-poker.js", root);
let source = await readFile(sourceUrl, "utf8");

function replaceOnce(search, replacement, label) {
  if (!source.includes(search)) throw new Error(`v1 patch target missing: ${label}`);
  source = source.replace(search, replacement);
}

replaceOnce(
  'const FALSE_VALUES = new Set(["false", "0", "no", "off"]);',
  'const FALSE_VALUES = new Set(["false", "0", "no", "off"]);\nconst HTMLElementBase = globalThis.HTMLElement ?? class {};',
  "SSR HTMLElement fallback"
);

replaceOnce('class FanCardElement extends HTMLElement {', 'export class FanCardElement extends HTMLElementBase {', "FanCard export");
replaceOnce('class FanPokerElement extends HTMLElement {', 'export class FanPokerElement extends HTMLElementBase {', "FanPoker export");
replaceOnce(
  'this._reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;',
  'this._reducedMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;',
  "SSR matchMedia guard"
);

replaceOnce(
  '    this.setAttribute("role", "region");\n    this._syncLabel();',
  '    this.setAttribute("role", "region");\n    this.setAttribute("aria-roledescription", "interactive card deck");\n    this.setAttribute("aria-keyshortcuts", "ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Space");\n    this._syncLabel();',
  "host accessibility metadata"
);

replaceOnce(
  '  .empty {',
  '  .sr-only {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n\n  .empty {',
  "screen reader utility"
);

replaceOnce(
  '        <div class="deck" part="deck"></div>\n        <div class="empty" part="empty" hidden>Add one or more &lt;fan-card&gt; elements.</div>',
  '        <div class="deck" part="deck"></div>\n        <div class="sr-only" part="status" aria-live="polite" aria-atomic="true"></div>\n        <div class="empty" part="empty" hidden>Add one or more &lt;fan-card&gt; elements.</div>',
  "live region markup"
);

replaceOnce(
  '    this._deck = this.shadowRoot.querySelector(".deck");\n    this._empty = this.shadowRoot.querySelector(".empty");',
  '    this._deck = this.shadowRoot.querySelector(".deck");\n    this._status = this.shadowRoot.querySelector(".sr-only");\n    this._empty = this.shadowRoot.querySelector(".empty");',
  "live region reference"
);

replaceOnce(
  '    article.setAttribute("part", "card");\n    article.dataset.sourceIndex = String(index);',
  '    article.setAttribute("part", "card");\n    article.setAttribute("role", "group");\n    article.setAttribute("aria-roledescription", "card");\n    article.setAttribute("aria-label", `${card.title}, card ${index + 1} of ${this._cards.length}`);\n    article.dataset.sourceIndex = String(index);',
  "rendered card accessibility"
);

replaceOnce(
  '    this._nodes.forEach((node, sourceIndex) => {\n      const offset = this._offsetFor(sourceIndex);\n      this._setPose(node, this._fanPose(offset), offset, offset === 0);\n    });\n  }\n\n  _renderTransition',
  '    this._nodes.forEach((node, sourceIndex) => {\n      const offset = this._offsetFor(sourceIndex);\n      this._setPose(node, this._fanPose(offset), offset, offset === 0);\n    });\n    this._announceCurrent();\n  }\n\n  _announceCurrent() {\n    if (!this._status) return;\n    if (!this.cardCount) {\n      this._status.textContent = "No cards";\n      return;\n    }\n    const card = this._cards[this._index];\n    this._status.textContent = `${card.title}. Card ${this._index + 1} of ${this.cardCount}.`;\n  }\n\n  _renderTransition',
  "current card announcement"
);

replaceOnce(
  'if (!customElements.get("fan-card")) customElements.define("fan-card", FanCardElement);\nif (!customElements.get("fan-poker")) customElements.define("fan-poker", FanPokerElement);\n\nexport { FanCardElement, FanPokerElement };',
  'export function defineFanPokerElements(registry = globalThis.customElements) {\n  if (!registry?.get || !registry?.define) return false;\n  if (!registry.get("fan-card")) registry.define("fan-card", FanCardElement);\n  if (!registry.get("fan-poker")) registry.define("fan-poker", FanPokerElement);\n  return true;\n}\n\ndefineFanPokerElements();',
  "idempotent element registration"
);

await writeFile(sourceUrl, source);
console.log("Applied v1.0.0 SSR, export, and accessibility hardening");
