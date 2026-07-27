# prime

Pretty Rad Interactive Modular Elements, Viam's monorepo of frontend libraries: design tokens, Svelte components, and the shared configuration around them. The workspace is mid-rebuild and most packages have not landed yet.

## Layout

`packages/<name>/` publishes to npm. Each owns its `package.json`, build, tests, and `CLAUDE.md`:

- [`@viamrobotics/prime-ui`](packages/prime-ui/CLAUDE.md) Svelte 5 component library, the v2 of prime.
- [`@viamrobotics/tailwind-config`](packages/tailwind-config/CLAUDE.md) shared Tailwind CSS v4 config: design tokens and fonts.
- [`@viamrobotics/tweakpane-config`](packages/tweakpane-config/CLAUDE.md) Viam theme for `svelte-tweakpane-ui`.
- [`@viamrobotics/claude-config`](packages/claude-config/CLAUDE.md) CLI that installs shared Claude agent tooling into repos.

`apps/<name>/` holds deployable apps, always `private: true`:

- [`prime-docs`](apps/docs/CLAUDE.md) Astro Starlight docs site plus a playground per library package. Deployed to GitHub Pages.

The workspace root holds shared tooling: lint, format, changesets, CI.

## Tech stack

pnpm workspaces, Node 24 (`.nvmrc`), Svelte 5 runes, TailwindCSS, Vitest, [wireit](https://github.com/google/wireit), Changesets. Per-package build and test tooling lives in each package's `CLAUDE.md`.

**Task orchestration.** `build`, `check`, `lint`, and `test` run through wireit. Each package's script declares its inputs (`files`), outputs, and cross-package `dependencies`, so unchanged work is skipped or restored from cache: locally in `.wireit/` (gitignored) and in CI through the GitHub Actions cache that the `.github/actions/setup` composite sets up. Run `pnpm <build|check|lint|test>` at the root for the whole workspace in dependency order, or `pnpm --filter <pkg> run <script>` for one package plus its declared deps. `WIREIT_CACHE=none` forces a real re-run. `format` stays a plain recursive command because it mutates files.

**Shared dependency versions** live in the `catalog:` block of [pnpm-workspace.yaml](pnpm-workspace.yaml). Packages reference them with `"<dep>": "catalog:"`. Bump a shared toolchain version there, not per-package.

## Playground convention

Each library package's SvelteKit `src/routes/` _is_ its playground. The docs site builds each one as a static bundle, mounts it under `/playground/<package-name>/`, and links it from the Starlight sidebar. The docs `build:playgrounds` script declares every playground build as a wireit dependency so they build first, with the shared `DOCS_BASE` env var driving each base path, then copies the output into place. See [apps/docs/scripts/build-playgrounds.mjs](apps/docs/scripts/build-playgrounds.mjs).

To add one: give the package a static SvelteKit app under `src/routes/`, then wire it into that script and into the `build:playgrounds` dependencies in [apps/docs/package.json](apps/docs/package.json).

## Design system

prime implements the Viam design system. Source of truth: **https://design.viam.com/guides/intro/**. Verify visual treatment, naming, and interaction patterns there before inventing new ones.

## Topic-specific rules

Detailed guidance lives in `.claude/rules/`. Path-scoped rules load when Claude reads a matching file. Rules without `paths` load every session.

<!-- claude-config:rules-table start -->

| Rule                    | Loads when                                          |
| ----------------------- | --------------------------------------------------- |
| `svelte.md`             | editing `.svelte`, `.svelte.ts`, `.svelte.js`       |
| `typescript.md`         | editing `.ts`                                       |
| `testing-frontend.md`   | editing test files (`**/*.spec.ts`)                 |
| `pr-description.md`     | editing files under `.changeset/`                   |
| `changesets.md`         | editing files under `.changeset/` or `CHANGELOG.md` |
| `code-comments.md`      | editing any code file                               |
| `editing-discipline.md` | every session (edit from current state, in scope)   |
| `verification.md`       | every session (verify before reporting done)        |
| `design-system.md`      | every session (design system context)               |

<!-- claude-config:rules-table end -->
