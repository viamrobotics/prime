<!--
@component
A row of mutually exclusive buttons, one of which is selected. Give it `items`, or compose
options with [`ToggleButtons.Item`](./ToggleButtonsItem.svelte). Inside a
[`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `disabled`,
`state`, `aria-labelledby`, and `aria-describedby` from there.

Built on [bits-ui `ToggleGroup`](https://bits-ui.com/docs/components/toggle-group).

```svelte
<Field class="flex flex-col gap-1">
	<Label>Units</Label>
	<ToggleButtons bind:value items={[{ value: 'mm', label: 'mm' }, { value: 'in', label: 'in' }]} />
</Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ToggleGroup } from 'bits-ui';

	import type { ToggleButtonsOption } from './option.ts';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import Item from './ToggleButtonsItem.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		/** The selected value. Two-way bindable. */
		value?: string;

		/** Options rendered as items, in order. Omit to compose `ToggleButtons.Item` children. */
		items?: ToggleButtonsOption[];

		/** Disable every option. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		value = $bindable(),
		items,
		disabled,
		state,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
</script>

<ToggleGroup.Root
	type="single"
	bind:value={
		() => value ?? '',
		(next) => {
			if (next) value = next;
		}
	}
	disabled={disabled ?? field?.disabled ?? false}
	aria-invalid={currentState === FieldStates.Error || undefined}
	aria-labelledby={labelledBy ?? field?.labelledBy}
	aria-describedby={describedBy ?? field?.describedBy}
	id={id ?? field?.controlId ?? uid}
	class={['inline-flex', extraClasses]}
	loop
	{...restProps}
>
	{#if items}
		{#each items as item (item.value)}
			<Item value={item.value} disabled={item.disabled}>{item.label}</Item>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</ToggleGroup.Root>
