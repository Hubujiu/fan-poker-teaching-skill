# Fan Poker Deck v1.0.1

This security-focused patch keeps the v1.0 component code and public API unchanged while migrating npm publication to Trusted Publishing with GitHub Actions OIDC.

## What changed

- Removed the npm write-token requirement from the publish job
- Added an explicit GitHub OIDC environment check before a new version is published
- Added `docs/PUBLISHING.md` with the trusted publisher identity and release process
- Expanded `SECURITY.md` with supported-version, reporting, trusted-HTML, and supply-chain guidance
- Added the authentication model to automated publication results

## Runtime compatibility

There are no runtime, markup, TypeScript, event, CSS variable, or CSS Part changes from v1.0.0.

Existing pages can remain pinned to v1.0.0. New installations may use:

```bash
npm install @hubujiu/fan-poker-deck@1.0.1
```

Or the fixed CDN module:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.1/dist/fan-poker.js">
</script>
```

## Supply-chain verification

The release is accepted only after:

- Node 20, 22, and 24 validation
- Node and SSR import checks
- npm package payload inspection
- distribution size-budget validation
- Chromium interaction and accessibility tests
- npm Registry, jsDelivr, and unpkg verification

The npm package is published by the `publish-npm.yml` GitHub Actions workflow using a short-lived OIDC credential tied to this repository and workflow.
