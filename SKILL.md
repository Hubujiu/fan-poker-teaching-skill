---
name: fan-poker-teaching-skill
description: "Create embeddable interactive HTML lessons, tutorials, onboarding flows, revision cards, flashcards, and step-by-step guides with the bundled fan-poker Web Component. Use this skill whenever a user asks to turn knowledge, notes, documentation, an article, a process, or a learning topic into clickable, draggable, stacked, card-based, or poker-style teaching content. Prefer the compact <fan-poker>/<fan-card> API; use the legacy standalone template only when the user explicitly requires one offline file with no external script."
license: MIT
---

# Fan Poker Teaching Skill

Generate concise teaching content on top of the reusable `<fan-poker>` Web Component. Keep the animation implementation in `dist/fan-poker.js`; normally generate only the component import and card markup.

## Default output

Use this structure unless the user requests a different integration:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/Hubujiu/fan-poker-teaching-skill@main/dist/fan-poker.js">
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

When the component is hosted beside the page, prefer a relative import such as `./dist/fan-poker.js` instead of the CDN URL.

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

The `cards` property may be assigned an array for dynamic content:

```js
deck.cards = [
  { tag: "Git", title: "Working tree", content: "Files being edited." },
  { tag: "Git", title: "Staging area", html: "<code>git add</code> prepares changes." }
];
```

## Preserve the component contract

Do not copy or rewrite the animation engine into generated pages. Do not add a top toolbar, visible counter, or bottom numbered navigation. Do not assume a framework.

The component already provides:

- single-sided fan geometry
- full-card rendering
- depth-aware front-card recycling
- click, drag, wheel, and focused keyboard input
- adaptive speed for repeated input
- responsive measurement
- transparent background
- reduced-motion support
- Shadow DOM style isolation

## Offline standalone fallback

When the user explicitly requires one completely offline HTML file, copy `assets/fan-poker-base.html` and replace only its `cardData` content zone. Explain that this fallback duplicates the animation code, while the Web Component version is better for reusable website integration.

## Validate the result

Confirm that:

- the module import appears before the component is used
- at least one `<fan-card>` exists
- every card has a focused title and readable body
- code blocks remain executable and properly escaped
- width and height values include CSS units
- the page contains no toolbar, page counter, or bottom pagination
