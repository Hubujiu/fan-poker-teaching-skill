# Changelog

## 0.2.0 - 2026-07-17

### Added

- Explicit `theme="auto|light|dark"` modes
- `setCards()`, `appendCard()`, `updateCard()`, `removeCard()`, and `clear()` runtime APIs
- `cardschange` event for list synchronization
- Expanded Shadow DOM parts for targeted `::part()` styling
- Custom Elements Manifest
- Vue and React integration examples
- Runtime theme and card-editing example
- Browser smoke test for Custom Elements, navigation, themes, events, and runtime mutations

### Changed

- Replaced the compact v0.1 implementation with readable source and matching distribution output
- Improved TypeScript declarations for themes, mutation methods, and events
- Updated the Agent Skill to generate v0.2.0 fixed-version imports
- Updated the landing page to demonstrate runtime themes and card insertion

### Fixed

- Text card updates now correctly replace prior text instead of retaining stale HTML state
- Nested script elements are removed when trusted card content is cloned into the rendered deck
- Previous-card animation now travels from the back of the fan toward the front

## 0.1.0 - 2026-07-17

### Added

- `<fan-poker>` and `<fan-card>` Custom Elements
- Shadow DOM style isolation
- Width, height, input, navigation, events, TypeScript declarations, npm distribution, and Agent Skill integration

## 0.0.1 - 2026-07-17

### Added

- Standalone single-sided fan teaching deck and initial Agent Skill
