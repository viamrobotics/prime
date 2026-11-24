# @viamrobotics/tailwind-config

Viam's shared Tailwind CSS v4 configuration. A pure-data package: design tokens declared in a `@theme {}` block in `tailwind-config.css`, plus a tiny `fonts.js` that side-effect imports `@fontsource-variable/*` packages and a one-function `theme-color.js` that reads a color token in script.

## Surface

- `tailwind-config.css`: the `@theme {}` block (colors including the ten adaptive `--color-chart-*` tokens and the adaptive `--color-scrim` overlay behind a modal, spacing, fonts, shadows, z layers) plus `@utility` definitions, including `text-display` and `text-code` (the two design-system type tokens stock Tailwind classes cannot express). The README has the full type-name to class table. Consumers `@import` this from their app CSS. Light theme.
  It also ships the design system's component classes as `@utility` classes: `button` and its variant modifiers (including `button-compact` and `button-xs`), `button-group`, `icon-button`, `badge`, `pill`, `kbd`, `underline-tabs` with its `underline-tab`, `file-tabs` with its `file-tab` and `file-tab-slot`, `avatar`, `progress-dots`, `status-dot` and its modifiers, `progress`, `banner`, `input` (and `input-compact`), `readout` with its `readout-value` and `readout-suffix` parts, `popover-panel`, `listbox-option` and `listbox-heading`, `input-button`, `date-field` with its `date-segment`, `calendar-nav`, `calendar-weekday`, `calendar-day` and `calendar-day-range`, `focus-ring`, `focus-ring-within`, `focus-ring-inset`, `control-label`, and `toast-stack-item`. It also ships the scrollbar utilities `scrollbar-thin`, `scrollbar-*`, `scrollbar-w-*`, `scrollbar-track-*`, `scrollbar-thumb-*`, and `scrollbar-thumb-border-*`, the slider utilities `slider-track-*` (with `-w-*`, `-h-*`, and `-cursor-*` forms) and `slider-thumb-*` (with `-w-*`, `-h-*`, `-border-*`, and `-cursor-*` forms) plus `slider-thumb-border`, and the table utilities `table-container`, `table-header`, `table-header-cell`, `table-cell`, `table-cell-link`, and `table-cell-flex`. The `--transition-property-hover-colors` token mints `transition-hover-colors`, the color transition the buttons, `icon-button`, `input`, `input-button`, and `calendar-nav` wear. It leaves out `outline-color`, so a focus ring appears at once. A bare class is the design-system default, a modifier beside it recolors, and states are nested selectors on attributes the element carries (`:disabled`, `aria-busy`, `aria-invalid`, `data-field-state`, `readonly`), never `!important`. The README has the class and attribute table, `__tests__/theme.test.ts` asserts each class compiles and that a later single-property utility wins, and the docs site renders every state on its component classes page.
- `tailwind-config-dark.css`: **optional, opt-in** dark theme. Reassigns the `--color-*` tokens and the shadow colors `--shadow-color-sm`, `--shadow-color-popover`, and `--shadow-color-dialog` under a dark scope so utilities adapt with no markup changes. The four `--color-pixel-*` illustration colors keep their light values in dark mode, and `__tests__/theme.test.ts` pins that set. Import it _after_ the base config. Activation follows `prefers-color-scheme: dark` by default. A `.light` ancestor forces light and a `.dark` ancestor forces dark (the class wins), on any element, so a `.light` subtree inside `.dark` renders light. The same file ships `@custom-variant dark`, so `dark:` utilities follow the same rules as the tokens (a `.dark` re-nested inside a `.light` subtree flips tokens but not `dark:` utilities). The light defaults are restated as `--light-*` beside `--dark-*`, and `__tests__/theme.test.ts` asserts the two sets and the defaults in `tailwind-config.css` agree, so edit all three when adding an adaptive token. The shadow colors' defaults sit in a `:root, :host` rule in `@layer theme` rather than in `@theme`, because a `--shadow-color-*` inside `@theme` would mint a `shadow-color-*` utility. Values are **derived** from the light tokens, not published by the design system (which has no dark palette). The grayscale ramp and `white`/`black` are inverted, so `--color-white` is not literally white in dark mode. `bg-extralight` reads `gray-0`, the one gray step prime added below `gray-1`.
- `fonts.js`: three `import '@fontsource-variable/*'` lines. Consumers import for side effects to load Space Grotesk, Roboto Mono, and Public Sans.
- `theme-color.js`: `themeColor(name, element?)`, which reads a `--color-*` token's computed value for script that needs a concrete color (canvas, WebGL, a map marker). It takes the whole property name as a literal, because Tailwind emits a theme variable only when a scanned source names it in full. `theme-color.d.ts` is hand-written beside it and holds `ThemeColorName`, the union of every color token. `__tests__/theme-color.test.ts` fails when that union and the `--color-*` declarations in the `@theme` block differ, so add a new color token to both.
- Public exports declared in `package.json`:
  - `.` → `./tailwind-config.css`
  - `./dark` → `./tailwind-config-dark.css`
  - `./fonts` → `./fonts.js`
  - `./theme-color` → `./theme-color.js`, typed by `./theme-color.d.ts`

## Peer dependency

`tailwindcss` `>=4 <5`. Consumers must have a Tailwind v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`).

## Docs

The token and class demos live on this package's pages in [docs](../../docs/): the overview and the component classes page. The package has no Svelte tooling and no `build` script, because the published CSS and `fonts.js` are committed static files. Its `check` is `tsc --noEmit`, its ESLint config has no Svelte plugin, and its `tsconfig.json` is standalone. The `check`, `lint`, and `test` scripts are orchestrated (and cached) by [wireit](https://github.com/google/wireit).

## Conventions

The **published** package is intentionally lean: pure CSS, `fonts.js`, and the one-function `theme-color.js` with its hand-written types, no build step for the shipped files, no compiled TypeScript. Keep it that way. The only tooling is the vitest specs in `__tests__/`, of which `theme.test.ts` compiles the stylesheets through `@tailwindcss/node` and asserts the emitted CSS, run with `pnpm --filter @viamrobotics/tailwind-config test`. It stays dev-only. New design tokens go inside the existing `@theme {}` block in `tailwind-config.css`.

Token values must match the Viam design system at https://design.viam.com/. Don't invent values. Copy them from the published guides. The light `subtle-2` text color is a deliberate departure: it is `#6e7074`, darker than `gray-7`, so subtle text holds 4.5:1 on white and `gray-1`, the darkest surface it sits on, and `__tests__/theme.test.ts` pins it.

A floating component wears a named z layer (`z-dialog`, `z-popover`, `z-tooltip`), never a bare number, and `z-max` is reserved for what nothing may cover.

## Versioning

The package name and version line are the ones first published from [viamrobotics/js-config](https://github.com/viamrobotics/js-config/tree/main/packages/tailwind-config), so a consumer upgrades in place.
