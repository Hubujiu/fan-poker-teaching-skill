---
name: fan-poker-teaching-skill
description: "Create standalone interactive HTML lessons, tutorials, onboarding flows, explainers, revision cards, flashcards, step-by-step guides, and mini courses using the bundled single-sided fan poker deck animation. Use this skill whenever a user asks to turn knowledge, documentation, notes, an article, a process, or a learning topic into swipeable, clickable, stacked, card-based, or poker-style teaching content, even when they do not explicitly say 'skill'."
license: MIT
---

# Fan Poker Teaching Skill

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
