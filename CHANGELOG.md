# Changelog

## 0.1.0 - 2026-07-17

### Added

- `<fan-poker>` and `<fan-card>` Custom Elements
- Shadow DOM style isolation
- `card-width`, `card-height`, `start-index`, `keyboard`, `wheel`, and `draggable` configuration
- `next()`, `previous()`, `goTo()`, and `reset()` methods
- `currentIndex`, `cardCount`, and dynamic `cards` properties
- `ready`, `cardchangestart`, and `cardchange` events
- TypeScript declarations
- Basic markup and JavaScript API examples
- Public npm package [`@hubujiu/fan-poker-deck`](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
- Fixed-version jsDelivr and unpkg distribution
- Idempotent npm publishing and release endpoint verification

### Changed

- The Agent Skill now generates compact Web Component markup from the published npm CDN by default.
- The project landing page now runs the published `0.1.0` package.
- Chinese and English documentation now recommend fixed versions for production use.
- The standalone HTML deck remains available as an offline fallback.

### Verified

- npm Registry: `@hubujiu/fan-poker-deck@0.1.0`
- jsDelivr: `https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js`
- unpkg: `https://unpkg.com/@hubujiu/fan-poker-deck@0.1.0/dist/fan-poker.js`

## 0.0.1 - 2026-07-17

### Added

- Agent Skill instructions for generating interactive teaching decks
- Single-sided fan poker animation with full card rendering
- Click, drag, wheel, keyboard, adaptive-speed, queue, and shortest-path controls
- Transparent, responsive, single-file HTML template
- Docker lesson and animation showcase examples
- Zero-dependency validation script and GitHub Actions workflow

### Removed

- Top toolbar and speed controls
- Visible page counter
- Bottom numbered page navigation
