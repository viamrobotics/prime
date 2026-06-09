# @viamrobotics/tailwind-config

Viam's shared Tailwind CSS v4 configuration. A pure-data package: design tokens declared in a `@theme {}` block in `tailwind-config.css`, plus a tiny `fonts.js` that side-effect imports `@fontsource-variable/*` packages.

## Surface

- `tailwind-config.css` — the `@theme {}` block (colors, spacing, fonts, shadows, z-index) plus `@utility` definitions. Consumers `@import` this from their app CSS. Light theme.
- `tailwind-config-dark.css` — **optional, opt-in** dark theme. Reassigns the `--color-*` (and `--shadow-sm`) tokens under a dark scope so utilities adapt with no markup changes. Import it _after_ the base config. Activation follows `prefers-color-scheme: dark` by default; a `.light` ancestor forces light and a `.dark` ancestor forces dark (the class wins). Values are **derived** from the light tokens, not published by the design system (which has no dark palette) — the grayscale ramp and `white`/`black` are inverted, so `--color-white` is not literally white in dark mode. `bg-extralight` has no matching gray token and does not adapt.
- `fonts.js` — three `import '@fontsource-variable/*'` lines. Consumers import for side effects to load Space Grotesk, Roboto Mono, and Public Sans.
- Public exports declared in `package.json`:
  - `.` → `./tailwind-config.css`
  - `./dark` → `./tailwind-config-dark.css`
  - `./fonts` → `./fonts.js`

## Peer dependency

`tailwindcss` `>=4 <5`. Consumers must have a Tailwind v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`).

## Playground

`src/routes/` is a SvelteKit theme-preview app (the package's playground) that renders every token and utility with a light/dark toggle. It is **dev-only**: it is gitignored out of the published artifact (`files` ships only the CSS and `fonts.js`), and its SvelteKit/Vite/ESLint tooling lives in `devDependencies`. Build it with `pnpm --filter @viamrobotics/tailwind-config build` (static output to `build/`); the docs site embeds it via [apps/docs/scripts/build-playgrounds.mjs](../../apps/docs/scripts/build-playgrounds.mjs). The playground imports the tokens by relative path (`../../tailwind-config.css`), not the package name.

## Conventions

The **published** package is intentionally lean: pure CSS + `fonts.js`, no build step for the shipped files, no tests, no compiled TypeScript. Keep it that way — the SvelteKit playground above is the only tooling, and it stays dev-only. New design tokens go inside the existing `@theme {}` block in `tailwind-config.css`.

Token values must match the Viam design system at https://design.viam.com/. Don't invent values; copy from the published guides.

## History

Migrated from [viamrobotics/js-config](https://github.com/viamrobotics/js-config/tree/main/packages/tailwind-config) in v1.0.2. Versioning continues from there; consumers see no name change.
