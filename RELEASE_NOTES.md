# Fan Poker Deck v1.0.0

The first stable release turns the component API into a documented compatibility contract. It preserves the v0.2 card, theme, navigation, runtime, event, and styling APIs while adding safe Node/SSR imports, explicit module exports, stronger accessibility semantics, and a broader automated quality gate.

## Quick start

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js">
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

Or install it from npm:

```bash
npm install @hubujiu/fan-poker-deck@1.0.0
```

## Stable module exports

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

The package is safe to import in Node and SSR environments. It automatically registers the elements when a browser custom-element registry is available. Explicit registration is idempotent and may target a compatible registry.

## Highlights

- Stable `1.x` API contract
- Safe Node and SSR import
- Exported element constructors and registration function
- Existing themes, dynamic-card methods, navigation methods, and events remain compatible
- Polite live-region announcement of the active card and deck position
- Interactive-deck, keyboard-shortcut, card-group, and active-card accessibility semantics
- Expanded TypeScript declarations and Custom Elements Manifest exports
- Node 20, 22, and 24 validation matrix
- Real Chromium behavior and accessibility smoke test
- 48 KiB distribution size budget
- API, accessibility, framework/SSR, and versioning documentation

## Runtime API

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

## Accessibility

The component now exposes:

- `role="region"` and an interactive card-deck role description on the host;
- keyboard shortcut metadata;
- a group role and position-aware label on rendered cards;
- `aria-hidden="true"` on non-current cards;
- a polite live region that announces the active title and position;
- immediate state completion when reduced motion is requested.

Authors should still provide a meaningful `aria-label`, image alternatives, semantic card content, and readable accent contrast.

## Upgrade from v0.2.0

Change the fixed CDN version from `0.2.0` to `1.0.0`, or run:

```bash
npm install @hubujiu/fan-poker-deck@1.0.0
```

No changes are required to existing v0.2 markup or runtime calls.

## Stable documentation

- API contract: `docs/API.md`
- Accessibility: `docs/ACCESSIBILITY.md`
- Framework and SSR integration: `docs/FRAMEWORKS.md`
- Versioning policy: `docs/VERSIONING.md`
- Chinese guide: `README.md`
- English guide: `README_EN.md`
- Agent instructions: `SKILL.md`

## Distribution endpoints

The release workflow verifies:

- npm Registry: `@hubujiu/fan-poker-deck@1.0.0`
- jsDelivr: `https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js`
- unpkg: `https://unpkg.com/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js`
