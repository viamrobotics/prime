# @viamrobotics/prime-panes

Resizable, rearrangeable split-pane layouts for Svelte 5. The layout is a plain binary tree that you bind to the component. Users resize panes by dragging dividers and rearrange them by dragging a pane onto another or by using a button. Several panes can share one slot as a stack behind tabs.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-panes @viamrobotics/tailwind-config @zag-js/splitter @zag-js/svelte
```

Requires `svelte` `^5.29.0`, because the pane controls are attachments. Import the stylesheet once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-panes/styles.css';
```

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-panes/) for the layout model, stacks, function bindings, tree operations, and a migration guide from the app's protobuf workspace trees.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
