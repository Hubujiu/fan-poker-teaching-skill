# Fan Poker Deck v0.2.0

This release turns the first reusable component into a more complete runtime building block. Decks can now follow or override the host page theme, update their card collection without manual DOM reconstruction, and provide richer metadata to TypeScript-aware editors and Custom Elements tooling.

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

Or install it from npm:

```bash
npm install @hubujiu/fan-poker-deck@0.2.0
```

```js
import "@hubujiu/fan-poker-deck";
```

## Highlights

- Stable `theme="auto"`, `theme="light"`, and `theme="dark"` modes
- Runtime collection APIs:
  - `setCards(cards, options)`
  - `appendCard(card)`
  - `updateCard(index, patch)`
  - `removeCard(index)`
  - `clear()`
- New `cardschange` event for synchronizing external state
- Existing `next()`, `previous()`, `goTo()`, and `reset()` navigation APIs
- Expanded Shadow DOM parts for targeted `::part()` styling
- Improved TypeScript declarations
- `custom-elements.json` manifest for editor and tooling integration
- Vue and React integration examples
- Theme and runtime editing example
- Real Chromium smoke tests covering registration, Shadow DOM, themes, navigation, runtime mutations, and events

## Runtime example

```js
const deck = document.querySelector("fan-poker");

deck.setCards([
  { tag: "Docker", title: "Check the service", content: "Confirm that the daemon is running." },
  { tag: "Docker", title: "Run a container", html: "<pre><code>docker run --rm hello-world</code></pre>" }
]);

deck.appendCard({ tag: "Next", title: "Compose", content: "Coordinate multiple containers." });
deck.updateCard(0, { title: "Service status" });
deck.removeCard(1);
```

Only pass trusted content to the `html` field.

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

## Fixes

- Text updates no longer retain stale HTML state
- Nested script elements are removed while card content is cloned into the rendered deck
- Previous-card navigation now travels from the back of the fan toward the front
- Browser testing uses a deterministic animation clock to avoid headless-renderer timing flakes

## Verified distribution

The release workflow verified all public endpoints:

- npm Registry: `@hubujiu/fan-poker-deck@0.2.0`
- jsDelivr: `https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.2.0/dist/fan-poker.js`
- unpkg: `https://unpkg.com/@hubujiu/fan-poker-deck@0.2.0/dist/fan-poker.js`

## Upgrade from v0.1.0

Change the fixed CDN version from `0.1.0` to `0.2.0`, or run:

```bash
npm install @hubujiu/fan-poker-deck@0.2.0
```

Existing `<fan-poker>` and `<fan-card>` markup and navigation APIs remain compatible.

## Compatibility

The component targets modern browsers with Custom Elements, Shadow DOM, ES Modules, ResizeObserver, and CSS `color-mix()` support.

## Documentation

- Chinese guide: `README.md`
- English guide: `README_EN.md`
- Agent instructions: `SKILL.md`
- Theme and runtime example: `examples/theme-and-runtime.html`
- Vue example: `examples/vue-example.vue`
- React example: `examples/react-example.jsx`
