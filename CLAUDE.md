# prime

Pretty Rad Interactive Modular Elements — Viam's Svelte 5 component-library monorepo. See [ROADMAP.md](ROADMAP.md) for the v2 migration plan; the workspace is currently being rebuilt and most packages haven't landed yet.

## Monorepo layout

Two top-level workspaces:

- `packages/<name>/` — published-to-npm libraries and configs. Each owns its `package.json`, build, tests, and `CLAUDE.md`.
- `apps/<name>/` — deployable apps that consume the packages. Always `private: true`. Currently just the docs site.

The workspace root holds shared tooling (lint, format, changesets, CI).

## Packages

| Package                                                               | Purpose                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@viamrobotics/prime-ui`](packages/prime-ui/CLAUDE.md)               | Svelte 5 component library — the v2 of prime.                       |
| [`@viamrobotics/tailwind-config`](packages/tailwind-config/CLAUDE.md) | Viam's shared Tailwind CSS v4 configuration: design tokens + fonts. |

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

**Task orchestration.** `build`/`check`/`lint`/`test` are run through [wireit](https://github.com/google/wireit): each package's script declares its inputs (`files`), outputs, and cross-package `dependencies`, so unchanged work is skipped or restored from cache — locally (`.wireit/`, gitignored) and in CI (GitHub Actions cache, set up by the `.github/actions/setup` composite). Run `pnpm <build|check|lint|test>` at the root (whole workspace, in dependency order) or `pnpm --filter <pkg> run <script>` for one package plus its declared deps. `WIREIT_CACHE=none` forces a real re-run. `format` stays a plain (non-wireit) recursive command since it mutates files.

**Shared dependency versions** live in the `catalog:` block of [pnpm-workspace.yaml](pnpm-workspace.yaml); packages reference them with `"<dep>": "catalog:"`. Bump a shared toolchain version there, not per-package.

## Design system

prime implements the Viam design system. The source of truth lives at **https://design.viam.com/guides/intro/**. Verify visual treatment, naming, and interaction patterns there before inventing new ones.

## Topic-specific rules

Detailed guidance lives in `.claude/rules/`. Path-scoped rules load when Claude reads matching files; rules without `paths` load every session.

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

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
