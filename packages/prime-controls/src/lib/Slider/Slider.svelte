<!--
@component
A number on a range: a native `<input type="range">` with a
[`NumberField`](../NumberField/NumberField.svelte) readout beside it. A drag writes `value` on
every pointer move, so a function binding sees each intermediate value and can throttle or veto.
The visible `label` names both the range and the readout. Without it, pass `aria-label` or `aria-labelledby`.

```svelte
<Slider label="Opacity" min={0} max={1} step={0.01} bind:value={opacity} />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import type { AccessibleName } from '../accessible-name.ts';

	import { type FieldState, FieldStates } from '@viamrobotics/prime-ui';

	import { hintIdFor } from '../Hint/described-by.ts';
	import Hint from '../Hint/Hint.svelte';
	import NumberField from '../NumberField/NumberField.svelte';
	import { longestValueLength } from '../NumberField/number-step.ts';

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'children' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
	> {
		/** Current value. */
		value: number;

		/** Visible label, rendered before the range. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

		/**
		 * Help text, shown in a tooltip from an info button beside the label, and the control's
		 * accessible description. Needs a visible `label`.
		 */
		hint?: string;

		/** Accessible name for the range and the readout when there is no visible `label`. */
		'aria-label'?: string;

		/** Id of the element that names the range and the readout when there is no visible `label`. */
		'aria-labelledby'?: string;

		/** The range's lowest value. @default 0 */
		min?: number;

		/** The range's highest value. @default 100 */
		max?: number;

		/** The amount one key press moves the value, and the granularity of a drag. @default 1 */
		step?: number;

		/** Text such as a unit, drawn inside the right edge of the readout. */
		suffix?: string;

		/**
		 * Content drawn inside the right edge of the readout, after any `suffix`, such as an icon
		 * button that acts on this value.
		 */
		trailing?: Snippet;

		/**
		 * Contextual state, drawn on the readout. `warn` draws the `warning-dark` border. `error`
		 * draws the `danger-dark` border and sets `aria-invalid` on the range and the readout. `info`
		 * changes no border.
		 */
		state?: FieldState;

		/** Disable the range and the readout. */
		disabled?: boolean;

		/** Classes for the root element, which holds the label, the range, and the readout. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		hint,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		min = 0,
		max = 100,
		step = 1,
		suffix,
		trailing,
		state,
		disabled,
		class: extraClasses,
		...restProps
	}: Props & AccessibleName = $props();

	const READOUT_CARET_ROOM_PX = 2;

	const id = $props.id();
	const hintId = hintIdFor(id);
	// The readout's text box is as wide as the longest value in the range, so no value clips. The
	// width is content-box, so the frame and a suffix add to it instead of eating into it.
	const readoutStyle = $derived(
		`box-sizing: content-box; width: calc(${longestValueLength(min, max, step)}ch + ${READOUT_CARET_ROOM_PX}px)`
	);
	const describedBy = $derived(label && hint ? hintId : undefined);
	const readoutName = $derived.by(() => {
		const name = label ?? ariaLabel;
		if (name) return { 'aria-label': name };
		// AccessibleName guarantees a name here, but destructuring drops that narrowing.
		return { 'aria-labelledby': ariaLabelledby ?? '' };
	});
</script>

<div {...restProps} class={['flex items-center gap-2', extraClasses]}>
	{#if label}
		<label for={id} class="shrink-0 control-label">{label}</label>
	{/if}
	{#if label && hint}
		<Hint {label} {hint} descriptionId={hintId} {disabled} />
	{/if}
	<input
		{id}
		type="range"
		aria-label={label ? undefined : ariaLabel}
		aria-labelledby={label ? undefined : ariaLabelledby}
		aria-describedby={describedBy}
		aria-invalid={state === FieldStates.Error || undefined}
		{min}
		{max}
		{step}
		{disabled}
		class={[
			'min-h-6 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent',
			'slider-thumb-gray-7 slider-track-gray-3 aria-invalid:slider-track-danger-dark',
			'[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full',
			'slider-thumb-h-3 slider-thumb-w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:rounded-full',
			'[&::-webkit-slider-thumb]:appearance-none',
			'focus-ring',
			'disabled:cursor-not-allowed disabled:slider-thumb-disabled-dark disabled:slider-track-disabled-light'
		]}
		bind:value
	/>
	<NumberField
		{...readoutName}
		aria-describedby={describedBy}
		{min}
		{max}
		{step}
		{suffix}
		{trailing}
		{state}
		{disabled}
		style={readoutStyle}
		class="min-w-16 shrink-0"
		bind:value={
			() => value,
			(next) => {
				if (next !== undefined) value = next;
			}
		}
	/>
</div>
