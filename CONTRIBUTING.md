# Contributing

Thanks for helping make this teaching deck more useful.

## Good contributions

- Accurate lesson examples in new domains
- Accessibility improvements
- Animation fixes that preserve the single-sided fan and return-to-back behavior
- Better validation and Agent Skill trigger tests
- Documentation improvements in Chinese or English

## Before opening a pull request

1. Keep the repository dependency-free unless a build-only tool has a clear benefit.
2. Run `npm test`.
3. Open `index.html` and any changed example in a browser.
4. Confirm that cards are not clipped while moving.
5. For animation changes, include a screenshot, GIF, or clear before/after explanation.
6. For lesson examples, keep one learning job per card and verify technical commands.

## Commit style

Use a concise imperative summary, for example:

- `Add Git lesson example`
- `Fix reverse drag return path`
- `Improve card content validation`

## Scope

Please do not reintroduce the removed top toolbar, page counter, or bottom numbered navigation. They are intentionally excluded from the visual contract.
