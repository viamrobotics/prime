# @viamrobotics/prime-controls

Compact realtime controls for Svelte 5 tool panels: number fields, vectors, and sliders that step by keyboard and scrub by dragging, text and file fields, a compact select and toggle buttons, plus panels, folders, and tabs to group them.

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

Pass `hint` to put an info button beside the label that shows the text in a tooltip and describes the field to a screen reader. `NumberField`, `TextField`, `FileField`, `Point`, `Slider`, and `ToggleButtons` take it with a visible `label`. A childless `Select` has none, so it names the button from `aria-label`.

```svelte
<NumberField label="Speed" hint="Metres per second" bind:value={speed} />
```

Pass `suffix` to draw a short text such as a unit inside the input's right edge. It is part of the field's accessible description. `Point` draws it in every axis and `Slider` in its readout.

```svelte
<NumberField label="Length" suffix="mm" bind:value={length} />
```

Pass a `trailing` snippet to draw content such as an icon button inside the right edge, after any `suffix`. `Point` passes it the axis and `Slider` draws it in its readout.

Pass `state` (`'warn'` or `'error'`) to draw a `warning-dark` or `danger-dark` border. An error also sets `aria-invalid="true"`. `'info'` draws no border. `NumberField`, `Point`, and `Slider` take it, and `Point` gives one state to every axis.

```svelte
<NumberField label="Speed" state="warn" bind:value={speed} />
```

### TextField

```svelte
<script lang="ts">
	import { TextField } from '@viamrobotics/prime-controls';

	let name = $state('');
</script>

<TextField label="Motion name" placeholder="builtin" bind:value={name} />
```

A text input in the `NumberField` row layout, without scrub. The bound value is a string. It starts `undefined` unless you set it, and a cleared field binds `''`. It takes `hint` and `state` as `NumberField` does.

### FileField

```svelte
<script lang="ts">
	import { FileField } from '@viamrobotics/prime-controls';

	let files = $state<File[]>([]);
</script>

<FileField label="Audio file" accept=".wav,.mp3" bind:value={files} />
```

A native file input in the `TextField` row layout. The bound value is a `File[]`, which holds at most one file without `multiple`, and a cleared field is `[]`. The chosen names truncate to the row and a clear button sits beside them. It takes `hint` and `state` as `NumberField` does.

### Point

```svelte
<script lang="ts">
	import { Point, type PointValue } from '@viamrobotics/prime-controls';

	let position = $state<PointValue>({ x: 0, y: 1, z: 2 });
</script>

<Point label="Position" step={0.1} bind:value={position} />
```

The defined axes decide how many fields render: `x` and `y`, plus `z` and `w` when present. The axes sit in one row when the box is wide enough and stack in a narrow one.

### Slider

```svelte
<script lang="ts">
	import { Slider } from '@viamrobotics/prime-controls';

	let opacity = $state(0.5);
</script>

<Slider label="Opacity" min={0} max={1} step={0.01} bind:value={opacity} />
```

A native range with a number readout beside it. A drag writes the value on every pointer move. A visible `label` names both, or pass `aria-label`.

### Select

```svelte
<script lang="ts">
	import { Select } from '@viamrobotics/prime-controls';

	const modes = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];
	let mode = $state('move');
</script>

<Select items={modes} bind:value={mode} aria-label="Mode" />
```

The prime-ui select at panel scale. Without children it renders its own trigger and list from `items`, named by `aria-label` or `aria-labelledby`. Pass `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Viewport`, and `Select.Items` to compose it, with the same parts and keyboard as prime-ui's.

### ToggleButtons

```svelte
<ToggleButtons
	label="Space"
	items={[
		{ value: 'local', label: 'Local' },
		{ value: 'world', label: 'World' }
	]}
	bind:value
/>
```

A row of mutually exclusive buttons at panel scale. A visible `label` names the group, or pass `aria-label`. Compose it from `ToggleButtons.Item` children when `items` is omitted.

### Panel

```svelte
<Panel title="Camera">
	<NumberField label="FOV" bind:value={fov} />
</Panel>
```

A dense group of controls. A visible `title` names it, or pass `aria-label`. `Point`, `Slider`, `ToggleButtons`, `Panel`, and `Folder` pass an `id`, `data-*`, or `aria-*` attribute through to their root.

### Folder

```svelte
<Folder title="Lighting" bind:open>
	<Slider label="Intensity" min={0} max={1} step={0.01} bind:value={intensity} />
</Folder>
```

A collapsible group inside a panel. It renders open while `open` is `undefined`. The `indicator` snippet replaces the chevron.

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
