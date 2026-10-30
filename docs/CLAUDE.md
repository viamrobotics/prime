# @viamrobotics/prime-docs

The documentation site for the prime monorepo. Astro + Starlight. Every library package is demonstrated on its own page, with live Svelte islands that sit beside the page.

## Stack

| Layer  | Tool                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| Site   | Astro + [@astrojs/starlight](https://starlight.astro.build/)                                |
| Theme  | [`starlight-theme-nova`](https://starlight-theme-nova.vercel.app/) (Viam's Starlight theme) |
| Styles | Tailwind CSS v4 + `@viamrobotics/tailwind-config`                                           |
| Deploy | GitHub Pages via `peaceiris/actions-gh-pages`                                               |

## Layout

- `src/content/docs/`: markdown pages, picked up by Starlight's `docsLoader`. Each package has a page at `packages/<package>.mdx`, and its islands sit in `packages/<package>/`. prime-ui is the exception: one page per component under `packages/prime-ui/components/<slug>.mdx`, nested under the package so everything about prime-ui sits together. The Components sidebar group autogenerates from that directory, and `sidebar.order` in frontmatter pins the page order.
- `src/loaders/components.ts`: a content-layer loader. `packageComponents({ name, lib, links })` turns a package's `src/lib` into a collection with one entry per root export in `index.ts` plus one per compound part (from the `Object.assign` barrels). Each entry has its `@component` block rendered as markdown and its `Props` interface parsed into a props table (`parse-component.ts`, the pure part, has unit tests). Links to sibling `.svelte` files inside a doc block become docs links, either page links or in-page anchors, as `links` says. It reads source, not `dist`, because `svelte-package` strips the TypeScript the props come from.
- `src/content.config.ts`: registers the `docs` collection plus one component collection per Svelte package: `prime-ui`, `prime-panes`, and `prime-tree`.
- `src/components/doc/`: `ComponentIntro.astro` (the rendered doc block), `PropsTable.astro`, and `PartsDoc.astro` (every part with its own doc and table). Each takes `name`, the entry id (`select`, or `select/trigger` for a part), and `collection`, which defaults to `prime-ui`. `Example.astro` wraps a live island with its own source underneath: pass the island in the slot and its file text as `code` via a `?raw` import, so the code a reader copies is the file rendering above it. It also takes `height` for islands that need a fixed frame. Pages import them through the `@docs/*` tsconfig alias (`@docs/doc/PropsTable.astro`).
- `src/components/Sandbox.svelte`: the shared live prop-tweaking shell, imported by demos as `@docs/Sandbox.svelte`.
- Each page's islands sit beside it. For prime-ui, `packages/prime-ui/components/<slug>/<X>Demo.svelte` configures the Sandbox for that component, and `<X>Showcase.svelte` renders its states. Each is a `.svelte` file hydrated as an Astro island (`client:visible`), since a component cannot be passed as an island prop from MDX. Starlight's loader only picks up `.md`/`.mdx`, so the Svelte files living inside `content/docs` are invisible to it.
- `src/components/Head.astro`: overrides Starlight's head to run `src/theme-bridge.ts`. The bridge mirrors Starlight's `data-theme` into the `dark` and `light` classes that the token package's dark variant reads. A browser spec under `src/components/__tests__/` covers it.
- `src/components/theme.svelte.ts`: exposes the site theme to islands whose library has its own theme switch. The tweakpane-config islands use it to pick between `primeTheme` and `primeThemeDark`.
- `source-aliases.mjs`: one alias list that resolves every workspace library to its source. `astro.config.mjs` applies it under `serve` only, and `vitest.config.ts` applies it always.
- `src/tailwind.css`: pulls in Tailwind, the tokens, the dark variant, and each package's `styles.css`. It is referenced from `customCss` in `astro.config.mjs`. It has an `@source` per Svelte package pointing at that package's `src/lib`, so island markup gets its utility classes.

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
pnpm --filter @viamrobotics/prime-docs dev       # astro dev; every package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-docs build     # package builds of prime-ui, prime-panes, prime-tree, and tweakpane-config, then astro build
pnpm --filter @viamrobotics/prime-docs check     # svelte-check over src against each library's built types
pnpm --filter @viamrobotics/prime-docs preview   # astro preview against dist/
```

`check` runs `astro sync`, which generates the `astro:content` types under `.astro/`, then svelte-check over `src` with each library resolved through its `dist` types, which its wireit dependencies build first. `tsconfig.json` excludes `astro.config.mjs`, since that file imports Starlight's TypeScript sources, which do not typecheck under Astro 6.

`astro dev` is the dev loop for every package. The aliases in `source-aliases.mjs` point each workspace library at its source, and `astro.config.mjs` applies them only under `serve`. `astro build` keeps each package's `svelte` export (`dist`), so the deployed site renders the published artifact. The docs `build` wireit script depends on the `package` build of each library that has one, and `vitest.config.ts` applies the aliases so the docs specs run without a package build.

## Content conventions

- **Use `.mdx`, not `.md`** for content pages. MDX lets you import Starlight components (`<CardGrid>`, `<LinkButton>`, `<Aside>`, `<Steps>`, etc.) for richer layout, and it cleanly handles `import.meta.env.BASE_URL` when you need it for static-asset links.
- **Always use relative paths** for internal links: `./packages/prime-ui/` from the index, `../tailwind-config/` between sibling package pages, `../prime-ui/components/button/` from a package page into a component page. Absolute paths starting with `/` are NOT base-prefixed automatically by Starlight or Astro — they ship to the browser as same-origin links and break under the `/prime/` deploy base.
- For Starlight hero `actions` frontmatter, the same rule applies: use `./` or `../` paths. The hero template renders the `link` field as a raw `<a href>` with no base awareness.

## How URLs work

`DOCS_BASE` and `DOCS_SITE` drive only Starlight's config in `astro.config.mjs`:

- `base` reads `DOCS_BASE`, defaulting to `/prime/`. The PR-preview workflow sets it to `/prime/pr-preview/pr-<N>/`.
- `site` reads `DOCS_SITE`.

No package reads either variable.

## Adding a package page

1. Add the page at `src/content/docs/packages/<package>.mdx` and put its islands in `src/content/docs/packages/<package>/`. A package with many components, as prime-ui has, gets a folder with an `index.mdx` and one page per component instead.
2. If the package exports Svelte components, add a collection for it in `src/content.config.ts` with `components("<package>", "anchors")`, or `"pages"` when each component gets its own page. Pass the collection name to the `doc/` components with `collection="<package>"`.
3. Add the package's aliases to `source-aliases.mjs`: one entry for `/styles.css` if it has one, and one anchored entry for the bare specifier that points at `src/lib/index.ts`. Add the same entries for any other subpath export.
4. In `src/tailwind.css`, import the package's `styles.css` and add an `@source` for its `src/lib`.
5. Add the package's `package` script to the `dependencies` of the docs `build` script in [package.json](package.json), and its `dist` and `src/lib` globs to that script's `files`. A package with no build, such as tailwind-config, needs neither.
6. Add a sidebar entry under Packages in `astro.config.mjs`.
