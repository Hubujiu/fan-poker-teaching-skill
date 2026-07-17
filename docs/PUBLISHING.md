# Publishing

The package is released from `.github/workflows/publish-npm.yml` with npm Trusted Publishing.

## npm configuration

Use these values in the package's Trusted Publisher settings:

- Provider: GitHub Actions
- Organization or user: `Hubujiu`
- Repository: `fan-poker-teaching-skill`
- Workflow filename: `publish-npm.yml`
- Environment: none
- Allowed action: `npm publish`

## Release process

1. Update the package version, changelog, and release notes.
2. Run the Node matrix, package inspection, size budget, and Chromium tests.
3. Merge the release pull request.
4. Run the npm publishing workflow.
5. Verify npm Registry, jsDelivr, and unpkg.
6. Publish the matching GitHub Release.

The workflow is idempotent. Existing versions are not republished and are only rechecked.

## Authentication model

The workflow runs on a GitHub-hosted runner with `id-token: write`. npm exchanges the GitHub OIDC identity for a short-lived credential tied to this repository and workflow.

After the OIDC release has been verified, remove the old GitHub Actions npm write credential and revoke its matching npm access token. Package publishing access should then be configured to require two-factor authentication and disallow traditional tokens.

## Troubleshooting

- Authentication failure: check the case-sensitive repository and workflow filename in npm settings.
- Registry succeeds before CDN: wait for propagation and rerun the idempotent workflow.
- Version already exists: increment the package version because npm versions are immutable.
