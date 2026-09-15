# prime

Pretty Rad Interactive Modular Elements — Viam's Svelte 5 component-library monorepo. See [ROADMAP.md](ROADMAP.md) for the v2 migration plan; the workspace is currently being rebuilt and most packages haven't landed yet.

## Monorepo layout

Two top-level workspaces:

- `packages/<name>/` — published-to-npm libraries and configs. Each owns its `package.json`, build, tests, and `CLAUDE.md`.
- `apps/<name>/` — deployable apps that consume the packages. Always `private: true`. Currently just the docs site.

The workspace root holds shared tooling (lint, format, changesets, CI).

## Packages

| Package                                                                 | Purpose                                                             |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@viamrobotics/prime-ui`](packages/prime-ui/CLAUDE.md)                 | Svelte 5 component library — the v2 of prime.                       |
| [`@viamrobotics/tailwind-config`](packages/tailwind-config/CLAUDE.md)   | Viam's shared Tailwind CSS v4 configuration: design tokens + fonts. |
| [`@viamrobotics/tweakpane-config`](packages/tweakpane-config/CLAUDE.md) | Shared Tweakpane theme and helpers for the playgrounds.             |

## Apps

| App                                 | Purpose                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`prime-docs`](apps/docs/CLAUDE.md) | Astro Starlight documentation site + embedded playgrounds for each library package. Deployed to GitHub Pages. |

### Playground convention

Each library package's existing SvelteKit `src/routes/` _is_ its playground. The docs site (`apps/docs/`) builds each package's playground as a static bundle, mounts each under `/playground/<package-name>/`, and links to them from the Starlight sidebar. The docs `build:playgrounds` script declares each library's playground build as a wireit dependency (so they build first, with the shared `DOCS_BASE` env var driving each package's base path) and then copies their output into place — see [apps/docs/scripts/build-playgrounds.mjs](apps/docs/scripts/build-playgrounds.mjs). To add a playground for a new library, give it a static SvelteKit app under `src/routes/`, then wire it into both that script and the `build:playgrounds` dependencies in [apps/docs/package.json](apps/docs/package.json).

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

The tokens themselves are the `@theme` blocks in [`packages/tailwind-config`](packages/tailwind-config/CLAUDE.md). houserules' `design.mjs` reads them through a stylesheet that imports Tailwind, and four files in this workspace do, so **always name the entry point**:

```
node .claude/scripts/design.mjs <query> --theme packages/prime-ui/src/routes/layout.css
```

All four reach the same 74 Viam tokens, but only two compile under standalone Tailwind: the `src/routes/layout.css` entries in `prime-ui` and `tailwind-config`. The other two import paths that Vite and Astro resolve and standalone Tailwind does not (`starlight-theme-nova/tailwind.css` in docs, the `@viamrobotics/tailwind-config/dark` export subpath in tweakpane-config), so they exit 1. Without `--theme` the script takes the first in directory-walk order, `apps/docs/src/tailwind.css`, which is one of the two that fail.

## Topic-specific rules

Detailed guidance lives in `.claude/rules/`. Path-scoped rules load when Claude reads matching files; rules without `paths` load every session. The svelte, typescript, testing, design, accessibility, code-comments, prose-voice, and code-cleanliness rules are installed and documented by houserules, see the block below. The one repo-owned rule:

| Rule              | Loads when                            |
| ----------------- | ------------------------------------- |
| `viam-context.md` | every session (design system context) |

<!-- houserules:claude-md start -->

### houserules sections

This block is maintained by `npx houserules update`. Content outside the markers is yours
and never touched. Templates for a fuller CLAUDE.md skeleton and for guardrail rules live
in `.claude/templates/`.

### Skill triggers

- After a meaningful change to a package: record a changeset with `/changeset`, **before
  the commit**.
- Too big to hold in one plan: scaffold with `/plan-project`, then execute each phase with
  `/orchestrate`.

### Conventions

- **The user always handles `git commit` / `push` / PR-create.** Describe what is ready and stop.
  (Enforced by `.claude/scripts/guard-bash.mjs`.)
- **Edit from the file's current bytes.** Re-read before editing when your view of it is
  second-hand (an earlier snapshot, a build or lint error, another tool's output) or the user may
  have it open. A tool's report and the file on disk can disagree within seconds.
- **Do not rewrite what is not yours to change.** When the user presents a file as their own
  finished work, or has it open mid-edit, surface the problem and let them decide.
- **Watch for the missing `[houserules]` SessionStart banner.** Every session start prints a
  `[houserules] branch:` line. If this session shows none, it started below the repo root and
  the installed hooks, including the Bash guard, are not active, so tell the user and suggest
  relaunching Claude Code from the repo root.

### Cost & verification discipline

- Stage-sized work (≤ a handful of files): implement directly in-context, with no implementation
  subagents. Reserve subagents for genuinely parallel or unbounded work (wide sweeps, migrations).
- Exception, a planned phase under `/orchestrate`: dispatch one scoped `task-worker` per slice
  and review the returned reports. Never pull a worker’s diff into the main context.
- Verify with static gates (tests, typecheck, lint) plus a short falsifiable acceptance checklist
  for the user. No browser/screenshot verification unless explicitly asked.
- Run those gates in order: format first, since it rewrites in place and settles the mechanical
  noise, then lint with autofix so only real problems are left, then typecheck and test. Scope
  each command to the packages you changed. This order is for work you do yourself.
  When subagents are editing in parallel, the fixer runs once after they report, never inside
  one of them, since it rewrites files their siblings still have open.
- **"Done" means every check passed, not that the edits were made.** Report a check that failed
  or never ran, with its output. Never claim success over one you did not see pass.
  The recorded evasions, and what each one actually means:
  | Excuse | Reality |
  | --- | --- |
  | "The edits are in, so it is done" | Done is the checks passing, with output you read. |
  | "I know this fact from memory" | State it only after running the command that could falsify it. |
  | "It passed earlier" | A stale or cached pass is not this change's pass. Re-run on current bytes. |
  | "The subagent reported success" | The tree is the evidence. Check it before believing the report. |
- In a live loop where the user is blocked on each turn, a cheap reversible action is itself
  the check: run it and let its result falsify, instead of multi-call pre-verification (doc
  fetches, code surveys). Cap pre-action checks at the single cheapest one.
- Derive empirical constants by parsing the artifact itself, not screenshot-and-iterate loops.
- On AskUserQuestion timeout, stop and re-ask later. Never carry tentative selections forward.
- Read the repo's own docs + targeted greps before fanning out Explore/Plan agents.

### Tool-use efficiency

- `grep -n` to locate, then `Read` with `offset`/`limit`. Never read big files whole.
  Grep output is location data, not content: never judge text against a grep listing of it.
- Never `git stash` to baseline-check. Use `git diff --name-only` / `git show HEAD:<path>`.
- Never `git checkout -- <path>` / `git restore` to undo an edit. They revert the whole file
  to HEAD, discarding every uncommitted change in it. Undo with the inverse Edit.
- Pipe long command output through `grep`, and batch related greps into one call.

<!-- houserules:claude-md end -->
