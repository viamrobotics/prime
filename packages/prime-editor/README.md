# @viamrobotics/prime-editor

A CodeMirror 6 code editor for Svelte 5, themed with Viam's code tokens, with a diff view.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-editor @viamrobotics/tailwind-config
```

Requires `svelte` `^5.29.0`. Import the stylesheet once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-editor/styles.css';
```

## Usage

```svelte
<script lang="ts">
	import { CodeEditor } from '@viamrobotics/prime-editor';

	let value = $state('{ "speed": 5 }');
</script>

<CodeEditor aria-label="Config" language="json" bind:value />
```

Every editor needs `aria-label` or `aria-labelledby`, and omitting both is a type error. Every `aria-*` attribute goes to the editing surface, and every other attribute goes to the outer `div`.

`language` is one of `go`, `javascript`, `json`, `python`, `sql`, and `typescript`, and a missing `language` is plain text. `readonly` blocks edits while the document stays focusable and copyable, and `disabled` turns the editor off. `placeholder` fills an empty document, `lineNumbers` shows the gutter with its fold markers, and `wrapLines` wraps long lines. `aria-invalid` marks the document invalid.

Set `original` to open a diff view, and `diff="split"` to show it side by side. `collapseUnchanged` folds long runs of unchanged lines. A split diff names the original side `<name>, original`. A function binding receives every edit and can veto or transform it.

## Keyboard

Search and code folding work from the keyboard. `Ctrl + Shift + ]` (`Cmd + Option + ]` on macOS) expands the collapsed run of unchanged lines next to the cursor in a diff, and unfolds the block at the cursor otherwise. Tab is not bound, so focus can always leave the editor.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-editor/) for recipes and props.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
