# Changelog

## 2.0.0 - 2026-07-18

### Added

- Fully custom card-face worlds rendered in isolated Shadow Roots
- Floating edge scrollbars for vertical and horizontal overflow
- Direct horizontal world panning and scrollbar thumb dragging
- Gesture priority that prevents horizontal card content from triggering deck navigation
- CSS Parts and variables for floating scrollbar styling

### Changed

- `<fan-poker>` now owns only boundaries, clipping, layout, animation, and interaction coordination
- Card markup controls the entire visual world
- Horizontal content panning follows the same direction as the bottom thumb

### Removed

- Fixed cover, index, tag, title, body, and footer template
- Built-in visible focus indication
- Native visible scrollbars
- Wheel-based card switching

### Breaking

- v1 presentation attributes and Parts are no longer rendered
- Migrate card visuals into each `<fan-card>` or remain pinned to v1.0.3

## 1.0.3 - 2026-07-18

### Fixed

- Replaced the active-card focus outline with a compact focus indicator around the card index badge
- Prevented the keyboard focus state from making every newly active card look permanently framed

### Compatibility

- Public markup, methods, events, CSS custom properties, CSS Parts, TypeScript declarations, and SSR behavior are unchanged

## 1.0.2 - 2026-07-18

### Fixed

- Kept focus, pointer cleanup, and wheel scrolling inside the active card
