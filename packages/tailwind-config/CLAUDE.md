# @viamrobotics/tailwind-config

Viam's shared Tailwind CSS v4 configuration. A pure-data package: design tokens declared in a `@theme {}` block in `tailwind-config.css`, plus a tiny `fonts.js` that side-effect imports `@fontsource-variable/*` packages.

## Surface

- `tailwind-config.css` — the `@theme {}` block (colors, spacing, fonts, shadows, z layers) plus `@utility` definitions, including `text-display` and `text-code` (the two design-system type tokens stock Tailwind classes cannot express; the README has the full type-name to class table). Consumers `@import` this from their app CSS. Light theme.
  It also ships the design system's component classes as `@utility` classes: `button` and its variant modifiers, `icon-button`, `badge`, `pill`, `kbd`, `avatar`, `progress-dots`, `input`, `focus-ring`, and `focus-ring-within`. A bare class is the design-system default, a modifier beside it recolors, and states are nested selectors on attributes the element carries (`:disabled`, `aria-busy`, `aria-invalid`, `data-field-state`, `readonly`), never `!important`. The README has the class and attribute table, `tests/theme.test.ts` asserts each class compiles and that a later single-property utility wins, and the docs site renders every state on its component classes page.
- `tailwind-config-dark.css` — **optional, opt-in** dark theme. Reassigns the `--color-*` (and `--shadow-sm`) tokens under a dark scope so utilities adapt with no markup changes. Import it _after_ the base config. Activation follows `prefers-color-scheme: dark` by default; a `.light` ancestor forces light and a `.dark` ancestor forces dark (the class wins), on any element, so a `.light` subtree inside `.dark` renders light. The same file ships `@custom-variant dark`, so `dark:` utilities follow the same rules as the tokens (a `.dark` re-nested inside a `.light` subtree flips tokens but not `dark:` utilities). The light defaults are restated as `--light-*` beside `--dark-*`, and `tests/theme.test.ts` asserts the two sets and the `@theme` defaults agree, so edit all three when adding an adaptive token. Values are **derived** from the light tokens, not published by the design system (which has no dark palette) — the grayscale ramp and `white`/`black` are inverted, so `--color-white` is not literally white in dark mode. `bg-extralight` reads `gray-0`, the one gray step prime added below `gray-1`.
- `fonts.js` — three `import '@fontsource-variable/*'` lines. Consumers import for side effects to load Space Grotesk, Roboto Mono, and Public Sans.
- Public exports declared in `package.json`:
  - `.` → `./tailwind-config.css`
  - `./dark` → `./tailwind-config-dark.css`
  - `./fonts` → `./fonts.js`

## Peer dependency

`tailwindcss` `>=4 <5`. Consumers must have a Tailwind v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`).

## Docs

The token and class demos live on this package's pages in [apps/docs](../../apps/docs/): the overview and the component classes page. The package has no Svelte tooling and no `build` script, because the published CSS and `fonts.js` are committed static files. Its `check` is `tsc --noEmit`, its ESLint config has no Svelte plugin, and its `tsconfig.json` is standalone. The `check`, `lint`, and `test` scripts are orchestrated (and cached) by [wireit](https://github.com/google/wireit).

## Conventions

The **published** package is intentionally lean: pure CSS + `fonts.js`, no build step for the shipped files, no compiled TypeScript. Keep it that way. The only tooling is the vitest spec in `tests/`, which compiles the stylesheets through `@tailwindcss/node` and asserts the emitted CSS, run with `pnpm --filter @viamrobotics/tailwind-config test`. It stays dev-only. New design tokens go inside the existing `@theme {}` block in `tailwind-config.css`.

Token values must match the Viam design system at https://design.viam.com/. Don't invent values; copy from the published guides.

A floating component wears a named z layer (`z-dialog`, `z-popover`, `z-tooltip`), never a bare number, and `z-max` is reserved for what nothing may cover.

## History

Migrated from [viamrobotics/js-config](https://github.com/viamrobotics/js-config/tree/main/packages/tailwind-config) in v1.0.2. Versioning continues from there; consumers see no name change.
