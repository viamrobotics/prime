<!--
@component
A 2D, 3D, or 4D vector as one [`NumberField`](../NumberField/NumberField.svelte) per axis. It binds
a [`PointValue`](./point.ts) and renders `x` and `y`, plus `z` and `w` when they are defined. The
axes sit in one row where each has room for its value, and stack one a row in a narrower box. Editing
one axis writes a new object with that axis changed and every other axis as it was. Clearing an axis
writes nothing. Its field stays empty while it is being typed in and shows the axis's number again
on blur.

```svelte
<Point label="Position" step={0.1} bind:value={position} />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { SvelteSet } from 'svelte/reactivity';
	import type { AccessibleName } from '../accessible-name.ts';

	import type { FieldState } from '@viamrobotics/prime-ui';

	import { hintIdFor } from '../Hint/described-by.ts';
	import Hint from '../Hint/Hint.svelte';
	import NumberField from '../NumberField/NumberField.svelte';
	import type { PointAxis, PointAxisOptions, PointValue } from './point.ts';

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'children' | 'role' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
	> {
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

		/**
		 * Content drawn inside the right edge of one axis field, after its `suffix`, such as an icon
		 * button that acts on that axis. It receives the axis.
		 */
		trailing?: Snippet<[axis: PointAxis]>;

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
		trailing: trailingContent,
		disabled,
		class: extraClasses,
		...restProps
	}: Props & AccessibleName = $props();

	const AXES: PointAxis[] = ['x', 'y', 'z', 'w'];
	const definedAxes = $derived(AXES.filter((axis) => value[axis] !== undefined));

	// The axes sit in one row from about 7.3rem a field, the room for an inset label, eight
	// characters, trailing content, and the stepper. Narrower than that they stack, one a row.
	const ROW_FROM: Record<number, string> = {
		1: 'grid-flow-col auto-cols-fr',
		2: '@min-[15rem]:grid-flow-col @min-[15rem]:auto-cols-fr',
		3: '@min-[22rem]:grid-flow-col @min-[22rem]:auto-cols-fr',
		4: '@min-[29rem]:grid-flow-col @min-[29rem]:auto-cols-fr'
	};
	const labelId = $props.id();
	const hintId = hintIdFor(labelId);

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
	{...restProps}
	role="group"
	aria-labelledby={label ? labelId : ariaLabelledby}
	aria-label={label ? undefined : ariaLabel}
	aria-describedby={label && hint ? hintId : undefined}
	class={['@container flex flex-col gap-1', extraClasses]}
>
	{#if label}
		{#if hint}
			<div class="flex items-center gap-1">
				<span id={labelId} class="control-label">{label}</span>
				<Hint {label} {hint} descriptionId={hintId} {disabled} />
			</div>
		{:else}
			<span id={labelId} class="control-label">{label}</span>
		{/if}
	{/if}
	<!-- Equal grid columns keep every axis the same width, whatever `details` holds. -->
	<div data-point-axes class={['grid gap-1', ROW_FROM[definedAxes.length]]}>
		{#each definedAxes as axis (axis)}
			<div class="flex min-w-0 flex-col gap-1">
				{#snippet axisTrailing()}
					{@render trailingContent?.(axis)}
				{/snippet}
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
					trailing={trailingContent ? axisTrailing : undefined}
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
