<!--
@component
A compact text field for tool panels: a native text input with an optional visible `label` before
it, in the same row layout as `NumberField`. The label focuses the input and does not scrub.
A cleared field is the empty string.

```svelte
<TextField label="Motion name" placeholder="builtin" bind:value />
```
-->
<script lang="ts">
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';
	import type { AccessibleName } from '../accessible-name.ts';

	import { type FieldState, Input } from '@viamrobotics/prime-ui';

	import ControlLabel from '../Hint/ControlLabel.svelte';
	import { hintIdFor, joinDescribedBy } from '../Hint/described-by.ts';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'type' | 'children' | 'class'> {
		/** Current text, `undefined` until set. A cleared field writes the empty string. */
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
		value = $bindable(),
		label,
		hint,
		state,
		id: providedId,
		class: extraClasses,
		disabled,
		'aria-describedby': ariaDescribedby,
		...restProps
	}: Props & AccessibleName = $props();

	const generatedId = $props.id();
	const id = $derived(providedId ?? generatedId);
	const hintId = $derived(hintIdFor(id));
	const describedBy = $derived(joinDescribedBy([ariaDescribedby, label && hint && hintId]));
</script>

<div class={['flex items-center gap-2', extraClasses]}>
	<ControlLabel for={id} {label} {hint} disabled={Boolean(disabled)} />
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
