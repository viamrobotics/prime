<!--
@component
A compact text field for tool panels: a native text input with an optional visible `label` before
it, in the same row layout as `NumberField`. The label focuses the input and does not scrub.
An empty field is the empty string.

```svelte
<TextField label="Motion name" placeholder="builtin" bind:value />
```
-->
<script lang="ts">
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';

	import { type FieldState, Input } from '@viamrobotics/prime-ui';

	import { CONTROL_LABEL_CLASS, CONTROL_ROW_CLASS } from '../control-label.ts';
	import { joinDescribedBy } from '../Hint/described-by.ts';
	import Hint from '../Hint/Hint.svelte';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'type' | 'children' | 'class'> {
		/** Current text. An empty field is the empty string. @default '' */
		value?: string;

		/**
		 * Visible label, rendered before the input. Without it, pass `aria-label` or
		 * `aria-labelledby`.
		 */
		label?: string;

		/**
		 * Help text, shown in a tooltip from an info button beside the label, and the control's
		 * accessible description. Needs a visible `label`.
		 */
		hint?: string;

		/**
		 * Contextual state. `warn` draws the `warning-dark` border. `error` draws the `danger-dark`
		 * border and sets `aria-invalid`. `info` changes no border.
		 */
		state?: FieldState;

		/** Classes for the root element, which holds the label and the input. */
		class?: ClassValue;
	}

	let {
		value = $bindable(''),
		label,
		hint,
		state,
		id: providedId,
		class: extraClasses,
		disabled,
		'aria-describedby': ariaDescribedby,
		...restProps
	}: Props & AccessibleName = $props();

	// A hint sits beside the visible label, so it is only allowed with one.
	type AccessibleName =
		| { label: string }
		| { label?: undefined; hint?: undefined; 'aria-label': string }
		| { label?: undefined; hint?: undefined; 'aria-labelledby': string };

	const generatedId = $props.id();
	const id = $derived(providedId ?? generatedId);
	const hintId = $derived(`${id}-hint`);
	const describedBy = $derived(joinDescribedBy([ariaDescribedby, label && hint && hintId]));
</script>

<div class={[CONTROL_ROW_CLASS, extraClasses]}>
	{#if label}
		<label for={id} class={['flex min-h-6 min-w-6 shrink-0 items-center', CONTROL_LABEL_CLASS]}>
			{label}
		</label>
	{/if}
	{#if label && hint}
		<Hint {label} {hint} descriptionId={hintId} disabled={Boolean(disabled)} />
	{/if}
	<Input
		{...restProps}
		{id}
		{disabled}
		{state}
		type="text"
		aria-describedby={describedBy}
		bind:value
		class="min-w-0 flex-1 input-compact"
	/>
</div>
