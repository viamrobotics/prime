# Viam's Tailwind Config

This module contains [Viam][]'s shared [Tailwind CSS][] v4 configuration.

[viam]: https://www.viam.com/
[tailwind css]: https://tailwindcss.com/

## Installation

```shell
pnpm add --save-dev tailwindcss @viamrobotics/tailwind-config
```

This package requires a Tailwind CSS v4 bundler integration (`@tailwindcss/vite` or `@tailwindcss/postcss`). See the [Tailwind installation guides](https://tailwindcss.com/docs/installation) for setup instructions.

## Usage

Add this package in your main CSS file:

```css
/* app.css */
@import "@viamrobotics/tailwind-config";
```

## Fonts

The config references the following font families.

- **Space Grotesk** — `font-space-grotesk`
- **Roboto Mono** — `font-roboto-mono`
- **Public Sans** — `font-public-sans`

Add them to your project with the following Typescript import:

```js
import "@viamrobotics/tailwind-config/fonts";
```

## Typography

Tailwind v4's default sizes and line heights already match the design system's type tokens, so most names map to stock classes.

| Design-system name        | Tailwind classes        |
| ------------------------- | ----------------------- |
| `--text-text-xs`          | `text-xs`               |
| `--text-text-xs-semibold` | `text-xs font-semibold` |
| `--text-text-sm`          | `text-sm`               |
| `--text-text-sm-semibold` | `text-sm font-semibold` |
| `--text-text-base`        | `text-base`             |
| `--text-text-lg-semibold` | `text-lg font-semibold` |
| `--text-display`          | `text-display`          |
| `--text-code`             | `text-code`             |

- `text-display` is Space Grotesk, weight 500, 24px with a 26px line height. It is the only token stock classes cannot express.
- `text-code` is Roboto Mono at the `text-xs` size and line height, the same as `font-roboto-mono text-xs`.

## Dark mode

Dark mode is opt-in. Import it after the base config.

```css
@import "@viamrobotics/tailwind-config";
@import "@viamrobotics/tailwind-config/dark";
```

- By default the theme follows `prefers-color-scheme`.
- A `.dark` class on any element forces dark for that subtree. A `.light` class on any element forces light for that subtree, including a `.light` subtree inside `.dark`. The class wins over the OS preference.
- `dark:` utilities follow the same rules as the tokens. They apply under a `.dark` ancestor, or under the OS preference, and never inside a `.light` subtree.
- One level of `.light` inside `.dark` is supported. A `.dark` nested inside that `.light` flips the tokens but not `dark:` utilities.
- The dark palette is derived from the light tokens and the grayscale ramp is inverted, so `bg-white` is not literally white in dark mode. `bg-extralight` now adapts too, because it reads `gray-0`.
