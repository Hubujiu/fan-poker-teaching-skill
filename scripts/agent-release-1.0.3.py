from pathlib import Path


def replace_once(path: str, old: str, new: str, label: str) -> None:
    file = Path(path)
    text = file.read_text(encoding="utf-8")
    if new in text and old not in text:
        return
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    file.write_text(text.replace(old, new, 1), encoding="utf-8")


# Keep the accessible keyboard focus indicator without framing the full card.
replace_once(
    "src/fan-poker.js",
    '''  :host(:focus-visible) .card.is-current {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: -4px;
  }
''',
    '''  :host(:focus-visible) .card.is-current .card-index {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: 2px;
  }
''',
    "focus indicator CSS",
)

replace_once(
    "scripts/browser-smoke.html",
    '''    checks.push([
      "focusRingOnCurrentCard",
      styleText.includes(":host(:focus-visible) .card.is-current") &&
        !styleText.includes(":host(:focus-visible) .stage")
    ]);
''',
    '''    checks.push([
      "focusRingOnCardIndex",
      styleText.includes(":host(:focus-visible) .card.is-current .card-index") &&
        !styleText.includes(":host(:focus-visible) .card.is-current {") &&
        !styleText.includes(":host(:focus-visible) .stage")
    ]);
''',
    "focus indicator browser check",
)

# Publish as a new immutable patch version.
replace_once(
    "package.json",
    '  "version": "1.0.2",',
    '  "version": "1.0.3",',
    "package version",
)

for path in [
    "README.md",
    "README_EN.md",
    "SKILL.md",
    "docs/FRAMEWORKS.md",
    "docs/VERSIONING.md",
    "index.html",
]:
    file = Path(path)
    text = file.read_text(encoding="utf-8")
    if "1.0.2" not in text and "1.0.3" not in text:
        raise SystemExit(f"{path}: current version marker missing")
    file.write_text(text.replace("1.0.2", "1.0.3"), encoding="utf-8")

replace_once(
    "README.md",
    "- 焦点框限定在当前卡片，不再包围整个扇形区域",
    "- 键盘焦点提示缩小到当前卡片左上角编号，不再给整张卡片描边",
    "Chinese README focus note",
)
replace_once(
    "README_EN.md",
    "- Focus indication stays inside the active card instead of outlining the full fan stage",
    "- Keyboard focus indication is limited to the active card's index badge instead of framing the card",
    "English README focus note",
)

validate = Path("scripts/validate.mjs")
validate_text = validate.read_text(encoding="utf-8")
validate_text = validate_text.replace(
    'if (pkg.version !== "1.0.2") errors.push("package version must be 1.0.2");',
    'if (pkg.version !== "1.0.3") errors.push("package version must be 1.0.3");',
)
validate_text = validate_text.replace(
    'console.log("✓ trusted publishing documentation and package metadata are ready for v1.0.2");',
    'console.log("✓ trusted publishing documentation and package metadata are ready for v1.0.3");',
)
if "package version must be 1.0.2" in validate_text or "ready for v1.0.2" in validate_text:
    raise SystemExit("validation version update did not complete")
validate.write_text(validate_text, encoding="utf-8")

changelog = Path("CHANGELOG.md")
changelog_text = changelog.read_text(encoding="utf-8")
entry = '''## 1.0.3 - 2026-07-18

### Fixed

- Replaced the active-card focus outline with a compact focus indicator around the card index badge
- Prevented the keyboard focus state from making every newly active card look permanently framed

### Compatibility

- Public markup, methods, events, CSS custom properties, CSS Parts, TypeScript declarations, and SSR behavior are unchanged

'''
if "## 1.0.3 - 2026-07-18" not in changelog_text:
    marker = "# Changelog\n\n"
    if changelog_text.count(marker) != 1:
        raise SystemExit("changelog heading marker missing")
    changelog_text = changelog_text.replace(marker, marker + entry, 1)
changelog.write_text(changelog_text, encoding="utf-8")

Path("RELEASE_NOTES.md").write_text('''# Fan Poker Deck v1.0.3

This patch removes the visible frame that followed every active card while preserving an accessible keyboard focus indicator.

## Fixed

- The full active card is no longer outlined when the deck has keyboard focus.
- Keyboard focus is indicated with a compact outline around the active card's top-left index badge.
- The original fixes for pointer cleanup and card-content wheel scrolling remain unchanged.

## Compatibility

There are no public API, markup, event, CSS custom property, CSS Part, TypeScript, or SSR contract changes.

```bash
npm install @hubujiu/fan-poker-deck@1.0.3
```

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.3/dist/fan-poker.js">
</script>
```

## Verification

- Node 20, 22, and 24 validation
- Chromium interaction and accessibility smoke tests
- npm package payload and size checks
- npm Registry, jsDelivr, and unpkg verification through Trusted Publishing
''', encoding="utf-8")

Path(".github/npm-publish-trigger").write_text(
    "publish @hubujiu/fan-poker-deck@1.0.3\n"
    "triggered: 2026-07-18T07:30:00Z\n"
    "mode: oidc-trusted-publishing-registry-and-cdn-verification\n",
    encoding="utf-8",
)
