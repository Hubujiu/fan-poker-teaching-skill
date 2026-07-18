from pathlib import Path

VERSION_FROM = "1.0.1"
VERSION_TO = "1.0.2"


def replace_once(path: str, old: str, new: str, label: str) -> None:
    file = Path(path)
    text = file.read_text(encoding="utf-8")
    if new in text and old not in text:
        return
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    file.write_text(text.replace(old, new, 1), encoding="utf-8")


replace_once(
    "package.json",
    '  "version": "1.0.1",',
    '  "version": "1.0.2",',
    "package version",
)

validate = Path("scripts/validate.mjs")
validate_text = validate.read_text(encoding="utf-8")
validate_text = validate_text.replace(
    'if (pkg.version !== "1.0.1") errors.push("package version must be 1.0.1");',
    'if (pkg.version !== "1.0.2") errors.push("package version must be 1.0.2");',
)
validate_text = validate_text.replace(
    'console.log("✓ trusted publishing documentation and package metadata are ready for v1.0.1");',
    'console.log("✓ trusted publishing documentation and package metadata are ready for v1.0.2");',
)
if "package version must be 1.0.1" in validate_text or "ready for v1.0.1" in validate_text:
    raise SystemExit("validate version update did not complete")
validate.write_text(validate_text, encoding="utf-8")

index = Path("index.html")
index_text = index.read_text(encoding="utf-8")
if VERSION_TO not in index_text:
    if VERSION_FROM not in index_text:
        raise SystemExit("index version marker missing")
    index_text = index_text.replace(VERSION_FROM, VERSION_TO)
index.write_text(index_text, encoding="utf-8")

changelog = Path("CHANGELOG.md")
changelog_text = changelog.read_text(encoding="utf-8")
entry = '''## 1.0.2 - 2026-07-18

### Fixed

- Kept the keyboard focus indicator on the active card instead of drawing a large frame around the full fan stage
- Cancelled stale mouse drags when the primary button is no longer pressed or pointer capture is lost
- Made wheel input inside the active card scroll card content instead of changing cards
- Scoped nested-scroll detection to elements inside the active card

### Validation

- Added Chromium regression checks for focus-ring scope, card-content wheel scrolling, and released-pointer drag cleanup

'''
if "## 1.0.2 - 2026-07-18" not in changelog_text:
    marker = "# Changelog\n\n"
    if changelog_text.count(marker) != 1:
        raise SystemExit("changelog heading marker missing")
    changelog_text = changelog_text.replace(marker, marker + entry, 1)
changelog.write_text(changelog_text, encoding="utf-8")

Path("RELEASE_NOTES.md").write_text('''# Fan Poker Deck v1.0.2

This patch fixes three interaction defects without changing the public `1.x` API.

## Fixed

- The focus-visible outline is now drawn inside the current card instead of around the entire fan stage.
- Mouse drags are cancelled when the primary button is released unexpectedly or pointer capture is lost.
- Wheel input over the current card scrolls its content and no longer changes cards.
- Nested scroll detection is limited to scroll containers inside the current card.

## Compatibility

Markup, attributes, methods, events, CSS custom properties, CSS Parts, TypeScript declarations, and SSR behavior remain compatible with v1.0.0 and v1.0.1.

```bash
npm install @hubujiu/fan-poker-deck@1.0.2
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.2/dist/fan-poker.js">
</script>
```

## Verification

- Node 20, 22, and 24 validation
- Node and SSR import checks
- npm package payload and size checks
- Chromium interaction and accessibility smoke tests
- npm Registry, jsDelivr, and unpkg verification through Trusted Publishing
''', encoding="utf-8")

Path(".github/npm-publish-trigger").write_text(
    "publish @hubujiu/fan-poker-deck@1.0.2\n"
    "triggered: 2026-07-18T04:45:00Z\n"
    "mode: oidc-trusted-publishing-registry-and-cdn-verification\n",
    encoding="utf-8",
)
