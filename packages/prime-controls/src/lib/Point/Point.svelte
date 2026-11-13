<!--
@component
A 2D, 3D, or 4D vector as one [`NumberField`](../NumberField/NumberField.svelte) per axis. It binds
a [`PointValue`](./point.ts) and renders `x` and `y`, plus `z` and `w` when they are defined. Editing
one axis writes a new object with that axis changed and every other axis as it was.

```svelte
<Point label="Position" step={0.1} bind:value={position} />
```
-->
<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { CONTROL_LABEL_CLASS } from '../control-label.ts';
	import NumberField from '../NumberField/NumberField.svelte';
	import type { PointAxis, PointValue } from './point.ts';

	interface Props {
		/** The vector. Its defined axes decide how many fields render. */
		value: PointValue;

		/** Visible label for the group. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

		/** Accessible name for the group when it has no visible `label`. */
		'aria-label'?: string;

		/** Id of the element that names the group when it has no visible `label`. */
		'aria-labelledby'?: string;

		/** Each axis field's visible label, which is also its scrub handle. @default the uppercase axis name */
		labels?: Partial<Record<PointAxis, string>>;

		/** The minimum value of every axis. */
		min?: number;

		/** The maximum value of every axis. */
		max?: number;

		/** The step of every axis. @default 1 */
		step?: number;

		/** Disable every axis. */
		disabled?: boolean;

		/** Classes for the root `role="group"` element. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		labels,
		min,
		max,
		step = 1,
		disabled,
		class: extraClasses
	}: Props & AccessibleName = $props();

	type AccessibleName =
		| { label: string }
		| { 'aria-label': string }
		| { 'aria-labelledby': string };

	const AXES: PointAxis[] = ['x', 'y', 'z', 'w'];
	const axes = $derived(AXES.filter((axis) => value[axis] !== undefined));
	const labelId = $props.id();
</script>

<div
	role="group"
	aria-labelledby={label ? labelId : ariaLabelledby}
	aria-label={label ? undefined : ariaLabel}
	class={['flex flex-col gap-1', extraClasses]}
>
	{#if label}
		<span id={labelId} class={CONTROL_LABEL_CLASS}>{label}</span>
	{/if}
	<div class="flex gap-1">
		{#each axes as axis (axis)}
			<NumberField
				label={labels?.[axis] ?? axis.toUpperCase()}
				{min}
				{max}
				{step}
				{disabled}
				class="min-w-0 flex-1"
				bind:value={
					() => value[axis],
					(next) => {
						if (next !== undefined) value = { ...value, [axis]: next };
					}
				}
			/>
		{/each}
	</div>
</div>
