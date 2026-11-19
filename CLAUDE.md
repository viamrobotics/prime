# prime

Pretty Rad Interactive Modular Elements, Viam's Svelte 5 component-library monorepo: pnpm workspaces, Node 24 (`.nvmrc`), Svelte 5 runes, Tailwind CSS v4, Vitest, wireit, and Changesets.

## Layout

Each package publishes as `@viamrobotics/<name>` and owns its build, tests, and `CLAUDE.md`:

- [`prime-ui`](packages/prime-ui/CLAUDE.md): the component library, the v2 of prime.
- [`prime-panes`](packages/prime-panes/CLAUDE.md): resizable, rearrangeable split panes.
- [`prime-tree`](packages/prime-tree/CLAUDE.md): headless tree view.
- [`prime-controls`](packages/prime-controls/CLAUDE.md): realtime tool-panel controls.
- [`prime-editor`](packages/prime-editor/CLAUDE.md): CodeMirror 6 editor with a diff view.
- [`tailwind-config`](packages/tailwind-config/CLAUDE.md): design tokens and fonts.
- [`tweakpane-config`](packages/tweakpane-config/CLAUDE.md): Tweakpane theme for the docs demos.

[`docs/`](docs/CLAUDE.md) is the Astro Starlight site and the only app. Every package is demonstrated on its page there, never in an app of its own.

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

`build`, `check`, `lint`, `format`, and `test` run through [wireit](https://github.com/google/wireit), cached in `.wireit/` and in CI. `pnpm --filter <pkg> run <script>` runs one package plus its declared deps. `WIREIT_CACHE=none` forces a real re-run. Shared dependency versions live in the `catalog:` block of [pnpm-workspace.yaml](pnpm-workspace.yaml).

`.claude/scripts/` is houserules build output, gitignored. Never hand-edit it. If a hook reports a missing script, run `pnpm exec houserules update`.

Design tokens are the `@theme` blocks in `packages/tailwind-config`, read by `design.mjs`. See `.claude/rules/viam-context.md`.

<!-- houserules:claude-md start -->

### houserules sections

Maintained by `npx houserules update`. Text outside the markers is yours and never touched.
Fuller templates live in `.claude/templates/`.

### Skill triggers

- After a meaningful change to a package: record a changeset with `/changeset`, **before
  the commit**.
- Too big to hold in one plan: scaffold with `/plan-project`, then execute each phase with
  `/orchestrate`.
- Building UI, an artifact, or a deck? Take colors, type, and spacing from the Tailwind theme
  via `node .claude/scripts/design.mjs token <name>`, never a palette of your own.

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
