# @viamrobotics/prime-ui

## 0.3.0
### Minor Changes

- c637afa: Add StatusDot, Menubar, elevation tokens, and compact control sizes
- e7d53e5: Add Breadcrumbs and Takeover
- c121f5a: Add DatePicker
- 62f5c3b: Add Toast and Notify, two notification stacks with actions and progress on one zag toast machine
- 62f5c3b: Add the clickOutside attachment and the keybindings registry
- 2b3c573: Add Banner and Progress, with their component classes and a pending tone in tailwind-config
- c56e514: Remove Select.Portal and MultiSelect.Portal: Select.Content now portals itself, like every other floating panel
- 1da8ed5: Add tone classes for `Progress` (`progress-success`) and `Switch` (`switch-success`), in info, success, warning, and danger

### Patch Changes

- 65245cf: Paint the warn `Field.StateIcon` in `warning-dark`, the color of the warn border
- 312a8f0: Keep focus on the pressed control after a press outside a Menubar menu, return it to the trigger after one outside a Menu, and put the Select listbox on `shadow-sm`
- 312a8f0: Localize DatePicker month buttons and mark out-of-range typed dates invalid
- c06bc4c: Move the docs to Astro 7 and load the Prism core before its language components so CodeSnippet highlights under a bundler that inlines CommonJS
- 312a8f0: Close parts wear `icon-button` only on their default icon, and `Breadcrumbs.Ellipsis` draws a `…` glyph on the text baseline
- 312a8f0: Drop the `@eslint/compat` dev dependency
- 312a8f0: Stop the page from scrolling when a Menubar menu opens
- ae1a7ea: Keep a toast at its full width when the region is placed at a start or end corner
- Updated dependencies [312a8f0]
- Updated dependencies [c637afa]
- Updated dependencies [c121f5a]
- Updated dependencies [312a8f0]
- Updated dependencies [312a8f0]
- Updated dependencies [2b3c573]
- Updated dependencies [312a8f0]
- Updated dependencies [1da8ed5]
  - @viamrobotics/tailwind-config@1.6.0

## 0.2.0
### Minor Changes

- fa6e9ee: Add Textarea, Switch, ToggleButtons, Collapsible, and Tabs.
- 59d1542: Adds Menu and ContextMenu.
- 17def35: Adds Tooltip, Popover, and Dialog.
- 61d65b8: Adds CodeSnippet, highlighted by prism through the code color tokens, which gain comment, function, keyword, and type, and the DockLeft and DockRight glyphs.

### Patch Changes

- 3e54765: Adds the warning-text token for readable amber text on light surfaces, used by the warning badge, hint, field state icon, and button fills, moves the input warn border to warning-dark, and darkens the icon button glyph to gray-7.
- 3e54765: Updates bits-ui to 2.20.2 and drops the menu content, separator, and forcemount workarounds it made unnecessary.
- ad3347a: Moves the Viam glyph sources under the Icon folder. The @viamrobotics/prime-ui/icons subpath is unchanged.
- Updated dependencies [6cc7253]
- Updated dependencies [6cc7253]
- Updated dependencies [17def35]
- Updated dependencies [3e54765]
- Updated dependencies [6cc7253]
- Updated dependencies [3e54765]
- Updated dependencies [ad3347a]
- Updated dependencies [61d65b8]
  - @viamrobotics/tailwind-config@1.5.0

## 0.1.0

### Minor Changes

- 8f55970: Add `prime-ui`, a Svelte 5 component library.

### Patch Changes

- Updated dependencies [ac91dd1]
- Updated dependencies [ac91dd1]
  - @viamrobotics/tailwind-config@1.4.0
