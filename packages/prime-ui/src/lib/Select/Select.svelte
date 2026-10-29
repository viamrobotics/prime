<!--
@component
A select. Render `Select.Trigger`, `Select.Portal`, `Select.Content`, `Select.Viewport`, and `Select.Items` inside it. Inside a
[`Field`](../Field/Field.svelte) it takes `disabled` and `required` from there.

Built on [bits-ui `Select`](https://bits-ui.com/docs/components/select).

```svelte
<Field class="flex flex-col gap-1">
	<Label>Size</Label>
	<Select bind:value items={sizes}>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
		<Select.Portal>
			<Select.Content>
				<Select.Viewport>
					<Select.Items />
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select>
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
		 * shows the selected entry's label. Typing while the list is closed selects the matching
		 * entry without opening it.
		 */
		items?: SelectOption[];

		/** The selected value. Two-way bindable. */
		value?: string;

		/** Name for form submission. */
		name?: string;

		/** Disable the select. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make selection required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Allow clicking the selected item again to clear it. @default false */
		allowDeselect?: boolean;

		/** The `Select.*` parts. */
		children?: Snippet;
	}

	let {
		items,
		value = $bindable(),
		name,
		allowDeselect = false,
		disabled,
		required,
		children
	}: Props = $props();

	const field = useField();
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);

	provideSelect({ items: () => items });
</script>

<Select.Root
	bind:value={() => value ?? '', (next) => (value = next)}
	{items}
	{name}
	{allowDeselect}
	disabled={isDisabled}
	required={required ?? field?.required ?? false}
	type="single"
>
	{@render children?.()}
</Select.Root>
