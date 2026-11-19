<!--
@component
A text input that filters a list of options as the user types and selects one of them. Render
[`Combobox.Input`](./ComboboxInput.svelte), [`Combobox.Trigger`](./ComboboxTrigger.svelte), and
[`Combobox.Content`](./ComboboxContent.svelte) inside it. Inside a
[`Field`](../Field/Field.svelte) it takes `disabled` and `required` from there.

Built on [bits-ui `Combobox`](https://bits-ui.com/docs/components/combobox).

```svelte
<Field class="flex flex-col gap-1">
	<Label>Region</Label>
	<Combobox bind:value items={regions}>
		<Input.Group>
			<Combobox.Input placeholder="Search regions" />
			<Combobox.Trigger />
		</Input.Group>
		<Combobox.Content>
			<Combobox.Viewport>
				<Combobox.Items />
				<Combobox.Empty>No matching region</Combobox.Empty>
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox>
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Combobox } from 'bits-ui';

	import type { SelectOption } from '../Select/option.ts';

	import { useField } from '../Field/useField.svelte.ts';
	import { matchesLabel, provideCombobox, type ComboboxFilter } from './useCombobox.svelte.ts';

	interface Props {
		/**
		 * The options. [`Combobox.Items`](./ComboboxItems.svelte) renders the ones the `filter`
		 * keeps for the typed text, and the input shows the selected entry's label.
		 */
		items?: SelectOption[];

		/** The selected value. Two-way bindable. */
		value?: string;

		/** The text typed since the list last opened, `''` while it is closed. Two-way bindable. */
		query?: string;

		/**
		 * Decides whether an option stays in the list for the typed text. The default keeps options
		 * whose label contains the trimmed text, ignoring case.
		 */
		filter?: ComboboxFilter;

		/** Name for form submission. */
		name?: string;

		/** Disable the combobox. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make selection required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Allow picking the selected item again to clear it. @default false */
		allowDeselect?: boolean;

		/** The `Combobox.*` parts. */
		children?: Snippet;
	}

	let {
		items,
		value = $bindable(),
		query = $bindable(),
		filter = matchesLabel,
		name,
		disabled,
		required,
		allowDeselect = false,
		children
	}: Props = $props();

	const field = useField();
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);

	let isOpen = $state(false);
	let isTyping = $state(false);

	let picked = $state<SelectOption>();

	// `items` may stop holding the selected option, as when they are fetched per query, so the label seen at selection stays.
	const label = $derived(
		items?.find((item) => item.value === value)?.label ??
			(picked?.value === value ? picked?.label : undefined) ??
			value ??
			''
	);
	const text = $derived(isTyping ? (query ?? '') : label);

	provideCombobox({
		items: () => items,
		filter: () => filter,
		query: {
			get: () => query ?? '',
			set: (next) => {
				query = next;
				isTyping = true;
				isOpen = true;
			}
		},
		text: () => text,
		required: () => isRequired
	});

	const select = (next: string) => {
		const option = items?.find((item) => item.value === next);
		value = next;
		if (value === next) picked = option;
	};

	const setOpen = (next: boolean) => {
		isOpen = next;
		isTyping = false;
		query = '';
	};
</script>

<Combobox.Root
	bind:value={() => value ?? '', select}
	bind:open={() => isOpen, setOpen}
	inputValue={text}
	{items}
	{name}
	{allowDeselect}
	disabled={isDisabled}
	required={isRequired}
	type="single"
>
	{@render children?.()}
</Combobox.Root>
