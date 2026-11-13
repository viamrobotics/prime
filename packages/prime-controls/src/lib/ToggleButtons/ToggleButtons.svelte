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
	import type { ClassValue } from 'svelte/elements';

	import { ToggleButtons, type ToggleButtonsOption } from '@viamrobotics/prime-ui';

	import { CONTROL_LABEL_CLASS } from '../control-label.ts';
	import Item from './ToggleButtonsItem.svelte';

	interface Props {
		/** The selected value. Two-way bindable. */
		value?: string;

		/** Options rendered as items, in order. Omit to compose `ToggleButtons.Item` children. */
		items?: ToggleButtonsOption[];

		/** Visible label, rendered before the buttons. Without it, pass `aria-label` or `aria-labelledby`. */
		label?: string;

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

	type AccessibleName =
		| { label: string }
		| { 'aria-label': string }
		| { 'aria-labelledby': string };

	let {
		value = $bindable(),
		items,
		label,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		disabled,
		class: extraClasses,
		children
	}: Props & AccessibleName = $props();

	const labelId = $props.id();
</script>

<div class={['flex items-center gap-1', extraClasses]}>
	{#if label}
		<span id={labelId} class={['shrink-0', CONTROL_LABEL_CLASS]}>{label}</span>
	{/if}
	<ToggleButtons
		bind:value
		{disabled}
		aria-label={label ? undefined : ariaLabel}
		aria-labelledby={label ? labelId : ariaLabelledby}
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
