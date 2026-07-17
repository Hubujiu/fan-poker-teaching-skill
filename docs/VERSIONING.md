# Versioning policy

The npm package follows Semantic Versioning.

## Patch releases

Patch releases may include bug fixes, documentation corrections, performance improvements, test improvements, and internal refactoring that preserve the public contract.

## Minor releases

Minor releases may add optional attributes, methods, events, event fields, CSS custom properties, CSS Parts, exports, examples, or tooling metadata. Existing behavior remains compatible.

## Major releases

A major release is required to remove or rename a documented public attribute, method, event, event-detail field, module export, CSS custom property, or CSS Part, or to substantially change its meaning.

## Deprecation

When practical, deprecated APIs remain available for at least one minor release and are documented in the changelog before removal in a later major version.

## Fixed CDN versions

Production pages should pin an exact version:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js"></script>
```

Using `@latest` is convenient for experiments but can introduce unreviewed changes.

## Release checklist

A stable release must pass:

1. source and distribution equality;
2. API-contract validation;
3. Node/SSR import tests;
4. distribution size budget;
5. npm package-content inspection;
6. Chromium behavior and accessibility smoke tests;
7. npm Registry, jsDelivr, and unpkg verification.

The checked-in `RELEASE_NOTES.md` is the canonical body for the matching GitHub Release.
