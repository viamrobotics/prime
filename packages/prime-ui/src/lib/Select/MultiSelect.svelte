<!--
@component
A select that holds several values. Render `MultiSelect.Trigger`, `MultiSelect.Portal`, `MultiSelect.Content`,
`MultiSelect.Viewport`, and `MultiSelect.Items` inside it, the same parts a [`Select`](./Select.svelte) takes.
Picking an item toggles it and keeps the list open. The closed trigger shows the selected labels joined by commas,
and a `name` submits one hidden input per value. Inside a [`Field`](../Field/Field.svelte) it takes `disabled` and
`required` from there.

Built on [bits-ui `Select`](https://bits-ui.com/docs/components/select) with `type="multiple"`.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Toppings</Label>
	<MultiSelect bind:value items={toppings}>
		<MultiSelect.Trigger>
			<MultiSelect.Value placeholder="Pick toppings" />
		</MultiSelect.Trigger>
		<MultiSelect.Portal>
			<MultiSelect.Content>
				<MultiSelect.Viewport>
					<MultiSelect.Items />
				</MultiSelect.Viewport>
			</MultiSelect.Content>
		</MultiSelect.Portal>
	</MultiSelect>
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Select } from 'bits-ui';

	import type { SelectOption } from './option.ts';

	import { useField } from '../Field/useField.svelte.ts';
	import { provideSelect } from './useSelect.svelte.ts';

	interface Props {
		/**
		 * The options, and the single source of truth for the select.
		 * [`Select.Items`](./SelectItems.svelte) renders one option per entry. The closed trigger
		 * shows the selected entries' labels. Typing while the list is closed toggles the matching
		 * entry without opening it.
		 */
		items?: SelectOption[];

		/** The selected values, in the order they were picked. Two-way bindable. */
		value?: string[];

		/** Name for form submission. Submits one input per selected value. */
		name?: string;

		/** Disable the select. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Require at least one selection. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** The `MultiSelect.*` parts. */
		children?: Snippet;
	}

	let { items, value = $bindable(), name, disabled, required, children }: Props = $props();

	const field = useField();
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);

	provideSelect({ items: () => items });
</script>

<Select.Root
	bind:value={() => value ?? [], (next) => (value = next)}
	{items}
	{name}
	disabled={isDisabled}
	required={required ?? field?.required ?? false}
	type="multiple"
>
	{@render children?.()}
</Select.Root>
