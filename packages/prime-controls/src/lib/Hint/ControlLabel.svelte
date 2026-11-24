<!--
@component
The visible label of a labeled control, wearing `control-label`, followed by its `Hint` button
when both `label` and `hint` are set. Renders nothing without a `label`.

```svelte
<ControlLabel for={id} label="Speed" hint="Fraction of full power" />
```
-->
<script lang="ts">
	import type { ClassValue, HTMLLabelAttributes } from 'svelte/elements';

	import { hintIdFor } from './described-by.ts';
	import Hint from './Hint.svelte';

	interface Props extends Omit<HTMLLabelAttributes, 'for' | 'class' | 'children'> {
		/** The id of the control the label names. */
		for: string;

		/** The visible label text. */
		label?: string;

		/** Help text for the `Hint` beside the label. Needs a `label`. */
		hint?: string;

		/** Disable the hint button. */
		disabled?: boolean;

		/** Extra classes for the `<label>`. */
		class?: ClassValue;
	}

	const {
		for: controlId,
		label,
		hint,
		disabled,
		class: extraClasses,
		...restProps
	}: Props = $props();
</script>

{#if label}
	<label
		{...restProps}
		for={controlId}
		class={['flex min-h-6 min-w-6 shrink-0 items-center control-label', extraClasses]}
	>
		{label}
	</label>
{/if}
{#if label && hint}
	<Hint {label} {hint} descriptionId={hintIdFor(controlId)} {disabled} />
{/if}
