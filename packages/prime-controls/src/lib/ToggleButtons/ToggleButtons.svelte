<!--
@component
A row of mutually exclusive buttons at a tool panel's scale, one of which is selected. Give it
`items`, or compose options with [`ToggleButtons.Item`](./ToggleButtonsItem.svelte). The visible
`label` names the group, or `aria-label` or `aria-labelledby` does.

```svelte
<ToggleButtons
	bind:value
	label="Space"
	items={[
		{ value: 'local', label: 'Local' },
		{ value: 'world', label: 'World' }
	]}
/>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import type { AccessibleName } from '../accessible-name.ts';

	import { ToggleButtons, type ToggleButtonsOption } from '@viamrobotics/prime-ui';

	import { hintIdFor } from '../Hint/described-by.ts';
	import Hint from '../Hint/Hint.svelte';
	import Item from './ToggleButtonsItem.svelte';

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'class' | 'children' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
	> {
		/** The selected value. Two-way bindable. */
		value?: string;

		/** Options rendered as items, in order. Omit to compose `ToggleButtons.Item` children. */
		items?: ToggleButtonsOption[];

		/** Visible label, rendered before the buttons. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

		/**
		 * Help text, shown in a tooltip from an info button beside the label, and the control's
		 * accessible description. Needs a visible `label`.
		 */
		hint?: string;

		/** Accessible name for the group when there is no visible `label`. */
		'aria-label'?: string;

		/** Id of the element that names the group when there is no visible `label`. */
		'aria-labelledby'?: string;

		/** Disable every option. */
		disabled?: boolean;

		/** Classes for the root element, which holds the label and the buttons. */
		class?: ClassValue;

		/** `ToggleButtons.Item` parts, when `items` is omitted. */
		children?: Snippet;
	}

	let {
		value = $bindable(),
		items,
		label,
		hint,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		disabled,
		class: extraClasses,
		children,
		...restProps
	}: Props & AccessibleName = $props();

	const labelId = $props.id();
	const hintId = hintIdFor(labelId);
</script>

<div {...restProps} class={['flex items-center gap-2', extraClasses]}>
	{#if label}
		<span id={labelId} class="shrink-0 control-label">{label}</span>
	{/if}
	{#if label && hint}
		<Hint {label} {hint} descriptionId={hintId} {disabled} />
	{/if}
	<ToggleButtons
		bind:value
		{disabled}
		aria-label={label ? undefined : ariaLabel}
		aria-labelledby={label ? labelId : ariaLabelledby}
		aria-describedby={label && hint ? hintId : undefined}
	>
		{#if items}
			{#each items as item (item.value)}
				<Item value={item.value} disabled={item.disabled}>{item.label}</Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</ToggleButtons>
</div>
