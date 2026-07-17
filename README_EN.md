<div align="center">

# 🃏 Fan Poker Teaching Skill

**Import one module and turn any topic into an interactive teaching deck.**

A dependency-free Web Component and Agent Skill for tutorials, lessons, onboarding flows and revision cards.

[![npm](https://img.shields.io/npm/v/%40hubujiu%2Ffan-poker-deck?color=e96d2f)](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
[![No runtime dependencies](https://img.shields.io/badge/runtime%20dependencies-0-2ea44f)](./package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[Live demo](https://hubujiu.github.io/fan-poker-teaching-skill/) · [npm](https://www.npmjs.com/package/@hubujiu/fan-poker-deck) · [Basic example](./examples/basic.html) · [JavaScript API](./examples/javascript-api.html) · [中文](./README.md)

</div>

## Quick start

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js">
</script>

<fan-poker card-width="390px" card-height="520px">
  <fan-card tag="Git" title="Working tree" symbol="01" accent="#f2a65a">
    Files currently being edited.
  </fan-card>

  <fan-card tag="Git" title="Staging area" symbol="02" accent="#7dcfb6">
    <code>git add</code> prepares selected changes.
  </fan-card>
</fan-poker>
```

The card count is derived automatically from the number of `<fan-card>` children.

Install from npm when using a bundler:

```bash
npm install @hubujiu/fan-poker-deck
```

```js
import "@hubujiu/fan-poker-deck";
```

Pin a concrete CDN version in production so future releases do not silently change page behavior.

## API

```js
const deck = document.querySelector("fan-poker");

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();
```

The component also supports a dynamic `cards` property and emits `ready`, `cardchangestart`, and `cardchange` events.

## Why a Web Component

- Works in plain HTML and modern frameworks
- Uses Shadow DOM for style isolation
- Has no runtime dependencies
- Keeps the original fan, recycling, drag, wheel and keyboard interactions
- Lets AI generate short semantic markup instead of duplicating the animation engine
- Preserves the legacy standalone HTML template for fully offline output

## Agent Skill

After installing this repository as a skill, ask your agent:

```text
Use fan-poker-teaching-skill to create an interactive lesson about deploying Docker on Linux.
```

The Skill generates the published npm CDN import and concise `<fan-poker>` / `<fan-card>` markup by default. It uses the bundled standalone template only when a fully offline single file is explicitly required.

## Package

Published as [`@hubujiu/fan-poker-deck`](https://www.npmjs.com/package/@hubujiu/fan-poker-deck), version `0.1.0`.

Both fixed-version CDN endpoints are verified by the release workflow:

```text
https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js
https://unpkg.com/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js
```

## Development

```bash
npm test
```

MIT © [Hubujiu](https://github.com/Hubujiu)
