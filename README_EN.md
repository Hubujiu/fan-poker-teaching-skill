# Fan Poker Deck

A dependency-free Web Component for fan-shaped decks of **fully user-defined card worlds**.

Starting with v2, the component no longer imposes a cover, index, tag, title, body, or footer. `<fan-poker>` owns only the physical boundary, rounded clipping, fan layout, transition choreography, and gesture arbitration. Every `<fan-card>` becomes an isolated Shadow DOM world.

## CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js">
</script>
```

```html
<fan-poker card-width="390px" card-height="520px" aria-label="Learning deck">
  <fan-card aria-label="Dashboard world">
    <style>
      :host {
        display: block;
        min-height: 100%;
        background: #fff8ed;
        color: #171717;
        font-family: system-ui, sans-serif;
      }

      main {
        min-width: 100%;
        min-height: 100%;
        padding: 28px;
      }
    </style>

    <main>
      <h1>You control the entire card face</h1>
      <button>Interactive card control</button>
    </main>
  </fan-card>
</fan-poker>
```

## npm

```bash
npm install @hubujiu/fan-poker-deck@2.0.0
```

```js
import "@hubujiu/fan-poker-deck";
```

The module remains safe to import in Node and SSR environments.

## v2 card worlds

- Each card is rendered inside its own Shadow Root
- User markup owns the complete card face
- Overflow scrolls inside the card boundary
- Native scrollbars are hidden
- Floating scrollbars appear near the right or bottom edge
- Horizontal overflow wins gesture arbitration over deck dragging
- Direct horizontal panning and the floating thumb move in the same direction
- The component draws no focus indicator
- Buttons, links, forms, editors, and nested components remain interactive

## Navigation

Use deck dragging only when the active card has no horizontal overflow. You can always click an exposed rear card, use the keyboard, or call `next()`, `previous()`, and `goTo(index)`.

See [API](./docs/API.md), [accessibility](./docs/ACCESSIBILITY.md), [framework integration](./docs/FRAMEWORKS.md), and the [v1 to v2 migration guide](./docs/VERSIONING.md).

## Current stable release: v2.0.0

Pin v1.0.3 when a page still depends on the old fixed card template.

## License

MIT
