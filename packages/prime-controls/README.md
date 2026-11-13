# @viamrobotics/prime-controls

Compact realtime controls for Svelte 5 tool panels: number fields, vectors, and sliders that step by keyboard and scrub by dragging, plus panels, folders, and tabs to group them.

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

### Slider

```svelte
<script lang="ts">
	import { Slider } from '@viamrobotics/prime-controls';

	let opacity = $state(0.5);
</script>

<Slider label="Opacity" min={0} max={1} step={0.01} bind:value={opacity} />
```

A native range with a number readout beside it. A drag writes the value on every pointer move.

### Panel

```svelte
<Panel title="Camera">
	<NumberField label="FOV" bind:value={fov} />
</Panel>
```

A dense group of controls. A visible `title` names it, or pass `aria-label`.

### Folder

```svelte
<Folder title="Lighting" bind:open>
	<Slider label="Intensity" min={0} max={1} step={0.01} bind:value={intensity} />
</Folder>
```

A collapsible group inside a panel, open by default.

### Tabs

```svelte
<Tabs bind:value>
	<Tabs.List aria-label="Mode">
		<Tabs.Trigger value="move">Move</Tabs.Trigger>
		<Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="move">…</Tabs.Content>
	<Tabs.Content value="rotate">…</Tabs.Content>
</Tabs>
```

The prime-ui tabs at panel scale, with the same parts and keyboard.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-controls/) for recipes, keyboard and pointer behavior, and props.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
