---
name: fan-poker-teaching-skill
description: "Create embeddable interactive HTML lessons, tutorials, onboarding flows, revision cards, flashcards, and step-by-step guides with the fan-poker Web Component. Use this skill whenever a user asks to turn knowledge, notes, documentation, an article, a process, or a learning topic into clickable, draggable, stacked, card-based, or poker-style teaching content. Prefer the compact <fan-poker>/<fan-card> API with the published fixed-version npm CDN; use the bundled standalone template only when the user explicitly requires one offline file with no external script."
license: MIT
---

# Fan Poker Teaching Skill

Generate concise teaching content on top of the reusable `<fan-poker>` Web Component. Normally output only one module import and semantic card markup. Do not copy the animation engine into every answer.

## Default output

Use the published fixed-version CDN unless the user supplies another hosting location:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js">
</script>

<fan-poker card-width="390px" card-height="520px">
  <fan-card tag="Topic" title="First idea" symbol="01" accent="#f2a65a">
    Explain one focused learning job here.
  </fan-card>

  <fan-card tag="Practice" title="Try it" symbol="02" accent="#7dcfb6">
    <pre><code>example command</code></pre>
  </fan-card>
</fan-poker>
```

When the component is hosted beside the page, prefer a relative import such as `./dist/fan-poker.js`. When the user asks for npm or a framework project, use:

```js
import "@hubujiu/fan-poker-deck";
```

Keep production CDN examples pinned to a concrete version. Do not silently replace `@0.1.0` with `@latest`.

## Plan the lesson first

Choose the smallest number of cards that teaches the topic clearly. Most lessons need 5 to 10 cards.

A useful default sequence is:

1. Goal and outcome
2. Prerequisites or mental model
3. Core concepts or steps
4. Concrete example or command
5. Verification or practice
6. Common mistake or troubleshooting
7. Recap and next action

Do not force this sequence when the source material has a clearer natural order.

## Author one learning job per card

Each `<fan-card>` should answer one question, explain one concept, or ask the learner to perform one action. Split overloaded cards rather than shrinking the text.

Supported attributes:

- `tag`: short category label
- `title`: card heading
- `symbol`: large cover symbol or number
- `accent`: CSS color for the cover

The card body accepts normal HTML, including paragraphs, lists, links, images, code blocks, tables, and buttons. Do not include untrusted raw HTML.

## Configure the deck

Use these attributes on `<fan-poker>`:

- `card-width`, default `390px`
- `card-height`, default `520px`
- `start-index`, zero-based, default `0`
- `keyboard="false"` to disable keyboard controls
- `wheel="false"` to disable wheel controls
- `draggable="false"` to disable pointer dragging
- `aria-label` to describe the lesson

Card count is derived automatically from the number of `<fan-card>` children. Never generate a separate card-count setting.

## JavaScript API

Use the API only when the page needs external controls:

```js
const deck = document.querySelector("fan-poker");

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();

console.log(deck.currentIndex);
console.log(deck.cardCount);
```

Listen for completed changes:

```js
deck.addEventListener("cardchange", event => {
  console.log(event.detail.index);
});
```

For dynamic data, assign an array to `deck.cards`. Use `content` for plain text and `html` for structured markup.

## Preserve the visual system

Do not add a top toolbar, visible page counter, speed selector, or bottom numbered navigation unless the user explicitly asks for it. Keep the transparent host background, single-sided fan, full-card rendering, depth-aware recycling, responsive sizing, and reduced-motion support.

## Offline fallback

When the user explicitly requires one file that works without any network request, copy `assets/fan-poker-base.html` and replace only its `cardData` content zone. Explain that this fallback duplicates the engine, while the Web Component version is smaller and easier to update.

## Validate the result

Before returning the page, confirm that:

- the script import is present before the custom elements are used
- all tags are closed correctly
- every card has a useful title and focused body
- card width and height include CSS units
- code examples are escaped correctly inside HTML
- no toolbar, page counter, or numbered pagination has returned
- the output works as an embeddable fragment or complete page, according to the request
