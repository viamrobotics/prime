# @viamrobotics/tailwind-config

## 1.10.0
### Minor Changes

- 09e47ee: Add `themeColor` at `@viamrobotics/tailwind-config/theme-color`, which reads a color token for script.
- 09e47ee: Add component classes for floating list panels, date fields, and calendar grids.

### Patch Changes

- 09e47ee: The focus ring no longer fades in on buttons, inputs, and icon buttons, and a banner nested in a warning banner keeps its own glyph color.

## 1.9.0
### Minor Changes

- 0516abd: Fill the solid `button-warning` with the brighter warning tone, under dark text.
- 0516abd: Add a compact, file-style look to `Tabs` with `variant="file"`, styled by the new `file-tabs` and `file-tab` classes.
- 0516abd: Add `button-group` to join a row of buttons, and raise the contrast of a `kbd` inside a filled button and of the warning banner glyph.
- 0516abd: Soften the elevation shadows: `shadow-dialog` takes the former popover shadow, and `shadow-popover` becomes subtler.

### Patch Changes

- 0516abd: Fix `scrollbar-*`, which emitted an invalid `scrollbar-color`: it now sets the thumb color over a clear track.

## 1.8.1
### Patch Changes

- 0d4a44c: Define `scrollbar-thumb-border-*` and `slider-thumb-border-*` once each, so every form compiles on Tailwind 4.1, which kept only the first definition of a name. Both now take a bare number for the border width, such as `scrollbar-thumb-border-0`

## 1.8.0
### Minor Changes

- 2036299: Add `readout-value` and `readout-suffix`, so a `readout` can hold a unit that stays whole while its value truncates

## 1.7.1
### Patch Changes

- 48af973: Make an `<input>` inside an `input` group take the group's text size, so `input-compact` on the group reaches it and a suffixed compact field matches a bare one

## 1.7.0
### Minor Changes

- dfee9ad: Add a `button-xs` class, the `button` at the 24px size of a toggle button item
- dfee9ad: Add a `readout` class, a read-only value box at field height that truncates a long value

## 1.6.0
### Minor Changes

- c637afa: Add StatusDot, Menubar, elevation tokens, and compact control sizes
- 312a8f0: Recolor the `shadow-sm`, `shadow-popover`, and `shadow-dialog` utilities in the dark theme through `--shadow-color-*` variables, which replace `--dark-shadow-*` and `--light-shadow-*`
- 312a8f0: Darken the light `subtle-2` text color to `#6e7074` so it meets 4.5:1 contrast on white and `gray-1`
- 2b3c573: Add Banner and Progress, with their component classes and a pending tone in tailwind-config
- 1da8ed5: Add tone classes for `Progress` (`progress-success`) and `Switch` (`switch-success`), in info, success, warning, and danger

### Patch Changes

- 312a8f0: Slider and scrollbar sizing utilities accept the bare spacing scale, such as `slider-thumb-w-3`
- c121f5a: Add DatePicker
- 312a8f0: Darken the light `--color-code-type` token to #1b6580 so type names reach 4.5:1 on code surfaces

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
