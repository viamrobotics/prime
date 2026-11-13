# @viamrobotics/prime-docs

## 0.0.3
### Patch Changes

- 312a8f0: Show each brand color as its own row in the token gallery
- c637afa: Add StatusDot, Menubar, elevation tokens, and compact control sizes
- 27be2a2: Add prime-controls with NumberField and Point
- e7d53e5: Add Breadcrumbs and Takeover
- c121f5a: Add DatePicker
- 312a8f0: Add a compact `Select` to prime-controls and inset the `Point` axis labels
- 152ca17: Add a compact `ToggleButtons` to prime-controls
- 5e4dc09: Add prime-editor with a CodeMirror CodeEditor and its diff view
- 9534529: Render keyboard tables through a shared `KeyboardTable` component and build the Notify and Toast demo forms from prime-ui controls
- 62f5c3b: Add Toast and Notify, two notification stacks with actions and progress on one zag toast machine
- 312a8f0: Localize DatePicker month buttons and mark out-of-range typed dates invalid
- 312a8f0: Point, NumberField, Panel, and Slider require a `label` or `title`, `aria-label`, or `aria-labelledby` at the type level
- c06bc4c: Move the docs to Astro 7 and load the Prism core before its language components so CodeSnippet highlights under a bundler that inlines CommonJS
- 312a8f0: Close parts wear `icon-button` only on their default icon, and `Breadcrumbs.Ellipsis` draws a `…` glyph on the text baseline
- 62f5c3b: Add the clickOutside attachment and the keybindings registry
- 312a8f0: Lint the docs Svelte islands and TypeScript sources, and make Showcase group captions headings
- 2b3c573: Add Banner and Progress, with their component classes and a pending tone in tailwind-config
- c56e514: Remove Select.Portal and MultiSelect.Portal: Select.Content now portals itself, like every other floating panel
- 312a8f0: Darken the light `--color-code-type` token to #1b6580 so type names reach 4.5:1 on code surfaces
- 1da8ed5: Add tone classes for `Progress` (`progress-success`) and `Switch` (`switch-success`), in info, success, warning, and danger

## 0.0.2
### Patch Changes

- fa6e9ee: Add Textarea, Switch, ToggleButtons, Collapsible, and Tabs.
- 6cc7253: Every package is documented and demonstrated on its own docs page: prime-panes and prime-tree get component pages with live recipes, the tailwind-config pages render the token gallery and component-class states statically with a theme toggle demo, and tweakpane-config mounts live Tweakpane blades. The playground bundles, their build pipeline, and the Playgrounds sidebar group are gone. Islands follow the site's theme picker.
- 3e54765: The docs app typechecks its islands and loaders with svelte-check, wired into the root check.
- 59d1542: Adds Menu and ContextMenu.
- 17def35: Adds Tooltip, Popover, and Dialog.
- ad3347a: Buttons compose a color with a fill: button-warning and button-info join the colors, button-outline and button-ghost are the fills, button-dark replaces button-primary, and the icon button takes the same modifiers, replacing button-outline-danger, icon-button-secondary, and icon-button-danger. The bare class is the default and the only neutral outline.
- 61d65b8: Adds CodeSnippet, highlighted by prism through the code color tokens, which gain comment, function, keyword, and type, and the DockLeft and DockRight glyphs.

## 0.0.1
### Patch Changes

- a463c1f: Add `@viamrobotics/prime-tree`, a headless tree view for Svelte 5 on `@zag-js/tree-view`.
- 8f55970: Add `prime-ui`, a Svelte 5 component library.
- ac91dd1: Add the design system's chrome as utility classes: button and its variant modifiers, icon-button, badge, pill, kbd, avatar, progress-dots, input, focus-ring, and focus-ring-within, with a playground page and docs recipes.
