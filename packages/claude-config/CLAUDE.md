# @viamrobotics/claude-config

CLI that installs, updates, and doctors Viam's shared "Claude agent tooling" — `.claude/` rules + `settings.ci.json`, `.mcp.json`, the opt-out `Terse` output style (`.claude/output-styles/` + `outputStyle` merged into `.claude/settings.json`), the `CLAUDE.md` scaffold, the `# Claude Code` gitignore block, the five `claude-*.yml` workflow caller-stubs, the composite `setup` action, and `weekly-dependency-update.yml` — across repos.

Those assets are copy-pasted between repos today and drift (rules referencing tech a repo doesn't use, mismatched MCP config, a workflow pin that's hard to bump everywhere). claude-config makes them **canonical, versioned, and rendered per-repo from a manifest**, so a hand-edit to a managed file becomes CI-visible drift.

## How it works

- Canonical assets live in [templates/](./templates/) and ship with the package (`files` includes `templates` + `schema`).
- Each consumer repo has a `claude-config.json` manifest declaring its stack + variables (Node version, package name, MCP transport, enabled rule modules, secrets). See [schema/manifest.schema.json](./schema/manifest.schema.json).
- Commands render templates against the manifest and reconcile the repo:
  - `claude-config init` — sniff the repo and scaffold `claude-config.json`.
  - `claude-config install` — write every managed file (idempotent).
  - `claude-config update` — re-render and report the delta after a version bump.
  - `claude-config doctor` — read-only drift check (exit 1 on drift; the CI contract). `--fix` reconciles.

## Layout

- `src/cli.ts` — `#!/usr/bin/env node` entry; `node:util` `parseArgs` dispatch.
- `src/commands/` — one file per command.
- `src/core/` — `render` (micro-renderer), `modules` (registry), `plan` (manifest → RenderPlan), `drift` (doctor engine), `regions`, `lockfile`, `manifest`, `templates`, `constants`.
- `templates/` — canonical assets. `.md` rules are copied verbatim; `*.tmpl` files interpolate.
- `schema/manifest.schema.json` — manifest JSON Schema (also powers editor IntelliSense via `$schema`).
- `test/` — vitest (pure Node); `test/fixtures/` holds the four repo manifests + a deliberately-rotted fixture that proves `doctor` catches rot.

## Conventions

- **Zero runtime dependencies.** Everything uses `node:*`. This tool writes into many repos, so keep it supply-chain-minimal and runnable on Node 20+ (`engines.node: ">=20"` — repos run Node 22 and 24).
- **No template loops.** The renderer supports only `{{var}}` and `{{#if flag}}…{{/if}}`/`{{^flag}}…{{/if}}`. Build lists (allowed-tools, secret blocks) in TypeScript with correct indentation and inject them as string vars — YAML whitespace is the one real correctness risk.
- **Rules are static.** A shared rule is one canonical file copied byte-for-byte. Per-repo variation lives in the manifest, never in a hand-edit — that discipline is what prevents rot.
- **One place for the pin.** The `claude-ci-workflows` SHA lives in `src/core/constants.ts` (`WORKFLOWS_REF`), never in a manifest; bumping it + publishing propagates to every repo on `update`.

## Commands

```bash
pnpm --filter @viamrobotics/claude-config build   # tsc -> dist + publint
pnpm --filter @viamrobotics/claude-config test    # vitest (node)
pnpm --filter @viamrobotics/claude-config check   # tsc --noEmit
pnpm --filter @viamrobotics/claude-config lint    # eslint
```
