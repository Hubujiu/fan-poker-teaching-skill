# Card data schema

Use this reference when a lesson needs custom HTML, code, lists, warnings, links, tables, or dense content.

## Simple card

| Field | Required | Purpose |
|---|---:|---|
| `tag` | No | Section label such as Goal, Concept, Step, Practice, Warning |
| `title` | Yes* | Main heading |
| `description` | Yes* | Plain explanatory text |
| `symbol` | No | Large cover mark, preferably 1 to 3 characters |
| `accent` | No | Solid CSS color with sufficient contrast |
| `html` | No | Replaces the default body with custom HTML |

`title` and `description` may be omitted only when `html` provides the complete visible body.

## Content density

- Title: preferably 4 to 18 Chinese characters, or 2 to 8 English words.
- Description: preferably 40 to 140 Chinese characters, or 20 to 80 English words.
- Code-heavy content: use `html` and keep snippets focused.
- Long lessons: add cards instead of shrinking typography.
- Each card should have one learning job.

## Rich card pattern

```js
{
  tag: "Practice",
  title: "Run the command",
  symbol: "04",
  accent: "#8e9aef",
  html: `
    <p class="card-tag">Practice</p>
    <h2 class="card-title">Run the command</h2>
    <div class="card-description">
      <pre><code>docker run --rm hello-world</code></pre>
      <p>Explain what successful output looks like.</p>
    </div>
  `
}
```

## Safe editing boundary

The normal edit surface begins at `AI CONTENT ZONE` and ends after `cardData`. Do not rewrite the animation class unless the user explicitly requests a behavior change.
