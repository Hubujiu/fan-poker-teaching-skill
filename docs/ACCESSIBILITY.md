# Accessibility

`fan-poker` is designed to remain operable without a pointer and to expose one active card at a time to assistive technology.

## Keyboard controls

- Right, Down, Page Down, or Space: next card
- Left, Up, or Page Up: previous card

The host is focusable by default and exposes `aria-keyshortcuts` for these commands. Set a meaningful `aria-label` on every deck.

```html
<fan-poker aria-label="Git basics lesson">
  ...
</fan-poker>
```

## Screen reader behavior

- The host uses `role="region"` and an interactive card-deck role description.
- Rendered cards use `role="group"` and a card role description.
- Only the active rendered card has `aria-hidden="false"`.
- A polite live region announces the active card title and its position in the deck.
- The `status` Shadow Part is visually hidden by default and remains available to assistive technology.

## Reduced motion

When `prefers-reduced-motion: reduce` is active, navigation animations complete almost immediately while preserving the same state changes and events.

## Author responsibilities

The component cannot repair inaccessible lesson content. Authors should:

- keep card titles short and distinct;
- provide alternative text for images;
- use semantic headings, lists, links, and code blocks;
- avoid relying on color alone;
- verify accent colors maintain readable cover contrast;
- avoid placing important controls inside non-current cards;
- sanitize or trust any content supplied through the runtime `html` field.

## Testing

The repository browser smoke test checks keyboard-ready focus semantics, current-card visibility, live status output, reduced-motion navigation, runtime updates, and public events in Chromium.
