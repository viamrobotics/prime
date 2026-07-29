# @viamrobotics/claude-config

CLI that installs, updates, and doctors Viam's shared Claude agent tooling across repos. Managed assets: `.claude/` rules and `settings.ci.json`, `.mcp.json` (plus `.vscode/mcp.json`), the opt-out `Terse` output style, the opt-in `SessionStart` hook, `.nvmrc`, the `CLAUDE.md` rules table, and the `# Claude Code` gitignore and prettierignore blocks.

The manifest's `ci`, `verify`, and `workflows` sections are validated but emit nothing yet. They are the inputs for the five `claude-*.yml` caller-stubs, the composite `setup` action, and `weekly-dependency-update.yml`, which have not landed. `WORKFLOWS_REF` therefore only reaches the lockfile and the `update` delta report.

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

- `src/cli.ts` the `#!/usr/bin/env node` entry, dispatching through `commander`. Flags are scoped per subcommand, so `install --fix` is an error rather than a silent no-op.
- `src/commands/` one file per command.
- `src/core/` `render` (micro-renderer), `modules` (registry), `plan` (manifest to RenderPlan), `drift` (doctor engine), `regions`, `lockfile`, `manifest`, `templates`, `constants`.
- `templates/` canonical assets. `.md` rules are copied verbatim, `*.tmpl` files interpolate.
- `schema/manifest.schema.json` is **generated** from the zod schema in `src/core/manifest.ts` by `pnpm run schema`, and powers editor IntelliSense via `$schema`. Never hand-edit it; `test/schema.test.ts` fails when it falls out of sync.
- `test/` vitest, pure Node. `test/fixtures/manifests/` holds four repo manifests that drive the `buildPlan` snapshots. Rot is proven in the tests themselves, not in a fixture: `drift.test.ts` installs into a temp repo, tampers with a managed file, and asserts `doctor` reports it and `--fix` restores it; `snapshots.test.ts` asserts no foreign tech leaks into a rule set.

## Conventions

- **Zero-transitive-dependency runtime deps.** Prefer `node:*`. A runtime dependency is allowed only if the package has no dependencies of its own, so the install graph stays flat and auditable. This tool writes into many repos, so supply-chain surface is a feature, not an oversight. That bar is what rules out `tinyglobby` (pulls `fdir`, `picomatch`), `ajv` (4 packages), and all of thi.ng (everything pulls `@thi.ng/api`). The current set is `zod`, `commander`, `diff`, `markdown-table`, and `dequal`. Runs on Node 22+ (`engines.node: ">=22"`).
- **No template loops.** The renderer supports only `{{var}}` and `{{#if flag}}…{{/if}}` / `{{^flag}}…{{/if}}`. Build lists such as allowed-tools and secret blocks in TypeScript with correct indentation and inject them as string vars. YAML whitespace is the one real correctness risk.
- **Rules are static.** A shared rule is one canonical file copied byte-for-byte. Per-repo variation lives in the manifest, never in a hand-edit. That discipline is what prevents rot. The one exception is `viam-context.md.tmpl`, whose source table is per-repo and so is rendered from `viamContext.sources`. Keep it the exception.
- **One place for the pin.** The `claude-ci-workflows` SHA lives in `src/core/constants.ts` as `WORKFLOWS_REF`, never in a manifest. Bumping it and publishing propagates to every repo on `update`.

## Commands

```bash
pnpm --filter @viamrobotics/claude-config build   # tsc -> dist + publint, then schema
pnpm --filter @viamrobotics/claude-config schema  # regenerate schema/manifest.schema.json
pnpm --filter @viamrobotics/claude-config test    # vitest (node)
pnpm --filter @viamrobotics/claude-config check   # tsc --noEmit
pnpm --filter @viamrobotics/claude-config lint    # eslint
```
