# API

## Elements

### `<fan-poker>`

Owns card geometry, fan layout, navigation, animation, accessibility state, and gesture arbitration.

Attributes:

| Attribute | Default | Meaning |
|---|---:|---|
| `card-width` | `390px` | Physical card width |
| `card-height` | `520px` | Physical card height |
| `start-index` | `0` | Zero-based initial card |
| `keyboard` | `true` | Enable keyboard deck navigation |
| `draggable` | `true` | Enable deck drag navigation |
| `fan-offset` | `28px` | Horizontal spacing between exposed cards |
| `aria-label` | generated | Accessible deck label |

### `<fan-card>`

A declarative source container for one complete card world.

Use `aria-label` as the accessible card name. Everything inside the element becomes the card world. Script elements are removed when the world is cloned.

## Methods

```ts
deck.next(): boolean
deck.previous(): boolean
deck.goTo(index: number): boolean
deck.reset(): boolean

deck.setCards(cards, { preserveIndex? }): deck
deck.appendCard(card): number
deck.updateCard(index, patch): boolean
deck.removeCard(index): FanPokerCardInput | null
deck.clear(): deck
```

`FanPokerCardInput`:

```ts
interface FanPokerCardInput {
  label?: string;
  html?: string;
  content?: string;
  title?: string; // migration alias for label
}
```

`content` is escaped as plain text. `html` supplies the complete world markup.

## Properties

```ts
deck.currentIndex: number
deck.cardCount: number
deck.cards: FanPokerCardInput[]
```

## Events

- `ready`
- `cardchangestart`
- `cardchange`
- `cardschange`

Change event detail:

```ts
{
  index: number;
  previousIndex: number;
  cardCount: number;
  direction: "next" | "previous";
  source: "api" | "drag" | "keyboard" | "goto";
}
```

## CSS custom properties

```css
fan-poker {
  --fan-card-width: 390px;
  --fan-card-height: 520px;
  --fan-card-radius: 24px;
  --fan-card-line: rgba(23, 23, 23, .15);
  --fan-card-background: #fff;

  --fan-offset-x: 28px;
  --fan-offset-y: 6px;
  --fan-rotation: 2.1deg;

  --fan-scrollbar-accent: #e96d2f;
  --fan-scrollbar-track: rgba(255, 255, 255, .22);
  --fan-scrollbar-thumb: rgba(24, 24, 24, .58);
  --fan-scrollbar-size: 12px;
}
```

## CSS Parts

- `stage`
- `deck`
- `card`
- `world`
- `vertical-scrollbar`
- `horizontal-scrollbar`
- `vertical-thumb`
- `horizontal-thumb`
- `status`
- `empty`

The HTML inside each card world is isolated. Style that content inside the `<fan-card>` itself rather than targeting it through the deck.
