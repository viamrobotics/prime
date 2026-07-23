# @viamrobotics/claude-config

A CLI that installs, updates, and doctors Viam's shared Claude agent tooling in a repo — `.claude/` rules and settings, `.mcp.json`, the `CLAUDE.md` scaffold, the `# Claude Code` gitignore block, the `claude-*.yml` workflow caller-stubs, the composite `setup` action, and `weekly-dependency-update.yml`.

The canonical assets are owned here and rendered per-repo from a small `claude-config.json` manifest, so they stay consistent and any local edit to a managed file shows up as drift.

## Quick start

```bash
# First touch: scaffold a manifest, then install the managed files.
pnpm dlx @viamrobotics/claude-config init
pnpm dlx @viamrobotics/claude-config install

# Steady state: pin as a devDependency and gate CI on drift.
pnpm add -D @viamrobotics/claude-config
```

Then add scripts to `package.json`:

```jsonc
{
  "scripts": {
    "claude:doctor": "claude-config doctor",
    "claude:update": "claude-config update",
  },
}
```

## Commands

| Command   | Description                                                           | Exit codes                         |
| --------- | --------------------------------------------------------------------- | ---------------------------------- |
| `init`    | Sniff the repo and scaffold `claude-config.json`.                     | 0 ok / 3 manifest exists / 1 error |
| `install` | Render the manifest and write every managed file (idempotent).        | 0 ok / 2 bad manifest / 1 error    |
| `update`  | Re-render after a version bump and report the delta.                  | 0 ok / 1 error                     |
| `doctor`  | Read-only drift check. `--fix` reconciles; `--prune` deletes orphans. | 0 clean / 1 drift / 2 error        |

Global flags: `--cwd <dir>`, `--dry-run`, `--json`, `--help`, `--version`.

## The manifest

`claude-config.json` at the repo root declares the repo's stack and variables. Point `$schema` at the installed schema for editor completion:

```jsonc
{
  "$schema": "./node_modules/@viamrobotics/claude-config/schema/manifest.schema.json",
  "repo": {
    "name": "my-repo",
    "monorepo": false,
    "packageManager": "pnpm",
    "nodeVersion": "22",
  },
  "rules": { "modules": { "svelte": true, "typescript": true } },
  "mcp": { "svelteTransport": "stdio" },
  "outputStyle": { "terse": "default" },
}
```

See [schema/manifest.schema.json](./schema/manifest.schema.json) for the full field reference.
