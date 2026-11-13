# prime

Pretty Rad Interactive Modular Elements, Viam's Svelte 5 component-library monorepo.

## Monorepo layout

Two top-level workspaces:

- `packages/<name>/` — published-to-npm libraries and configs. Each owns its `package.json`, build, tests, and `CLAUDE.md`.
- `docs/` — the Astro Starlight documentation site, `private: true`, which consumes every package. It is the only app in the repo.

The workspace root holds shared tooling (lint, format, changesets, CI).

## Packages

| Package                                                                 | Purpose                                                             |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@viamrobotics/prime-ui`](packages/prime-ui/CLAUDE.md)                 | Svelte 5 component library — the v2 of prime.                       |
| [`@viamrobotics/prime-panes`](packages/prime-panes/CLAUDE.md)           | Resizable, rearrangeable split-pane layouts for Svelte 5.           |
| [`@viamrobotics/prime-tree`](packages/prime-tree/CLAUDE.md)             | Headless tree view for Svelte 5.                                    |
| [`@viamrobotics/prime-controls`](packages/prime-controls/CLAUDE.md)     | Compact realtime controls for tool panels: scrubbing number fields. |
| [`@viamrobotics/prime-editor`](packages/prime-editor/CLAUDE.md)         | A CodeMirror 6 code editor with Viam's code tokens and a diff view. |
| [`@viamrobotics/tailwind-config`](packages/tailwind-config/CLAUDE.md)   | Viam's shared Tailwind CSS v4 configuration: design tokens + fonts. |
| [`@viamrobotics/tweakpane-config`](packages/tweakpane-config/CLAUDE.md) | Shared Tweakpane theme and helpers for the docs demos.            |

## Docs

[`prime-docs`](docs/CLAUDE.md) is the Astro Starlight documentation site. Every library package is demonstrated on its own page, and it deploys to GitHub Pages.

### Docs-as-demo convention

Every package is demonstrated on its page in the docs site (`docs/`), and no package has an app of its own. Demos are Svelte islands that sit beside their page under `src/content/docs/packages/<package>/`. `astro dev` resolves every workspace library to its source through [docs/source-aliases.mjs](docs/source-aliases.mjs), so an edit to a package hot-reloads into its page. `astro build` renders each package's built `dist`, and the docs `build` script declares those package builds as wireit dependencies. To add a package to the docs, follow "Adding a package page" in [docs/CLAUDE.md](docs/CLAUDE.md).

## Tech stack (workspace-level)

| Layer           | Technology       |
| --------------- | ---------------- |
| Package manager | pnpm workspaces  |
| Node            | 24 (`.nvmrc`)    |
| Frontend        | Svelte 5 (runes) |
| Styling         | TailwindCSS      |
| Testing         | Vitest           |
| Task runner     | wireit           |
| Versioning      | Changesets       |

Per-package testing/build tooling is documented in each package's `CLAUDE.md`.

## Commands

```
pnpm build                    # whole workspace, in dependency order
pnpm check                    # svelte-check
pnpm lint                     # eslint (check only)
pnpm format                   # prettier --check
pnpm test                     # vitest
pnpm lint:fix                 # eslint --fix, every package
pnpm format:fix               # prettier --write, every package
pnpm exec houserules doctor   # validate the kit-managed .claude/ install
pnpm exec houserules update   # refresh kit files after a @houserules/* bump
```

**Task orchestration.** `build`/`check`/`lint`/`format`/`test` are run through [wireit](https://github.com/google/wireit): each package's script declares its inputs (`files`), outputs, and cross-package `dependencies`, so unchanged work is skipped or restored from cache, locally (`.wireit/`, gitignored) and in CI (GitHub Actions cache, set up by the `.github/actions/setup` composite). Run `pnpm <build|check|lint|format|test>` at the root (whole workspace, in dependency order) or `pnpm --filter <pkg> run <script>` for one package plus its declared deps. `WIREIT_CACHE=none` forces a real re-run. The `:fix` variants stay plain recursive commands since they mutate files.

**Shared dependency versions** live in the `catalog:` block of [pnpm-workspace.yaml](pnpm-workspace.yaml); packages reference them with `"<dep>": "catalog:"`. Bump a shared toolchain version there, not per-package.

## Generated code — never hand-edit

`.claude/scripts/` is build output written by houserules and gitignored. If a hook reports a missing script, run `pnpm exec houserules update`.

## Design system

prime implements the Viam design system. The source of truth lives at **https://design.viam.com/guides/intro/**. Verify visual treatment, naming, and interaction patterns there before inventing new ones.

The tokens themselves are the `@theme` blocks in [`packages/tailwind-config`](packages/tailwind-config/CLAUDE.md). houserules' `design.mjs` reads them through a stylesheet that imports Tailwind. Several files in this workspace do, so `design.themeEntry` in `.claude/houserules.config.json` names the entry point, `packages/prime-ui/tailwind.css`:

```
node .claude/scripts/design.mjs <query>
```

Five entry points compile under standalone Tailwind: `packages/prime-ui/tailwind.css`, a tooling-only file also used by prettier-plugin-tailwindcss, and the `test/tailwind.css` fixture stylesheet in `prime-panes`, `prime-tree`, `prime-controls`, and `prime-editor`. `docs/src/tailwind.css` imports the `@viamrobotics/tailwind-config/dark` export subpath and `starlight-theme-nova/tailwind.css`, paths that Vite and Astro resolve and standalone Tailwind does not, so it exits 1. Pass `--theme <path>` to read a different entry point.

`packages/prime-ui/styles.css` is a stylesheet with a different job: it is the entry prime-ui **ships** (`exports["./styles.css"]`) so a consumer's Tailwind scans the package's compiled components, which automatic content detection skips under `node_modules`. It imports the tokens, and holds an `@source`, with no `@import "tailwindcss"`, so a consumer writes one import after `tailwindcss` and it is not a `--theme` candidate. The tooling `tailwind.css` imports it, so the components' classes resolve for prettier, `design.mjs`, and the browser specs.

## Topic-specific rules

Detailed guidance lives in `.claude/rules/`. Path-scoped rules load when Claude reads matching files; rules without `paths` load every session. The svelte, typescript, testing, design, accessibility, code-comments, prose-voice, and code-cleanliness rules are installed and documented by houserules, see the block below. The repo-owned rules:

| Rule                        | Loads when                                                                      |
| --------------------------- | ------------------------------------------------------------------------------- |
| `viam-context.md`           | every session (design system context)                                           |
| `no-internal-references.md` | every session (committed text never names plans, PRs, branches, or local paths) |

<!-- houserules:claude-md start -->

### houserules sections

Maintained by `npx houserules update`. Text outside the markers is yours and never touched.
Fuller templates live in `.claude/templates/`.

### Skill triggers

- After a meaningful change to a package: record a changeset with `/changeset`, **before
  the commit**.
- Too big to hold in one plan: scaffold with `/plan-project`, then execute each phase with
  `/orchestrate`.

### Conventions

- **The user always handles `git commit` / `push` / PR-create.** Describe what is ready and stop.
- **Edit from the file's current bytes.** Re-read before editing when your view of it is
  second-hand (a snapshot, a lint error, another tool's output) or the user may have it open.
- **Do not rewrite what is not yours to change.** When the user presents a file as their own
  finished work, or has it open mid-edit, surface the problem and let them decide.
- **Watch for the missing `[houserules]` SessionStart banner.** Without it, the session started
  below the repo root and the installed hooks, including the Bash guard, are not active. Tell
  the user to relaunch Claude Code from the repo root.

### Cost & verification discipline

- Implement stage-sized work (a handful of files) in-context, with no implementation subagents.
  Reserve subagents for parallel or unbounded work (wide sweeps, migrations).
- Exception, a planned phase under `/orchestrate`: dispatch as that skill says. Never pull a
  worker’s diff into the main context.
- Verify with static gates (tests, typecheck, lint) plus a short falsifiable acceptance checklist
  for the user. No browser/screenshot verification unless explicitly asked.
- Run them in order, scoped to the packages you changed: format first, then lint with autofix,
  then typecheck and test, so only real problems are left.
- **"Done" means every check passed, not that the edits were made.** Report a check that failed
  or never ran, with its output. The recorded evasions, and what each one means:
  - "The edits are in, so it is done": done is the checks passing, with output you read.
  - "I know this fact from memory": state it only after running the command that could falsify it.
  - "It passed earlier": a stale or cached pass is not this change's pass. Re-run on current bytes.
  - "The subagent reported success": the tree is the evidence, not the report.
- When the user is blocked on each turn, a cheap reversible action is itself the check. Run it
  and let its result falsify, with at most one cheaper check first.
- Derive empirical constants by parsing the artifact itself, not screenshot-and-iterate loops.
- A subagent runs a command expected to outlast the default Bash timeout with
  `run_in_background: true`, ends its turn without reporting, and reports when the completion
  notification re-invokes it, reading the output file it names. A foreground call blocks the
  subagent until Claude Code moves it to the background anyway, so starting it there saves the
  blocked minutes and lets the subagent end its turn.
- On AskUserQuestion timeout, stop and re-ask later. Never carry tentative selections forward.
- Read the repo's own docs + targeted greps before fanning out Explore/Plan agents.

### Tool-use efficiency

- `grep -n` to locate, then `Read` with `offset`/`limit`. Grep output is location data, not
  content: never judge text against a grep listing of it.
- Pipe long command output through `grep`, and batch related greps into one call.

<!-- houserules:claude-md end -->
