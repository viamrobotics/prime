# @viamrobotics/prime-ui

Viam's Svelte 5 component library.

> [!NOTE]
> Under active development for prime v2. Public API is unstable; expect breaking changes until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-ui @viamrobotics/tailwind-config svelte tailwindcss
```

`@viamrobotics/tailwind-config`, `svelte`, and `tailwindcss` are peer dependencies — install them in the consuming app.

## Usage

```svelte
<script lang="ts">
	import { Button } from '@viamrobotics/prime-ui';
</script>

<Button variant="primary">Click me</Button>
```

In your app's main CSS, import the Tailwind config so token classes (`bg-power-button`, `text-heading`, etc.) resolve:

```css
@import '@viamrobotics/tailwind-config';
```

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
