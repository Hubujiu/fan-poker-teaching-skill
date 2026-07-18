# Fan Poker Deck v1.0.3

This patch removes the visible frame that followed every active card while preserving an accessible keyboard focus indicator.

## Fixed

- The full active card is no longer outlined when the deck has keyboard focus.
- Keyboard focus is indicated with a compact outline around the active card's top-left index badge.
- The original fixes for pointer cleanup and card-content wheel scrolling remain unchanged.

## Compatibility

There are no public API, markup, event, CSS custom property, CSS Part, TypeScript, or SSR contract changes.

```bash
npm install @hubujiu/fan-poker-deck@1.0.3
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.3/dist/fan-poker.js">
</script>
```

## Verification

- Node 20, 22, and 24 validation
- Chromium interaction and accessibility smoke tests
- npm package payload and size checks
- npm Registry, jsDelivr, and unpkg verification through Trusted Publishing
