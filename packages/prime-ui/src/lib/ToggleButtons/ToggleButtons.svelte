<!--
@component
A row of mutually exclusive buttons, one of which is selected. Give it `items`, or compose
options with [`ToggleButtons.Item`](./ToggleButtonsItem.svelte). Inside a
[`Field`](../Field/Field.svelte) it takes its `id` (the field's `controlId`), `disabled`,
`state`, `aria-describedby`, and name from there. It is a `radiogroup`, and its one Tab stop is
the selected option, or the first when none is selected.

Built on [bits-ui `ToggleGroup`](https://bits-ui.com/docs/components/toggle-group).

```svelte
<Field label="Units" class="flex flex-col gap-1">
	<Label />
	<ToggleButtons bind:value items={[{ value: 'mm', label: 'mm' }, { value: 'in', label: 'in' }]} />
</Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ToggleGroup } from 'bits-ui';

	import type { ToggleButtonsOption } from './option.ts';

	import { warnIfUnnamed } from '../accessible-name-warning.ts';
	import { fieldState, FieldStates, type FieldState } from '../Field/state.ts';
	import { controlName, useField } from '../Field/useField.svelte.ts';
	import Item from './ToggleButtonsItem.svelte';
	import { provideToggleButtons } from './useToggleButtons.svelte.ts';

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
		state: stateProp,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();
	let element = $state<HTMLDivElement | null>(null);

	const name = $derived(controlName(field, { ariaLabel, ariaLabelledBy }));

	$effect(() => {
		if (element) warnIfUnnamed(element, 'ToggleButtons');
	});

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const currentState = $derived(stateProp ?? field?.state ?? FieldStates.None);
	const isError = $derived(fieldState.isError(currentState));

	provideToggleButtons({ hasSelection: () => Boolean(value) });
</script>

<ToggleGroup.Root
	type="single"
	bind:ref={element}
	bind:value={
		() => value ?? '',
		(next) => {
			if (next) value = next;
		}
	}
	disabled={isDisabled}
	aria-invalid={isError || undefined}
	aria-label={name['aria-label']}
	aria-labelledby={name['aria-labelledby']}
	aria-describedby={describedBy ?? field?.describedBy}
	id={id ?? field?.controlId ?? uid}
	class={['group button-group', extraClasses]}
	loop
	{...restProps}
>
	{#snippet child({ props })}
		<div {...props} role="radiogroup">
			{#if items}
				{#each items as item (item.value)}
					<Item value={item.value} disabled={item.disabled}>{item.label}</Item>
				{/each}
			{:else}
				{@render children?.()}
			{/if}
		</div>
	{/snippet}
</ToggleGroup.Root>
