# @viamrobotics/prime-docs

## 0.0.3
### Patch Changes

- 62f5c3b: Add Toast and Notify, two notification stacks on one zag toast machine
- 62f5c3b: Add the clickOutside attachment and the keybindings registry
- 2b3c573: Add Banner and Progress, with banner and progress component classes in tailwind-config

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
