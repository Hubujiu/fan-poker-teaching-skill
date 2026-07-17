<div align="center">

# 🃏 Fan Poker Teaching Skill

**Import one module and turn any topic into an interactive teaching deck.**

A dependency-free Web Component and Agent Skill for tutorials, lessons, onboarding flows and revision cards.

[Live demo](https://hubujiu.github.io/fan-poker-teaching-skill/) · [Basic example](./examples/basic.html) · [JavaScript API](./examples/javascript-api.html) · [中文](./README.md)

</div>

## Quick start

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/Hubujiu/fan-poker-teaching-skill@main/dist/fan-poker.js">
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

The card count is derived from the number of `<fan-card>` children.

## API

```js
const deck = document.querySelector("fan-poker");
deck.next();
deck.previous();
deck.goTo(3);
deck.reset();
```

The component also supports a `cards` property and emits `ready`, `cardchangestart`, and `cardchange` events.

## Why a Web Component

- Works in plain HTML and modern frameworks
- Uses Shadow DOM for style isolation
- Has no runtime dependencies
- Keeps the original fan, recycling, drag, wheel and keyboard interactions
- Lets AI generate short semantic markup instead of duplicating the animation engine
- Preserves the legacy standalone HTML template for fully offline output

## Package

The repository is prepared as `@hubujiu/fan-poker-deck` version `0.1.0`. npm publication requires the owner's npm authentication.

## Development

```bash
npm test
```

MIT © [Hubujiu](https://github.com/Hubujiu)
