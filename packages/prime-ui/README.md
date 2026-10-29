# @viamrobotics/prime-ui

Viam's Svelte 5 component library.

> [!NOTE]
> Under active development for prime v2. Public API is unstable; expect breaking changes until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-ui @viamrobotics/tailwind-config svelte tailwindcss
```

`svelte` is a peer dependency, so install it in the consuming app, with `tailwindcss` to compile the classes. `@viamrobotics/tailwind-config` comes with the package as a dependency, and installing it directly as well gives your own classes the same tokens.

In your app's main CSS, import Tailwind and the prime-ui stylesheet:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-ui/styles.css';
```

Tailwind v4 skips `node_modules` when it detects which classes to generate, so the stylesheet points Tailwind at the package's compiled components and imports the Viam design tokens.

## Usage

```svelte
<script lang="ts">
	import { Field, Input, Label } from '@viamrobotics/prime-ui';

	let value = $state('');
</script>

<Field class="flex flex-col gap-1">
	<Label>Email</Label>
	<Input type="email" bind:value />
</Field>
```

`Icon` takes an SVG path string or a Svelte icon component. Install `@mdi/js` for the Material Design icons, and import the Viam glyphs from `@viamrobotics/prime-ui/icons`.

Every component has a page with live examples at the [prime docs](https://viamrobotics.github.io/prime/packages/prime-ui/).

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
