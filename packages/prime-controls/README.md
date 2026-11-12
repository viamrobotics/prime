# @viamrobotics/prime-controls

Compact realtime controls for Svelte 5 tool panels. Each control is a native number input that steps by keyboard and scrubs by dragging its label sideways.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-controls @viamrobotics/prime-ui @viamrobotics/tailwind-config
```

Requires `svelte` `^5.29.0`. Import the stylesheets once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-ui/styles.css';
@import '@viamrobotics/prime-controls/styles.css';
```

## Usage

### NumberField

```svelte
<script lang="ts">
	import { NumberField } from '@viamrobotics/prime-controls';

	let speed = $state(5);
</script>

<NumberField label="Speed" min={0} max={10} step={0.1} bind:value={speed} />
```

Drag the label sideways to scrub, or press ArrowUp and ArrowDown to step. Shift steps by 10 times and Alt by a tenth. A function binding receives every value a scrub writes and can veto or throttle by not assigning.

### Point

```svelte
<script lang="ts">
	import { Point, type PointValue } from '@viamrobotics/prime-controls';

	let position = $state<PointValue>({ x: 0, y: 1, z: 2 });
</script>

<Point label="Position" step={0.1} bind:value={position} />
```

The defined axes decide how many fields render: `x` and `y`, plus `z` and `w` when present.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-controls/) for recipes, keyboard and pointer behavior, and props.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
