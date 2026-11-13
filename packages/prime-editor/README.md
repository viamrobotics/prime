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

`language` is one of `go`, `javascript`, `json`, `python`, `sql`, and `typescript`. Set `original` to open a diff view, and `diff="split"` to show it side by side. A function binding receives every edit and can veto or transform it. Search and code folding work from the keyboard, and `aria-invalid` marks the document invalid.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-editor/) for recipes and props.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
