<div align="center">

# 🃏 Fan Poker Teaching Skill

**Import one module and turn any topic into an interactive teaching deck.**

A zero-runtime-dependency Web Component and Agent Skill with safe Node and SSR imports.

[![npm](https://img.shields.io/npm/v/%40hubujiu%2Ffan-poker-deck)](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
[![Validate](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[Live demo](https://hubujiu.github.io/fan-poker-teaching-skill/) · [API contract](./docs/API.md) · [Frameworks and SSR](./docs/FRAMEWORKS.md) · [Accessibility](./docs/ACCESSIBILITY.md) · [中文](./README.md)

</div>

## Quick start

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.2/dist/fan-poker.js">
</script>

<fan-poker
  card-width="390px"
  card-height="520px"
  theme="auto"
  aria-label="Git basics lesson">
  <fan-card tag="Git" title="Working tree" symbol="01" accent="#f2a65a">
    Files currently being edited.
  </fan-card>

  <fan-card tag="Git" title="Staging area" symbol="02" accent="#7dcfb6">
    <code>git add</code> prepares selected changes.
  </fan-card>
</fan-poker>
```

The component calculates its card count from the `<fan-card>` children.

## npm

```bash
npm install @hubujiu/fan-poker-deck@1.0.2
```

```js
import "@hubujiu/fan-poker-deck";
```

Stable named exports are also available:

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

The module is safe to import in Node and SSR environments. It automatically registers the elements when `customElements` exists, and `defineFanPokerElements()` is idempotent.

## Current stable release: v1.0.2

- Stable `<fan-poker>` and `<fan-card>` public API
- Safe Node and SSR import
- Exported element constructors and registration function
- Live announcement of the active card and its position
- Host, keyboard-shortcut, card-group, and active-card accessibility semantics
- Focus indication stays inside the active card instead of outlining the full fan stage
- Pointer drags reliably end after mouse release or lost pointer capture
- Wheel input over the active card scrolls its content before any deck navigation
- Node 20, 22, and 24 validation matrix
- Real Chromium interaction and accessibility smoke test
- 48 KiB distribution size budget
- API, framework, accessibility, and versioning documentation

## Runtime API

```js
const deck = document.querySelector("fan-poker");

deck.setCards(cards);
deck.appendCard(card);
deck.updateCard(0, { title: "Updated" });
deck.removeCard(1);
deck.clear();

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();
```

Only pass trusted content to the `html` card field. Prefer `content` for plain text.

## Events

```js
deck.addEventListener("cardchange", (event) => {
  console.log(event.detail.index, event.detail.source);
});

deck.addEventListener("cardschange", (event) => {
  console.log(event.detail.cardCount);
});
```

See [`docs/API.md`](./docs/API.md) for the complete contract.

## Styling

```css
fan-poker {
  --fan-card-width: 420px;
  --fan-card-height: 560px;
  --fan-radius: 18px;
}

fan-poker::part(title) {
  letter-spacing: -0.02em;
}
```

Stable CSS Parts include `stage`, `deck`, `card`, `cover`, `content`, `title`, `body`, `footer`, `status`, and more.

## Framework integration

- Vue: [`examples/vue-example.vue`](./examples/vue-example.vue)
- React: [`examples/react-example.jsx`](./examples/react-example.jsx)
- SSR and Next.js: [`docs/FRAMEWORKS.md`](./docs/FRAMEWORKS.md)

## Development

```bash
npm test
npm run test:browser
npm pack --dry-run
```

The quality gate covers source and distribution equality, the stable API contract, Node/SSR imports, declarations, the Custom Elements Manifest, package size, examples, and Chromium behavior.

MIT © [Hubujiu](https://github.com/Hubujiu)
