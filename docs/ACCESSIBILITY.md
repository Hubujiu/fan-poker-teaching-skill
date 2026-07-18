# Accessibility and interaction

`<fan-poker>` exposes a region with an interactive card-deck description. Only the current rendered card is accessible; rear cards are `aria-hidden` and their worlds are inert.

Each source `<fan-card>` should include an `aria-label`. The active label and position are announced through a polite live region.

## Keyboard

- Right / Down / Page Down: next card
- Left / Up / Page Up: previous card
- Home: first card
- End: last card

The component intentionally draws no focus indicator. A product that requires a visible keyboard indication can style the host externally:

```css
fan-poker:focus-visible {
  box-shadow: 0 0 0 3px rgba(233, 109, 47, .25);
}
```

## Gesture priority

1. Buttons, links, form controls, `contenteditable`, and `[data-fan-interactive]` retain their own interaction.
2. A card world with horizontal overflow owns horizontal panning.
3. Otherwise, a horizontal drag on the current card navigates the deck.
4. Vertical movement remains card scrolling.
5. Clicking an exposed rear card navigates directly to it.

## Scrolling

Native scrollbars are hidden, but the content remains a real `overflow: auto` region. Floating tracks appear when the pointer approaches the right or bottom edge, while scrolling, and while dragging a thumb.

Do not rely only on the floating bar for content discovery. The card content should visually suggest that more material exists when scrolling is essential.
