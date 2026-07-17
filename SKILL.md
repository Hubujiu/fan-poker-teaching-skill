---
name: fan-poker-teaching-deck
description: "Create standalone interactive HTML lessons, tutorials, onboarding flows, explainers, revision cards, flashcards, step-by-step guides, and mini courses using the bundled single-sided fan poker deck animation. Use this skill whenever a user asks to turn knowledge, documentation, notes, an article, a process, or a learning topic into swipeable, clickable, stacked, card-based, or poker-style teaching content, even when they do not explicitly say 'skill'."
license: MIT
---

# Fan Poker Teaching Deck

Create complete, directly runnable teaching pages from `assets/fan-poker-base.html`. Treat the bundled HTML as the stable visual and animation foundation. Keep the page transparent, dependency-free, and free of top toolbars, page counters, and bottom page-number navigation.

## Read bundled resources

- Read `references/card-data-schema.md` before authoring cards that use custom HTML, code, tables, links, warnings, or dense content.
- Use `examples/docker-lesson.html` as a content-quality reference when the user wants a technical step-by-step tutorial.
- Use `examples/animation-features-demo.html` only to understand the intended visual behavior. Do not copy its placeholder teaching content unless relevant.

## Default workflow

1. Identify the topic, intended learner, desired depth, language, and any supplied source material.
2. Copy `assets/fan-poker-base.html` to the requested output path.
3. Edit the document `<title>`.
4. Replace only the `cardData` array inside the `AI CONTENT ZONE` unless the user explicitly requests visual or behavioral changes.
5. Preserve the animation class, geometry, responsive measurements, full-card rendering, input handling, and public control API.
6. Validate the final HTML and return one complete `.html` file.

When the request omits an audience or depth, choose a beginner-friendly explanation with practical examples. Do not block the task for minor missing details.

## Plan the lesson before writing cards

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

Each card should answer one question, explain one concept, or ask the learner to perform one action. Split overloaded cards rather than shrinking text.

Use simple fields for ordinary text:

```js
{
  tag: "Step",
  title: "Check the Docker daemon",
  description: "Run docker version. Client and server output confirms that Docker is ready.",
  symbol: "03",
  accent: "#7dcfb6"
}
```

Use `html` for code, lists, warnings, tables, links, or structured practice:

```js
{
  tag: "Practice",
  title: "Run the first container",
  symbol: "04",
  accent: "#8e9aef",
  html: `
    <p class="card-tag">Practice</p>
    <h2 class="card-title">Run the first container</h2>
    <div class="card-description">
      <pre><code>docker run --rm hello-world</code></pre>
      <p>Confirm that the image downloads and the welcome message appears.</p>
    </div>
  `
}
```

Escape backticks and `${...}` inside JavaScript template literals. Keep code examples focused and executable with minimal modification.

## Preserve the visual contract

- Keep the page background transparent.
- Keep every card the same size.
- Keep the single-sided fan opening to the right.
- Keep the front-card-to-back recycling animation and full-depth return path.
- Keep all cards fully rendered throughout transitions.
- Keep static cards shadowless.
- Use solid, restrained accent colors with sufficient text contrast.
- Do not introduce gradients, emoji-only icons, a toolbar, a page counter, or numbered bottom navigation unless explicitly requested.
- Do not use `contain: paint`; it clips the motion envelope.

## Preserve the interaction contract

Retain:

- Click to advance
- Horizontal drag in both directions
- Wheel navigation
- Arrow, PageUp, PageDown, and Space keyboard controls
- Adaptive speed and queued switching
- Shortest-path programmatic navigation
- Reduced-motion support

Keep this public API available:

```js
window.fanPokerDeck.requestStep(1);
window.fanPokerDeck.requestStep(-1);
window.fanPokerDeck.goTo(3);
```

## Adapt content to the teaching domain

For technical tutorials:

- Prefer commands that can be copied directly.
- Explain what success looks like after each important command.
- Include one troubleshooting card when failure is common.
- Never invent package names, flags, APIs, or version-specific behavior. Verify current details when tools allow.

For conceptual lessons:

- Begin with a concrete mental model.
- Introduce terminology only when it becomes useful.
- Include a comparison, example, or small retrieval question.

For revision cards:

- Keep the prompt or concept visible immediately.
- Put the answer or explanation in the main body.
- Use consistent symbols and tag labels across the set.

## Quality checks

Before returning the file:

1. Parse every inline `<script>` with a JavaScript syntax checker.
2. Confirm `cardData` exists and contains at least two meaningful cards.
3. Confirm each card has a useful title or complete custom `html`.
4. Confirm no removed UI selectors or elements were reintroduced: `toolbar`, `counter`, `motionState`, `pageNav`, `speedControl`, `.page-nav`, or `.page-button`.
5. Confirm `window.fanPokerDeck` remains available.
6. Confirm the output has no external runtime dependencies.
7. Open or render the page when browser tooling is available and verify that the animation is not clipped.
