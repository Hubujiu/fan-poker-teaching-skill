---
name: fan-poker-teaching-skill
description: "Create embeddable interactive HTML lessons, tutorials, onboarding flows, revision cards, flashcards, and step-by-step guides with the fan-poker Web Component. Use this skill whenever a user asks to turn knowledge, notes, documentation, an article, a process, or a learning topic into clickable, draggable, stacked, card-based, or poker-style teaching content. Prefer the compact <fan-poker>/<fan-card> API with the fixed v1 npm CDN; use the legacy standalone template only when the user explicitly requires one offline file with no external script."
license: MIT
---

# Fan Poker Teaching Skill

Generate focused teaching content on top of the stable `<fan-poker>` Web Component. Keep animation, interaction, accessibility semantics, and responsive layout inside the published component. Normally output only the module import and semantic card markup.

## Default output

Use the fixed stable version:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js">
</script>

<fan-poker
  card-width="390px"
  card-height="520px"
  theme="auto"
  aria-label="Topic lesson">
  <fan-card tag="Topic" title="First idea" symbol="01" accent="#f2a65a">
    Explain one focused learning job here.
  </fan-card>

  <fan-card tag="Practice" title="Try it" symbol="02" accent="#7dcfb6">
    <pre><code>example command</code></pre>
  </fan-card>
</fan-poker>
```

When the package is installed or hosted beside the page, prefer `import "@hubujiu/fan-poker-deck"` or a relative module path.

## Plan the lesson first

Choose the smallest number of cards that teaches the topic clearly. Most lessons need 5 to 10 cards. A useful default sequence is goal, mental model, core steps, example, verification, troubleshooting, and recap. Do not force this order when the material has a clearer structure.

Each `<fan-card>` should answer one question, explain one concept, or ask the learner to perform one action. Split overloaded cards instead of shrinking text.

Supported card attributes:

- `tag`: short category label
- `title`: card heading
- `symbol`: large cover symbol or number
- `accent`: CSS color for the cover

The card body accepts normal trusted HTML such as paragraphs, lists, links, images, code blocks, and tables. Never insert untrusted raw HTML.

## Configure the deck

Use these attributes on `<fan-poker>`:

- `card-width`, default `390px`
- `card-height`, default `520px`
- `start-index`, zero-based, default `0`
- `theme="auto|light|dark"`, default `auto`
- `keyboard="false"` to disable keyboard controls
- `wheel="false"` to disable wheel controls
- `draggable="false"` to disable pointer dragging
- `aria-label` with a short, meaningful lesson name

Card count is derived from `<fan-card>` children. Never generate a separate card-count setting.

## Accessibility rules

- Always provide a useful `aria-label` for the deck.
- Use distinct card titles because the active title and position are announced.
- Add `alt` text to instructional images.
- Preserve semantic paragraphs, headings, lists, links, and code blocks.
- Do not communicate meaning through accent color alone.
- Do not remove focus styles or the visually hidden `status` part.

## Runtime API

Only add JavaScript when the page needs dynamic data or external controls:

```js
const deck = document.querySelector("fan-poker");

deck.setCards(cards);
deck.appendCard(card);
deck.updateCard(1, { title: "Updated" });
deck.removeCard(0);
deck.clear();

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();
```

Listen for `ready`, `cardchangestart`, `cardchange`, and `cardschange` when the host page needs state synchronization.

For SSR or explicit registration, the package exports `FanPokerElement`, `FanCardElement`, and `defineFanPokerElements()`.

## Styling

Prefer CSS custom properties for broad themes and `::part()` for targeted adjustments. Preserve transparent outer background, full-card rendering, the single-sided fan, current-card accessibility semantics, and keyboard focus behavior.

## Offline fallback

When the user explicitly requires one offline HTML file with no external script, copy `assets/fan-poker-base.html` and replace only its teaching-card data. Otherwise prefer the stable Web Component output.
