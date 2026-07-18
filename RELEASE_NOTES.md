# Fan Poker Deck v2.0.0

This major release turns every card into an isolated, fully user-defined world.

## Added

- Complete card-face HTML and CSS ownership
- One Shadow Root per card world
- Real vertical and horizontal overflow inside the card boundary
- Hidden native scrollbars
- Floating glass-style scrollbars near the right and bottom edges
- Direct horizontal content panning with same-direction thumb feedback
- Gesture arbitration between horizontal card content and deck navigation
- Exported scrollbar CSS Parts and styling variables

## Removed

- Fixed cover, index, tag, title, body, and footer layout
- Built-in card theme structure
- Component focus outline
- Wheel-based deck navigation

## Migration

v1 pages should either pin `@hubujiu/fan-poker-deck@1.0.3` or move their complete visual structure into each `<fan-card>`.

```bash
npm install @hubujiu/fan-poker-deck@2.0.0
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js">
</script>
```

## Verification

- Node 20, 22, and 24 validation
- Node and SSR import checks
- Chromium custom-world, overflow, floating-scrollbar, and gesture tests
- npm package payload and size checks
- npm Registry, jsDelivr, and unpkg verification through Trusted Publishing
