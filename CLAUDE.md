# prime

Pretty Rad Interactive Modular Elements — Viam's Svelte 5 component-library monorepo. See [ROADMAP.md](ROADMAP.md) for the v2 migration plan; the workspace is currently being rebuilt and most packages haven't landed yet.

## Monorepo layout

Component packages live under `packages/<name>/`. Each package owns its own `package.json`, build config, tests, and `CLAUDE.md` describing its specific stack and commands. The workspace root holds shared tooling (lint, format, changesets, CI).

## Tech stack (workspace-level)

| Layer           | Technology       |
| --------------- | ---------------- |
| Package manager | pnpm workspaces  |
| Node            | 24               |
| Frontend        | Svelte 5 (runes) |
| Styling         | TailwindCSS      |
| Testing         | Vitest           |
| Versioning      | Changesets       |

Per-package testing/build tooling is documented in each package's `CLAUDE.md`.

## Design system

prime implements the Viam design system. The source of truth lives at **https://design.viam.com/guides/intro/**. Verify visual treatment, naming, and interaction patterns there before inventing new ones.

## Topic-specific rules

Detailed guidance lives in `.claude/rules/`. Path-scoped rules load when Claude reads matching files; rules without `paths` load every session.

| Rule                  | Loads when                                          |
| --------------------- | --------------------------------------------------- |
| `svelte.md`           | editing `.svelte`, `.svelte.ts`, `.svelte.js`       |
| `typescript.md`       | editing `.ts`                                       |
| `testing-frontend.md` | editing test files (`**/*.spec.ts`)                 |
| `pr-description.md`   | editing files under `.changeset/`                   |
| `changesets.md`       | editing files under `.changeset/` or `CHANGELOG.md` |
| `viam-context.md`     | every session (design system context)               |

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
