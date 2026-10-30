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

## Z layers

Named layers order floating UI by who must clear whom. Wear a layer instead of a bare number.

| Class       | Token         | Value | What sits on it                                                          |
| ----------- | ------------- | ----- | ------------------------------------------------------------------------ |
| `z-sticky`  | `--z-sticky`  | 100   | Headers and docked bars.                                                 |
| `z-overlay` | `--z-overlay` | 1000  | A dialog's backdrop.                                                     |
| `z-dialog`  | `--z-dialog`  | 1100  | The dialog panel.                                                        |
| `z-popover` | `--z-popover` | 1200  | Popovers, select panels, and comboboxes.                                 |
| `z-menu`    | `--z-menu`    | 1200  | Menus. Same value as `z-popover`, so a consumer never has to know which. |
| `z-toast`   | `--z-toast`   | 1300  | Notifications.                                                           |
| `z-tooltip` | `--z-tooltip` | 1400  | Above everything that can carry a hovered control.                       |
| `z-max`     | `--z-max`     | 9999  | Reserved. Nothing may cover it.                                          |

Bare numbers such as `z-50` and `z-1150` still work through Tailwind's own utility. Steps of 100 leave room for a bare value between layers.

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

## Component classes

The config also ships the design system's components as `@utility` classes, so a native element, a bits-ui trigger, or a non-Svelte consumer can wear it. A bare class is the design-system default. A modifier class beside it recolors or changes the fill. A utility written after the class wins, so `class="button px-4"` keeps the wider padding.

| Class           | Modifiers                                                                                                                        | Reads                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `button`        | color: `button-dark`, `button-danger`, `button-warning`, `button-success`, `button-info`. Fill: `button-outline`, `button-ghost` | `:disabled`, `aria-disabled="true"`, `aria-busy="true"`                                                          |
| `icon-button`   | the same `button-*` color and fill modifiers                                                                                     | the same, and it needs `aria-label` or `aria-labelledby`                                                         |
| `badge`         | `badge-success`, `badge-warning`, `badge-danger`, `badge-neutral`                                                                | none                                                                                                             |
| `pill`          | `pill-outline`                                                                                                                   | `aria-readonly="true"`, `aria-disabled="true"`                                                                   |
| `kbd`           | none                                                                                                                             | none                                                                                                             |
| `avatar`        | none                                                                                                                             | none, and it needs `role="img"` and `aria-label`                                                                 |
| `progress-dots` | none                                                                                                                             | none, and it needs `role="status"` with a visually hidden label                                                  |
| `input`         | none                                                                                                                             | `aria-invalid="true"`, `data-field-state="warn"`, `readonly`, `:disabled`, each also on a direct child `<input>` |
| `focus-ring`    | `focus-ring-within` for a frame whose focus lives on a child                                                                     | `:focus-visible`                                                                                                 |

Every state is a nested selector on an attribute the element already carries, with no `!important`, so a consumer class can still override anything. On a native single `<select>`, `input` replaces the browser's arrow with a chevron in the subtle text color and pads the right edge for it. Recipes for each class, including leading icons and the busy spinner, are on the docs site under the package's "Component classes" page.
