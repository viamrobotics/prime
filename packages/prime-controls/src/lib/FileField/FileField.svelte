<!--
@component
A compact file chooser for tool panels: a native file input with an optional visible `label`
before it, in the same row layout as `TextField`. The row shows the chosen file names, cut short
to fit, and a button that clears them. A cleared field is an empty array.

```svelte
<FileField label="Audio file" accept=".wav,.mp3" bind:value />
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLInputAttributes } from 'svelte/elements';
	import type { AccessibleName } from '../accessible-name.ts';

	import { type FieldState, FileInput } from '@viamrobotics/prime-ui';

	import ControlLabel from '../Hint/ControlLabel.svelte';
	import { hintIdFor, joinDescribedBy } from '../Hint/described-by.ts';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'files' | 'type' | 'children' | 'class' | 'placeholder' | 'readonly'
	> {
		/**
		 * The chosen files, in the order the browser lists them. Without `multiple` it holds at most
		 * one. A cleared field is an empty array.
		 */
		value?: File[];

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

		/** Text shown while no file is chosen. @default 'No file chosen' */
		placeholder?: string;

		/** Accessible name of the button that clears the choice. @default 'Clear selection' */
		clearLabel?: string;

		/**
		 * Contextual state. `warn` draws the `warning-dark` border. `error` draws the `danger-dark`
		 * border and sets `aria-invalid`. `info` changes no border.
		 */
		state?: FieldState;

		/**
		 * Replaces the prompt, an upload icon and "Choose file". It is decoration, hidden from
		 * assistive technology, which reads the native input.
		 */
		children?: Snippet;

		/** Classes for the root element, which holds the label and the input. */
		class?: ClassValue;
	}

	let {
		value = $bindable(),
		label,
		hint,
		state: fieldState,
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
	<FileInput
		{...restProps}
		{id}
		{disabled}
		state={fieldState}
		aria-describedby={describedBy}
		bind:value
		class="min-w-0 flex-1 input-compact"
	/>
</div>
