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
	import type { ClassValue } from 'svelte/elements';

	import { CONTROL_LABEL_CLASS } from '../control-label.ts';
	import NumberField from '../NumberField/NumberField.svelte';

	interface Props {
		/** Current value. */
		value: number;

		/** Visible label, rendered before the range. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

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

		/** Disable the range and the readout. */
		disabled?: boolean;

		/** Classes for the root element, which holds the label, the range, and the readout. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		min = 0,
		max = 100,
		step = 1,
		disabled,
		class: extraClasses
	}: Props & AccessibleName = $props();

	type AccessibleName =
		| { label: string }
		| { 'aria-label': string }
		| { 'aria-labelledby': string };

	const id = $props.id();
	const readoutName = $derived.by(() => {
		const name = label ?? ariaLabel;
		if (name) return { 'aria-label': name };
		// AccessibleName guarantees a name here, but destructuring drops that narrowing.
		return { 'aria-labelledby': ariaLabelledby ?? '' };
	});
</script>

<div class={['flex items-center gap-1', extraClasses]}>
	{#if label}
		<label for={id} class={['shrink-0', CONTROL_LABEL_CLASS]}>{label}</label>
	{/if}
	<input
		{id}
		type="range"
		aria-label={label ? undefined : ariaLabel}
		aria-labelledby={label ? undefined : ariaLabelledby}
		{min}
		{max}
		{step}
		{disabled}
		class={[
			'min-h-6 min-w-0 flex-1 cursor-pointer appearance-none bg-transparent',
			'slider-thumb-gray-7 slider-track-gray-3',
			'[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full',
			'[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full',
			'[&::-webkit-slider-thumb]:appearance-none',
			'focus-ring',
			'disabled:cursor-not-allowed disabled:opacity-60 disabled:slider-thumb-gray-4'
		]}
		bind:value
	/>
	<NumberField
		{...readoutName}
		{min}
		{max}
		{step}
		{disabled}
		class="w-16 shrink-0"
		bind:value={
			() => value,
			(next) => {
				if (next !== undefined) value = next;
			}
		}
	/>
</div>
