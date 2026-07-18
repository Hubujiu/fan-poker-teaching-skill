# Framework and SSR integration

The package is safe to import in Node and SSR environments. In a browser it automatically registers the custom elements. In Node, the same import exposes constructors and `defineFanPokerElements()` without requiring DOM globals.

## Plain HTML

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.2/dist/fan-poker.js"></script>
```

## Vite, Vue, React, Svelte, and Astro

Install once:

```bash
npm install @hubujiu/fan-poker-deck@1.0.2
```

Import the package from a client entry:

```js
import "@hubujiu/fan-poker-deck";
```

Vue compiler configuration should treat `fan-poker` and `fan-card` as native custom elements. See `examples/vue-example.vue`.

React can render the tags directly. Use a ref for methods and complex runtime card data, and subscribe to native Custom Events with `addEventListener`. See `examples/react-example.jsx`.

## Next.js and other SSR frameworks

A server-side import no longer throws:

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

The module returns without registering anything when `customElements` is unavailable. Registration happens automatically when the client bundle evaluates the module. A client component may also call the function explicitly:

```js
"use client";

import { useEffect } from "react";
import { defineFanPokerElements } from "@hubujiu/fan-poker-deck";

export function FanPokerRegistration() {
  useEffect(() => {
    defineFanPokerElements();
  }, []);
  return null;
}
```

## Custom element registries

The registration function is idempotent and accepts a compatible registry:

```js
const registry = new CustomElementRegistry();
defineFanPokerElements(registry);
```

Browser support for scoped registries varies, so confirm target-browser behavior before depending on this pattern.

## Hydration notes

The source `<fan-card>` children remain in the light DOM and are hidden after connection. The visible animated cards are generated inside Shadow DOM. Server-rendered source cards therefore remain deterministic and can be hydrated without reproducing the internal animation markup.
