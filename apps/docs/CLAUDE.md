# @viamrobotics/prime-docs

The documentation site for the prime monorepo. Astro + Starlight, with playgrounds from each library package embedded as static bundles under `/playground/<name>/`.

## Stack

| Layer  | Tool                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| Site   | Astro + [@astrojs/starlight](https://starlight.astro.build/)                                |
| Theme  | [`starlight-theme-nova`](https://starlight-theme-nova.vercel.app/) (Viam's Starlight theme) |
| Styles | Tailwind CSS v4 + `@viamrobotics/tailwind-config`                                           |
| Deploy | GitHub Pages via `peaceiris/actions-gh-pages`                                               |

## Layout

- `src/content/docs/` — markdown pages, picked up by Starlight's `docsLoader`.
- `src/tailwind.css` — pulls in Tailwind + tokens; referenced from `customCss` in `astro.config.mjs`.
- `scripts/build-playgrounds.mjs` — builds each library package's playground with the right `BASE_PATH` and copies it under `public/playground/<name>/`.
- `public/playground/` — populated at build time; gitignored.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev               # astro dev (no playgrounds; use the package's own dev for component work)
pnpm --filter @viamrobotics/prime-docs build:playgrounds # build + copy every package playground into public/playground/
pnpm --filter @viamrobotics/prime-docs build             # build:playgrounds then astro build
pnpm --filter @viamrobotics/prime-docs preview           # astro preview against dist/
```

For active component development on a library package, run that package's own dev server directly (`pnpm --filter @viamrobotics/prime-ui dev`) instead of rebuilding the docs site each time.

## Content conventions

- **Use `.mdx`, not `.md`** for content pages. MDX lets you import Starlight components (`<CardGrid>`, `<LinkButton>`, `<Aside>`, `<Steps>`, etc.) for richer layout, and it cleanly handles `import.meta.env.BASE_URL` when you need it for static-asset links.
- **Always use relative paths** for internal links: `./packages/prime-ui/` from the index, `../tailwind-config/` between sibling package pages, `../../playground/prime-ui/` to reach playground bundles. Absolute paths starting with `/` are NOT base-prefixed automatically by Starlight or Astro — they ship to the browser as same-origin links and break under the `/prime/` deploy base.
- For Starlight hero `actions` frontmatter, the same rule applies: use `./` or `../` paths. The hero template renders the `link` field as a raw `<a href>` with no base awareness.

## How URLs work

A single `DOCS_BASE` env var drives all deploy paths:

- Starlight's `base` (in `astro.config.mjs`) reads `DOCS_BASE`, defaulting to `/prime/`. The PR-preview workflow sets it to `/prime/pr-preview/pr-<N>/`.
- Each library's `svelte.config.js` also reads `DOCS_BASE` and appends its own `/playground/<name>` segment for `paths.base` — so one value configures the whole build. Unset (local dev / npm) means base `/`. A raw `BASE_PATH` still works as a per-package fallback override.
- `DOCS_SITE` sets Starlight's `site`.

The playground library builds run first as wireit dependencies of `build:playgrounds` (which then only copies their `build/` output into `public/playground/<name>/`), so `DOCS_BASE` propagates to them automatically.

## Adding a playground for a new package

1. Make sure the package builds a static SvelteKit app (`@sveltejs/adapter-static`) whose `svelte.config.js` derives `paths.base` from `DOCS_BASE` + a `/playground/<name>` segment (copy the pattern from an existing package).
2. Add the package's playground build script (e.g. `../../packages/<name>:vite-build`) to the `build:playgrounds` wireit `dependencies` in [package.json](package.json), and add the package to the `playgrounds` array in `scripts/build-playgrounds.mjs`.
3. Add a sidebar entry under `Playgrounds` in `astro.config.mjs`.
