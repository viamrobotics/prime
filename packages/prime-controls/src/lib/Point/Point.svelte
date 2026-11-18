<!--
@component
A 2D, 3D, or 4D vector as one [`NumberField`](../NumberField/NumberField.svelte) per axis. It binds
a [`PointValue`](./point.ts) and renders `x` and `y`, plus `z` and `w` when they are defined. Editing
one axis writes a new object with that axis changed and every other axis as it was. Clearing an axis
writes nothing. Its field stays empty while it is being typed in and shows the axis's number again
on blur.

```svelte
<Point label="Position" step={0.1} bind:value={position} />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { SvelteSet } from 'svelte/reactivity';

	import type { FieldState } from '@viamrobotics/prime-ui';

	import { CONTROL_LABEL_CLASS } from '../control-label.ts';
	import Hint from '../Hint/Hint.svelte';
	import NumberField from '../NumberField/NumberField.svelte';
	import type { PointAxis, PointAxisOptions, PointValue } from './point.ts';

	interface Props {
		/** The vector. Its defined axes decide how many fields render. */
		value: PointValue;

		/** Visible label for the group. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

		/**
		 * Help text, shown in a tooltip from an info button beside the label, and the control's
		 * accessible description. The axis fields take none. Needs a visible `label`.
		 */
		hint?: string;

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

		/** Text such as a unit, drawn inside the right edge of every axis field. */
		suffix?: string;

		/** Contextual state of the whole control, forwarded to every axis field. */
		state?: FieldState;

		/**
		 * What single axes set for themselves: `min`, `max`, `step`, `suffix`, `state`, and
		 * `describedBy`. An axis listed here uses its own value in place of the control's.
		 */
		axes?: Partial<Record<PointAxis, PointAxisOptions>>;

		/**
		 * Content drawn under one axis field, at that field's width, such as a restore button or a
		 * message about that axis. It receives the axis.
		 */
		details?: Snippet<[axis: PointAxis]>;

		/** Disable every axis. */
		disabled?: boolean;

		/** Classes for the root `role="group"` element. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		hint,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		labels,
		min,
		max,
		step = 1,
		suffix,
		state,
		axes,
		details,
		disabled,
		class: extraClasses
	}: Props & AccessibleName = $props();

	// A hint sits beside the visible label, so it is only allowed with one.
	type AccessibleName =
		| { label: string }
		| { label?: undefined; hint?: undefined; 'aria-label': string }
		| { label?: undefined; hint?: undefined; 'aria-labelledby': string };

	const AXES: PointAxis[] = ['x', 'y', 'z', 'w'];
	const definedAxes = $derived(AXES.filter((axis) => value[axis] !== undefined));
	const labelId = $props.id();
	const hintId = `${labelId}-hint`;

	// An `undefined` axis would drop its field, so a cleared axis writes nothing. It is held here
	// instead, which lets its field stay empty until a number is typed or the field loses focus.
	const clearedAxes = new SvelteSet<PointAxis>();

	function writeAxis(axis: PointAxis, next: number | undefined) {
		if (next === undefined) {
			clearedAxes.add(axis);
			return;
		}
		clearedAxes.delete(axis);
		value = { ...value, [axis]: next };
	}
</script>

<div
	role="group"
	aria-labelledby={label ? labelId : ariaLabelledby}
	aria-label={label ? undefined : ariaLabel}
	aria-describedby={label && hint ? hintId : undefined}
	class={['flex flex-col gap-1', extraClasses]}
>
	{#if label}
		{#if hint}
			<div class="flex items-center gap-1">
				<span id={labelId} class={CONTROL_LABEL_CLASS}>{label}</span>
				<Hint {label} {hint} descriptionId={hintId} {disabled} />
			</div>
		{:else}
			<span id={labelId} class={CONTROL_LABEL_CLASS}>{label}</span>
		{/if}
	{/if}
	<!-- Equal grid columns keep every axis the same width, whatever `details` holds. -->
	<div class="grid auto-cols-fr grid-flow-col gap-1">
		{#each definedAxes as axis (axis)}
			<div class="flex min-w-0 flex-col gap-1">
				<NumberField
					label={labels?.[axis] ?? axis.toUpperCase()}
					labelPlacement="inset"
					aria-describedby={axes?.[axis]?.describedBy}
					min={axes?.[axis]?.min ?? min}
					max={axes?.[axis]?.max ?? max}
					step={axes?.[axis]?.step ?? step}
					suffix={axes?.[axis]?.suffix ?? suffix}
					state={axes?.[axis]?.state ?? state}
					{disabled}
					class="min-w-0"
					onblur={() => clearedAxes.delete(axis)}
					bind:value={
						() => (clearedAxes.has(axis) ? undefined : value[axis]), (next) => writeAxis(axis, next)
					}
				/>
				{@render details?.(axis)}
			</div>
		{/each}
	</div>
</div>
