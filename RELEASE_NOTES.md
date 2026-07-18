# Fan Poker Deck v1.0.2

This patch fixes three interaction defects without changing the public `1.x` API.

## Fixed

- The focus-visible outline is now drawn inside the current card instead of around the entire fan stage.
- Mouse drags are cancelled when the primary button is released unexpectedly or pointer capture is lost.
- Wheel input over the current card scrolls its content and no longer changes cards.
- Nested scroll detection is limited to scroll containers inside the current card.

## Compatibility

Markup, attributes, methods, events, CSS custom properties, CSS Parts, TypeScript declarations, and SSR behavior remain compatible with v1.0.0 and v1.0.1.

```bash
npm install @hubujiu/fan-poker-deck@1.0.2
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.2/dist/fan-poker.js">
</script>
```

## Verification

- Node 20, 22, and 24 validation
- Node and SSR import checks
- npm package payload and size checks
- Chromium interaction and accessibility smoke tests
- npm Registry, jsDelivr, and unpkg verification through Trusted Publishing
