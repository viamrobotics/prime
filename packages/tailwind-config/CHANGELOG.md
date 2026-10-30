# @viamrobotics/tailwind-config

## 1.5.0
### Minor Changes

- 17def35: Adds semantic z layer classes: z-sticky, z-overlay, z-dialog, z-popover, z-menu, z-toast, z-tooltip, and z-max. z-max is now 9999.
- 3e54765: Every brand color is a family with the light, medium-light, medium, bright, and dark variants in both themes, replacing the single values and the three partial extension sets.
- ad3347a: Buttons compose a color with a fill: button-warning and button-info join the colors, button-outline and button-ghost are the fills, button-dark replaces button-primary, and the icon button takes the same modifiers, replacing button-outline-danger, icon-button-secondary, and icon-button-danger. The bare class is the default and the only neutral outline.
- 61d65b8: Adds CodeSnippet, highlighted by prism through the code color tokens, which gain comment, function, keyword, and type, and the DockLeft and DockRight glyphs.

### Patch Changes

- 6cc7253: The input class on a native single select replaces the browser's arrow with a chevron in the subtle text color and pads the right edge for it, so the caret no longer sits against the border.
- 6cc7253: Drop SvelteKit and adapter-static from the package tooling and remove the playground apps. Each package's demo now lives on its docs page. No runtime change: the published files are the same.
- 3e54765: Adds the warning-text token for readable amber text on light surfaces, used by the warning badge, hint, field state icon, and button fills, moves the input warn border to warning-dark, and darkens the icon button glyph to gray-7.
- 6cc7253: The focus-ring and focus-ring-within outlines use the link blue instead of the power-button green, which was never the intended focus color.

## 1.4.0

### Minor Changes

- ac91dd1: Add class-driven dark mode with light subtrees, adaptive bg-extralight, and text-display and text-code utilities.
- ac91dd1: Add the design system's chrome as utility classes: button and its variant modifiers, icon-button, badge, pill, kbd, avatar, progress-dots, input, focus-ring, and focus-ring-within, with a playground page and docs recipes.

## 1.3.0

### Minor Changes

- 9e0d60e: Add `pending` semantic color and a `medium-light` tier for every semantic color

## 1.2.0

### Minor Changes

- a547b07: Add `danger`/`success`/`info` `bright` color tokens (with derived dark variants), a `popup-enter` animation token, a `button` pointer-cursor base style, and arbitrary-value support to the slider/scrollbar sizing utilities. Also updates `warning-bright` from `#ddab3f` to `#efa300`.

## 1.1.0

### Minor Changes

- d95d7d9: Add an opt-in dark theme via the new `@viamrobotics/tailwind-config/dark` export

## 1.0.2

### Patch Changes

- 661fd52: Migrate package source from viamrobotics/js-config to viamrobotics/prime. Also removes stray whitespace inside `--value(--namespace-*)` calls, and declares `@fontsource-variable/{space-grotesk,roboto-mono,public-sans}` as direct dependencies (the `./fonts` entry point imports them but they were previously undeclared).
