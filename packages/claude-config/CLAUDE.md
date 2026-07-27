# @viamrobotics/claude-config

CLI that installs, updates, and doctors Viam's shared Claude agent tooling across repos. Managed assets: `.claude/` rules and `settings.ci.json`, `.mcp.json`, the opt-out `Terse` output style, the `CLAUDE.md` scaffold, the `# Claude Code` gitignore and prettierignore blocks, the five `claude-*.yml` workflow caller-stubs, the composite `setup` action, and `weekly-dependency-update.yml`.

Those assets are copy-pasted between repos today and drift: rules referencing tech a repo does not use, mismatched MCP config, a workflow pin that is hard to bump everywhere. claude-config makes them **canonical, versioned, and rendered per-repo from a manifest**, so a hand-edit to a managed file becomes CI-visible drift.

## How it works

- Canonical assets live in [templates/](./templates/) and ship with the package. `files` includes `templates` and `schema`.
- Each consumer repo has a `claude-config.json` manifest declaring its stack and variables: Node version, package name, MCP transport, enabled rule modules, secrets. See [schema/manifest.schema.json](./schema/manifest.schema.json).
- Commands render templates against the manifest and reconcile the repo:
  - `claude-config init` sniffs the repo and scaffolds `claude-config.json`.
  - `claude-config install` writes every managed file, idempotently.
  - `claude-config update` re-renders and reports the delta after a version bump.
  - `claude-config doctor` is a read-only drift check that exits 1 on drift, the CI contract. `--fix` reconciles.

## Layout

- `src/cli.ts` the `#!/usr/bin/env node` entry, dispatching through `node:util` `parseArgs`.
- `src/commands/` one file per command.
- `src/core/` `render` (micro-renderer), `modules` (registry), `plan` (manifest to RenderPlan), `drift` (doctor engine), `regions`, `lockfile`, `manifest`, `templates`, `constants`.
- `templates/` canonical assets. `.md` rules are copied verbatim, `*.tmpl` files interpolate.
- `schema/manifest.schema.json` the manifest JSON Schema, which also powers editor IntelliSense via `$schema`.
- `test/` vitest, pure Node. `test/fixtures/` holds the four repo manifests plus a deliberately-rotted fixture proving `doctor` catches rot.

## Conventions

- **Zero runtime dependencies.** Everything uses `node:*`. This tool writes into many repos, so keep it supply-chain-minimal and runnable on Node 20+ (`engines.node: ">=20"`, and repos run Node 22 and 24).
- **No template loops.** The renderer supports only `{{var}}` and `{{#if flag}}…{{/if}}` / `{{^flag}}…{{/if}}`. Build lists such as allowed-tools and secret blocks in TypeScript with correct indentation and inject them as string vars. YAML whitespace is the one real correctness risk.
- **Rules are static.** A shared rule is one canonical file copied byte-for-byte. Per-repo variation lives in the manifest, never in a hand-edit. That discipline is what prevents rot. The one exception is `viam-context.md.tmpl`, whose source table is per-repo and so is rendered from `viamContext.sources`. Keep it the exception.
- **One place for the pin.** The `claude-ci-workflows` SHA lives in `src/core/constants.ts` as `WORKFLOWS_REF`, never in a manifest. Bumping it and publishing propagates to every repo on `update`.

## Commands

```bash
pnpm --filter @viamrobotics/claude-config build   # tsc -> dist + publint
pnpm --filter @viamrobotics/claude-config test    # vitest (node)
pnpm --filter @viamrobotics/claude-config check   # tsc --noEmit
pnpm --filter @viamrobotics/claude-config lint    # eslint
```
