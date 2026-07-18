---
name: fan-poker-deck
description: Generate fully custom HTML card worlds inside the Fan Poker Deck Web Component.
---

# Fan Poker Deck Skill

Use the fixed v2 release:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js">
</script>
```

## Output contract

Generate one `<fan-poker>` containing one or more `<fan-card>` children.

Each `<fan-card>` must:

1. Have a useful `aria-label`.
2. Contain the complete card-face HTML.
3. Include its own `<style>` when visual styling is required.
4. Prefer `:host` for the world background, foreground, and typography.
5. Give the main root `min-width: 100%` and `min-height: 100%`.
6. Deliberately use a wider child only when horizontal scrolling is desired.

Do not generate the removed v1 template fields as a required structure. There is no mandatory cover, index, tag, title, body, footer, toolbar, counter, or progress bar.

## Interaction rules

- Vertical overflow scrolls inside the card.
- Native scrollbars stay hidden.
- Floating scrollbars appear near the right or bottom edge.
- Horizontal overflow owns horizontal dragging.
- Deck dragging is available when the current world does not overflow horizontally.
- Add `data-fan-interactive` to custom drag controls that must never start deck navigation.
- The component itself does not draw a focus indicator.

## Minimal card

```html
<fan-poker card-width="390px" card-height="520px" aria-label="Git lesson">
  <fan-card aria-label="Git working tree">
    <style>
      :host {
        display: block;
        min-height: 100%;
        background: #fff8ed;
        color: #171717;
        font-family: system-ui, sans-serif;
      }

      article {
        min-width: 100%;
        min-height: 100%;
        padding: 28px;
      }
    </style>

    <article>
      <h1>Working tree</h1>
      <p>Your uncommitted file changes live here.</p>
    </article>
  </fan-card>
</fan-poker>
```
