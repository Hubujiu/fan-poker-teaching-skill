# Stable API contract

This document defines the public API guaranteed for the `1.x` release line.

## Module exports

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

The package automatically registers `<fan-poker>` and `<fan-card>` when `globalThis.customElements` exists. Calling `defineFanPokerElements()` again is safe and idempotent. A custom registry may be supplied explicitly.

## `<fan-poker>` attributes

| Attribute | Default | Contract |
|---|---:|---|
| `card-width` | `390px` | Desired card width with a CSS unit |
| `card-height` | `520px` | Desired card height with a CSS unit |
| `start-index` | `0` | Initial zero-based card index |
| `theme` | `auto` | `auto`, `light`, or `dark` |
| `keyboard` | `true` | Enables keyboard navigation |
| `wheel` | `true` | Enables wheel navigation |
| `draggable` | `true` | Enables pointer dragging |
| `aria-label` | generated | Accessible deck name |

Boolean attributes accept the strings `true`, `false`, `1`, `0`, `yes`, `no`, `on`, and `off`.

## `<fan-card>` attributes

| Attribute | Purpose |
|---|---|
| `tag` | Small category label |
| `title` | Card heading |
| `symbol` | Large cover symbol or number |
| `accent` | Cover color |

The element body is rendered as card content. Nested `<script>` elements are discarded when source markup is cloned into the visible deck.

## Properties

```ts
currentIndex: number
cardCount: number
cards: FanPokerCardInput[]
```

Reading `cards` returns a copy. Assigning to `cards` delegates to `setCards()`.

## Collection methods

```ts
setCards(cards, { preserveIndex?: boolean }): this
appendCard(card): number
updateCard(index, patch): boolean
removeCard(index): FanPokerCardInput | null
clear(): this
```

The `html` field is intentionally unsanitized and must only receive trusted content. Prefer `content` for plain text.

## Navigation methods

```ts
next(): boolean
previous(): boolean
goTo(index): boolean
reset(): boolean
```

`goTo()` chooses the shortest circular path. Equal distances prefer forward movement.

## Events

All public events bubble and cross the Shadow DOM boundary.

### `ready`

```ts
{ index: number, cardCount: number }
```

### `cardchangestart` and `cardchange`

```ts
{
  index: number,
  previousIndex: number,
  cardCount: number,
  direction: "next" | "previous",
  source: "api" | "click" | "drag" | "wheel" | "keyboard" | "goto"
}
```

### `cardschange`

```ts
{
  cardCount: number,
  previousCardCount: number,
  index: number,
  previousIndex: number
}
```

## CSS custom properties

- `--fan-card-width`
- `--fan-card-height`
- `--fan-card-bg`
- `--fan-text`
- `--fan-muted`
- `--fan-line`
- `--fan-accent`
- `--fan-radius`
- `--fan-cover-text`

## CSS Parts

`stage`, `deck`, `card`, `inner`, `cover`, `index`, `symbol`, `content`, `tag`, `title`, `body`, `footer`, `status`, and `empty`.

## Compatibility promise

Within `1.x`, existing public attributes, methods, event names, event detail fields, module exports, CSS custom properties, and CSS Parts will not be removed or renamed without a deprecation period.
