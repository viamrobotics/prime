---
paths:
  - '.changeset/**'
  - 'CHANGELOG.md'
---

# Changesets

Any PR that changes runtime behavior in a published package needs a changeset in `.changeset/`. One changeset can bump several packages.

Run `pnpm changeset`. It prompts for the packages and bump type, then writes `.changeset/<random-name>.md`:

```markdown
---
'@viamrobotics/<package-a>': minor
'@viamrobotics/<package-b>': patch
---

Add `variant="ghost"` to `Button` and fix focus ring on disabled state.
```

Bump types:

- `major`: breaking public API change. Rare, coordinate before merging.
- `minor`: new component, prop, export, or capability.
- `patch`: bug fix, perf, security, dependency bump, internal refactor.

The summary is one imperative phrase in changelog voice:

- `Fix focus ring on disabled Button`
- `Add ghost variant to Button`
- `sec: update tar dependency`
- `Make Dialog expose explicit open and close methods`

Skip a changeset only when nothing reaches consumers: CI config, test-only, docs-only, internal tooling.
