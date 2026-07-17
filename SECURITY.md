# Security Policy

Fan Poker Deck is a dependency-free Web Component and Agent Skill. The component does not collect analytics or send application data to a project-controlled service.

## Reporting a vulnerability

Report security concerns privately through GitHub Security Advisories. Do not publish exploit details in a public issue before a fix is available.

Include the affected version, a minimal reproduction, expected impact, and any suggested mitigation. Please avoid including real secrets or private user data in the report.

## Supported versions

The latest `1.x` release receives security fixes. Older `0.x` releases may receive documentation updates but should not be considered actively supported.

## Card content

The `content` field is rendered as text. The `html` field and child card markup are intended only for trusted or application-sanitized content. Integrating applications remain responsible for sanitizing untrusted HTML and providing safe URLs, image alternatives, and readable color contrast.

## Supply-chain security

npm releases use GitHub Actions and npm Trusted Publishing with short-lived OIDC credentials. Release jobs run tests, inspect the package payload, enforce a size budget, and verify npm Registry, jsDelivr, and unpkg. The publishing process is documented in `docs/PUBLISHING.md`.
