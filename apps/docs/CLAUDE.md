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

- `src/content/docs/` — markdown pages, picked up by Starlight's `docsLoader`. One page per prime-ui component under `packages/prime-ui/components/`, nested under the package so everything about prime-ui sits together. The Components sidebar group autogenerates from that directory; `sidebar.order` in frontmatter pins the page order.
- `src/loaders/prime-ui-components.ts` — a content-layer loader that turns prime-ui's `src/lib` into the `components` collection: one entry per root export in `index.ts` plus one per compound part (from the `Object.assign` barrels), each with its `@component` block rendered as markdown and its `Props` interface parsed into a props table (`parse-component.ts`, the pure part, has unit tests). Links to sibling `.svelte` files inside a doc block are rewritten to docs links. Reads source, not `dist`, because `svelte-package` strips the TypeScript the props come from.
- `src/components/doc/` — `ComponentIntro.astro` (the rendered doc block), `PropsTable.astro`, and `PartsDoc.astro` (every part with its own doc and table). Each takes `name`, the collection id: `select`, or `select/trigger` for a part. `Example.astro` wraps a live island with its own source underneath: pass the island in the slot and its file text as `code` via a `?raw` import, so the code a reader copies is the file rendering above it. Pages import them through the `@docs/*` tsconfig alias (`@docs/doc/PropsTable.astro`).
- `src/components/Sandbox.svelte` — the shared live prop-tweaking shell, imported by demos as `@docs/Sandbox.svelte`.
- Each component page's islands sit beside it: `packages/prime-ui/components/<slug>/<X>Demo.svelte` configures the Sandbox for that component, and `<X>Showcase.svelte` renders its states. Each is a `.svelte` file hydrated as an Astro island (`client:visible`), since a component cannot be passed as an island prop from MDX. Starlight's loader only picks up `.md`/`.mdx`, so the Svelte files living inside `content/docs` are invisible to it.
- `src/tailwind.css` — pulls in Tailwind + tokens; referenced from `customCss` in `astro.config.mjs`. Its `@source` points at prime-ui's `src/lib` so island markup gets its utility classes.
- `scripts/build-playgrounds.mjs` — builds each library package's playground with the right `BASE_PATH` and copies it under `public/playground/<name>/`.
- `public/playground/` — populated at build time; gitignored.

A component page follows one template, modeled on the bits-ui and Zag docs, in this order:

1. Frontmatter, `<ComponentIntro>`, the Sandbox demo island, then three or four bullets of what the component gives you.
2. `## Anatomy`, compounds only: a code block of the part tree with no props.
3. `## Usage`: one `### ` recipe per task (two-way binding, fully controlled, the custom snippet, in a field), each a sentence or two of prose and an `<Example>` whose island lives beside the page as `<slug>/<Recipe>.svelte` and imports only from `@viamrobotics/prime-ui`, so its source is pasteable. The last recipe is `### States`, the showcase island.
4. `## Styling`: where `class` lands, which snippets replace internal decoration, and a table of the data attributes bits-ui sets, verified against the bits-ui source, not from memory.
5. `## Keyboard`: a table of keys and actions, verified the same way. Native inputs say so in one line.
6. `## API`: `<PropsTable>`, then `<PartsDoc>` for compounds.

Prose that is not the component's own contract (how it relates to other components, the state model) stays in the MDX. Everything else comes from the source comments, so fix wording there, not here.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev               # astro dev; prime-ui resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-docs build:playgrounds # build + copy the token package playgrounds into public/playground/
pnpm --filter @viamrobotics/prime-docs build             # build:playgrounds + prime-ui package, then astro build
pnpm --filter @viamrobotics/prime-docs preview           # astro preview against dist/
```

`astro dev` is the prime-ui component dev loop. A Vite plugin in `astro.config.mjs` aliases `@viamrobotics/prime-ui` to `packages/prime-ui/src/lib/index.ts` only under `serve`. `astro build` keeps the package's `svelte` export (`dist`), so the deployed site renders the published artifact. The playgrounds are not served in dev.

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
