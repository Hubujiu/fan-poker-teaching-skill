# Changelog

## 1.0.2 - 2026-07-18

### Fixed

- Kept the keyboard focus indicator on the active card instead of drawing a large frame around the full fan stage
- Cancelled stale mouse drags when the primary button is no longer pressed or pointer capture is lost
- Made wheel input inside the active card scroll card content instead of changing cards
- Scoped nested-scroll detection to elements inside the active card

### Validation

- Added Chromium regression checks for focus-ring scope, card-content wheel scrolling, and released-pointer drag cleanup

## 1.0.1 - 2026-07-17

### Security

- Migrated npm publication from a long-lived write token to npm Trusted Publishing with GitHub Actions OIDC
- Added an explicit OIDC environment check before publishing a new version
- Documented the trusted publisher identity, release flow, credential retirement, and recovery steps
- Expanded the project security policy for supported versions, vulnerability reports, trusted HTML, and supply-chain controls

### Changed

- The component runtime and stable `1.x` API contract are unchanged
- Release result records now identify `npm-trusted-publishing-oidc` as the authentication model

## 1.0.0 - 2026-07-17

### Added

- Stable `1.x` API contract for attributes, methods, events, CSS custom properties, and CSS Parts
- Safe Node and SSR module imports
- Named exports for `FanPokerElement`, `FanCardElement`, and `defineFanPokerElements()`
- Idempotent automatic and explicit custom-element registration
- Active-card live-region announcements
- Card-group, keyboard-shortcut, and interactive-deck accessibility metadata
- Node 20, 22, and 24 validation matrix
- Distribution size budget
- API, accessibility, framework/SSR, and versioning documentation

### Changed

- Updated the npm package, CDN examples, Agent Skill, landing page, and documentation to `1.0.0`
- Expanded TypeScript declarations and Custom Elements Manifest exports
- Added `docs` and package metadata to the npm distribution
- Formalized the release quality gate around static, Node, Chromium, package, Registry, and CDN verification

### Compatibility

- Existing v0.2 markup, themes, runtime APIs, navigation methods, events, CSS variables, and CSS Parts remain compatible
- Production CDN users only need to change the fixed version from `0.2.0` to `1.0.0`

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
