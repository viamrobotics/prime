# @viamrobotics/tailwind-config

Viam's shared Tailwind CSS v4 configuration. A pure-data package: design tokens declared in a `@theme {}` block in `tailwind-config.css`, plus a tiny `fonts.js` that side-effect imports `@fontsource-variable/*` packages.

## Surface

- `tailwind-config.css` — the `@theme {}` block (colors, spacing, fonts, shadows, z-index). Consumers `@import` this from their app CSS.
- `fonts.js` — three `import '@fontsource-variable/*'` lines. Consumers import for side effects to load Space Grotesk, Roboto Mono, and Public Sans.
- Public exports declared in `package.json`:
  - `.` → `./tailwind-config.css`
  - `./fonts` → `./fonts.js`

## Peer dependency

`tailwindcss` `>=4 <5`. Consumers must have a Tailwind v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`).

## Conventions

This package is intentionally lean: no build step, no tests, no TypeScript. Don't add them. New design tokens go inside the existing `@theme {}` block in `tailwind-config.css`.

Token values must match the Viam design system at https://design.viam.com/. Don't invent values; copy from the published guides.

## History

Migrated from [viamrobotics/js-config](https://github.com/viamrobotics/js-config/tree/main/packages/tailwind-config) in v1.0.2. Versioning continues from there; consumers see no name change.
