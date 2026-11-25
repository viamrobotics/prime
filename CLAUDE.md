# prime

Pretty Rad Interactive Modular Elements, Viam's Svelte 5 component-library monorepo: pnpm workspaces, Node 24 (`.nvmrc`), runes, Tailwind CSS v4, Vitest, wireit, and Changesets.

## Layout

Each package publishes as `@viamrobotics/<name>` and owns its build, tests, and `CLAUDE.md`:

- [`prime-ui`](packages/prime-ui/CLAUDE.md): the component library, the v2 of prime.
- [`prime-panes`](packages/prime-panes/CLAUDE.md): resizable, rearrangeable split panes.
- [`prime-tree`](packages/prime-tree/CLAUDE.md): headless tree view.
- [`prime-controls`](packages/prime-controls/CLAUDE.md): realtime tool-panel controls.
- [`prime-editor`](packages/prime-editor/CLAUDE.md): CodeMirror 6 editor with a diff view.
- [`prime-charts`](packages/prime-charts/CLAUDE.md): charts built on LayerCake, starting with a time-series line chart.
- [`prime-map`](packages/prime-map/CLAUDE.md): MapLibre maps, with markers, map controls, and an optional Three.js bridge.
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
pnpm exec houserules update   # rebuild the kit files by hand (pnpm install runs it via prepare)
```

`build`, `check`, `lint`, `format`, and `test` run through wireit, cached in `.wireit/` and in CI. `pnpm --filter <pkg> run <script>` runs one package plus its declared deps. `WIREIT_CACHE=none` forces a real re-run. Shared dependency versions live in the `catalog:` block of `pnpm-workspace.yaml`.

The houserules payload under `.claude/` (skills, agents, rules, scripts) is build output, listed in `.claude/.gitignore` and rebuilt on `pnpm install`. To change one of those files, run `pnpm exec houserules eject <path>` first, then edit and commit it. The files named under `ejected` in `.claude/houserules.config.json` are ours. If a hook reports a missing script, run `pnpm exec houserules update`.

Design tokens are the `@theme` blocks in `packages/tailwind-config`, read by `design.mjs`. See `.claude/rules/viam-context.md`.

<!-- houserules:claude-md start -->

@.claude/houserules.md

<!-- houserules:claude-md end -->
