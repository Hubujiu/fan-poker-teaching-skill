# Versioning and migration

Fan Poker Deck follows semantic versioning.

## Current production pin

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js"></script>
```

## v1 → v2

v2 is a major release because it removes the fixed visual card template.

Removed presentation contract:

- `tag`
- `title` as a rendered heading
- `symbol`
- `accent`
- fixed cover, index, title, body, and footer Parts
- component-managed light/dark card theme

The JavaScript runtime still accepts `title` as an accessible-label alias during migration, but it does not render a title block.

### v1

```html
<fan-card tag="Git" title="Working tree" symbol="01" accent="#f2a65a">
  Uncommitted changes.
</fan-card>
```

### v2

```html
<fan-card aria-label="Working tree">
  <style>
    :host {
      display: block;
      min-height: 100%;
      background: #f2a65a;
    }

    article {
      min-width: 100%;
      min-height: 100%;
      padding: 28px;
    }
  </style>

  <article>
    <small>Git</small>
    <h1>Working tree</h1>
    <p>Uncommitted changes.</p>
  </article>
</fan-card>
```

Pin `@hubujiu/fan-poker-deck@1.0.3` until a page has migrated its card markup.

Minor releases add compatible API or styling hooks. Patch releases fix defects without intentionally changing the v2 contract.
