# @viamrobotics/prime-docs

The documentation site for the prime monorepo. Astro + Starlight, with one MDX page per component. Each component page mounts an interactive playground Svelte component (via `@astrojs/svelte`) that exposes the component's props as live knobs.

## Stack

| Layer  | Tool                                                                                        |
| ------ | ------------------------------------------------------------------------------------------- |
| Site   | Astro + [@astrojs/starlight](https://starlight.astro.build/)                                |
| Theme  | [`starlight-theme-nova`](https://starlight-theme-nova.vercel.app/) (Viam's Starlight theme) |
| Styles | Tailwind CSS v4 + `@viamrobotics/tailwind-config`                                           |
| Svelte | `@astrojs/svelte` for inline playgrounds rendered with `client:load`                        |
| Deploy | GitHub Pages via `peaceiris/actions-gh-pages`                                               |

## Layout

- `src/content/docs/` — markdown pages, picked up by Starlight's `docsLoader`.
- `src/components/` — Svelte components mounted from MDX pages: the generic `Playground.svelte` shell, the per-component `<X>Playground.svelte` configs, and `playground-controls.ts` with the typed knob schema.
- `src/tailwind.css` — pulls in Tailwind + tokens; referenced from `customCss` in `astro.config.mjs`. `@source` directives there scan both this app's components and `packages/prime-ui/src/lib/**/*.svelte` so utility classes inside imported library components make it into the build.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev      # astro dev with live playgrounds
pnpm --filter @viamrobotics/prime-docs build    # astro build
pnpm --filter @viamrobotics/prime-docs preview  # astro preview against dist/
```

For iterating on a library component in isolation, run that package's own dev server directly (`pnpm --filter @viamrobotics/prime-ui dev`) instead of rebuilding the docs each time.

## Content conventions

- **Use `.mdx`, not `.md`** for content pages. MDX lets you import Starlight components (`<CardGrid>`, `<LinkCard>`, `<Aside>`, `<Steps>`, etc.) for richer layout, and lets you mount per-component playgrounds with `<XPlayground client:load />`.
- **MDX formatting is handled by dprint**, not Prettier — see `dprint.json` at the repo root. Prettier's MDX list-item indent logic mangles Starlight `<Steps>` blocks; dprint handles them correctly. `.mdx` is in `.prettierignore` for that reason.
- **Always use relative paths** for internal links: `./packages/prime-ui/` from the index, `../tailwind-config/` between sibling package pages. Absolute paths starting with `/` are NOT base-prefixed automatically by Starlight or Astro — they ship to the browser as same-origin links and break under the `/prime/` deploy base.
- For Starlight hero `actions` frontmatter, the same rule applies: use `./` or `../` paths. The hero template renders the `link` field as a raw `<a href>` with no base awareness.

## Adding a component page

1. Build the component in `packages/prime-ui/src/lib/<Name>/` and export it from the package.
2. Create `apps/docs/src/components/<Name>Playground.svelte` — a small wrapper that defines the typed `controls` list and a `preview` snippet, passed to `<Playground>`. Optionally pass a `code` function to control the generated snippet (useful for compound components where the default `<Component prop="..." />` rendering isn't accurate).
3. Create `apps/docs/src/content/docs/components/<name>.mdx` — intro paragraph, import block, `## Playground` section that mounts `<XPlayground client:load />`, and a few prose sections with plain code fences for patterns the playground can't represent (compositions, error-message placement, etc.).
4. Add the page under the `Components` group in `astro.config.mjs` sidebar.

## How URLs work

`DOCS_BASE` — Starlight's `base`. Defaults to `/prime/`. The PR preview workflow sets it to `/prime/pr-preview/pr-<N>/`.
