# Framework integration

Install the pinned release:

```bash
npm install @hubujiu/fan-poker-deck@2.0.0
```

The package is safe to import during Node and SSR evaluation. Import it from a client entry to register the elements.

## Plain HTML

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js"></script>
```

## Vite, Vue, React, Svelte, and Astro

```js
import "@hubujiu/fan-poker-deck";
```

Card markup is ordinary light DOM source markup. The component clones it into an isolated world Shadow Root when rendered.

## Next.js

Import from a client component:

```tsx
"use client";

import "@hubujiu/fan-poker-deck";

export default function Deck() {
  return (
    <fan-poker card-width="390px" card-height="520px" aria-label="Lesson">
      <fan-card aria-label="First world">
        <style>{`
          :host { display:block; min-height:100%; background:#fff8ed; }
          main { min-width:100%; min-height:100%; padding:28px; }
        `}</style>
        <main>Complete custom card face</main>
      </fan-card>
    </fan-poker>
  );
}
```

React users may need local JSX intrinsic-element declarations when their TypeScript setup does not consume the package declarations automatically.
