# Fan Poker Deck v0.1.0

The first public Web Component release turns the original standalone teaching animation into a reusable, one-line import.

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

Or install it from npm:

```bash
npm install @hubujiu/fan-poker-deck
```

## Highlights

- Native `<fan-poker>` and `<fan-card>` Custom Elements
- Zero runtime dependencies
- Shadow DOM style isolation
- Transparent and responsive host layout
- Single-sided fan with full-card rendering and depth-aware recycling
- Click, drag, wheel and keyboard input
- Adaptive animation speed and shortest-path navigation
- Width, height and initial-card configuration
- Dynamic `cards` property
- `next()`, `previous()`, `goTo()` and `reset()` methods
- `ready`, `cardchangestart` and `cardchange` events
- TypeScript declarations
- Agent Skill instructions that generate compact component markup
- Legacy standalone HTML fallback for fully offline output

## Verified distribution

The release workflow verified all three public endpoints:

- npm Registry: `@hubujiu/fan-poker-deck@0.1.0`
- jsDelivr: `https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js`
- unpkg: `https://unpkg.com/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js`

## Compatibility

The component targets modern browsers with support for Custom Elements, Shadow DOM, ES Modules and ResizeObserver.

## Full documentation

- Chinese guide: `README.md`
- English guide: `README_EN.md`
- Agent instructions: `SKILL.md`
- Basic markup example: `examples/basic.html`
- JavaScript API example: `examples/javascript-api.html`
