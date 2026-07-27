# @viamrobotics/tailwind-config

Viam's shared Tailwind CSS v4 configuration. A pure-data package: design tokens in a `@theme {}` block in `tailwind-config.css`, plus a tiny `fonts.js` that side-effect imports `@fontsource-variable/*` packages.

## Surface

- `tailwind-config.css` the `@theme {}` block (colors, spacing, fonts, shadows, z-index) plus `@utility` definitions. Consumers `@import` this from their app CSS. Light theme.
- `tailwind-config-dark.css` **optional, opt-in** dark theme. Reassigns the `--color-*` and `--shadow-sm` tokens under a dark scope so utilities adapt with no markup changes. Import it _after_ the base config. It activates on `prefers-color-scheme: dark` by default, and a `.light` or `.dark` ancestor overrides that, class wins. Values are **derived** from the light tokens, not published by the design system, which has no dark palette. The grayscale ramp and `white`/`black` are inverted, so `--color-white` is not literally white in dark mode. `bg-extralight` has no matching gray token and does not adapt.
- `fonts.js` three `import '@fontsource-variable/*'` lines. Consumers import it for side effects to load Space Grotesk, Roboto Mono, and Public Sans.
- Public exports in `package.json`: `.` maps to `./tailwind-config.css`, `./dark` to `./tailwind-config-dark.css`, `./fonts` to `./fonts.js`.

Peer dependency `tailwindcss` `>=4 <5`. Consumers need a Tailwind v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`).

## Playground

`src/routes/` is a SvelteKit theme-preview app that renders every token and utility with a light/dark toggle. It is **dev-only**: gitignored out of the published artifact (`files` ships only the CSS and `fonts.js`), with its SvelteKit, Vite, and ESLint tooling in `devDependencies`. Build it with `pnpm --filter @viamrobotics/tailwind-config build` (static output to `build/`). The docs site embeds it via [apps/docs/scripts/build-playgrounds.mjs](../../apps/docs/scripts/build-playgrounds.mjs). The playground imports the tokens by relative path (`../../tailwind-config.css`), not by package name.

`build`, `check`, and `lint` are orchestrated and cached by [wireit](https://github.com/google/wireit). `svelte.config.js` derives its base path from `DOCS_BASE` plus a `/playground/tailwind-config` segment, empty locally, matching the other packages. Note that `build` produces **only** the playground. The published CSS and `fonts.js` are committed static files with no build step.

## Conventions

The published package is intentionally lean: pure CSS plus `fonts.js`, no build step for shipped files, no tests, no compiled TypeScript. Keep it that way. The SvelteKit playground is the only tooling and it stays dev-only. New design tokens go inside the existing `@theme {}` block in `tailwind-config.css`.

Token values must match the Viam design system at https://design.viam.com/. Never invent values, copy them from the published guides.

## History

Migrated from [viamrobotics/js-config](https://github.com/viamrobotics/js-config/tree/main/packages/tailwind-config) in v1.0.2. Versioning continues from there and consumers see no name change.
