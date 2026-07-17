<div align="center">

# 🃏 Fan Poker Teaching Skill

**Import one module and turn any topic into an interactive teaching deck.**

A zero-runtime-dependency Web Component and Agent Skill for lessons, tutorials, onboarding flows and revision cards.

[![npm](https://img.shields.io/npm/v/%40hubujiu%2Ffan-poker-deck)](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[Live demo](https://hubujiu.github.io/fan-poker-teaching-skill/) · [Basic example](./examples/basic.html) · [Runtime API](./examples/theme-and-runtime.html) · [中文](./README.md)

</div>

## Quick start

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.2.0/dist/fan-poker.js">
</script>

<fan-poker card-width="390px" card-height="520px" theme="auto">
  <fan-card tag="Git" title="Working tree" symbol="01" accent="#f2a65a">
    Files currently being edited.
  </fan-card>
  <fan-card tag="Git" title="Staging area" symbol="02" accent="#7dcfb6">
    <code>git add</code> prepares selected changes.
  </fan-card>
</fan-poker>
```

Or install from npm:

```bash
npm install @hubujiu/fan-poker-deck
```

```js
import "@hubujiu/fan-poker-deck";
```

## v0.2.0

- Stable `auto`, `light`, and `dark` themes
- Runtime card methods: `setCards`, `appendCard`, `updateCard`, `removeCard`, and `clear`
- `cardschange` event
- Expanded CSS parts for targeted styling
- Improved TypeScript declarations
- Custom Elements Manifest
- Vue and React examples

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

Only pass trusted content to the `html` card field.

## Styling

Use CSS custom properties for broad theming and `::part()` for targeted changes:

```css
fan-poker { --fan-radius: 18px; }
fan-poker::part(title) { letter-spacing: -0.02em; }
```

## Framework examples

- Vue: [`examples/vue-example.vue`](./examples/vue-example.vue)
- React: [`examples/react-example.jsx`](./examples/react-example.jsx)

## Development

```bash
npm test
npm pack --dry-run
```

MIT © [Hubujiu](https://github.com/Hubujiu)
