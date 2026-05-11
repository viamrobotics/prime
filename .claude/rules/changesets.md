---
paths:
  - '.changeset/**'
  - 'CHANGELOG.md'
---

# Changesets

Every PR that changes runtime behavior in a published package needs a changeset in `.changeset/`. prime is a pnpm monorepo; a single changeset can bump one or many packages under `packages/*`. See [CHANGELOG.md](../../CHANGELOG.md) for voice and existing `.changeset/*.md` files for format.

## Creating a Changeset

Run `pnpm changeset` — it prompts for which packages to bump, the bump type, and writes `.changeset/<random-name>.md` with the right frontmatter.

The frontmatter lists each affected package and its semver bump:

```markdown
---
'@viamrobotics/<package-a>': minor
'@viamrobotics/<package-b>': patch
---

Add `variant="ghost"` to `Button` and fix focus ring on disabled state.
```

## Bump Types

Bump types follow semver:

- `major` — breaking public API changes (rare; coordinate before merging).
- `minor` — additive features, new capabilities (new components, props, or exports).
- `patch` — bug fixes, perf, security, dependency bumps, internal refactors.

## Summary Voice

Summary is one imperative phrase matching the changelog voice. Examples:

- `Fix focus ring on disabled Button`
- `Add ghost variant to Button`
- `sec: update tar dependency`
- `Make Dialog expose explicit open and close methods`

## When to Skip

Skip a changeset only for changes that don't affect consumers of any package: CI config, test-only edits, docs-only edits, internal tooling, and changes scoped entirely to the workspace root (which is `private: true`).
