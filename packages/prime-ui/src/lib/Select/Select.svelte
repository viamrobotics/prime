<!--
@component
A select. Composed from the other `Select.*` parts. Inside a
[`Field`](../Field/Field.svelte) it takes `disabled` and `required` from there, and
[`Select.Trigger`](./SelectTrigger.svelte) takes the field's `id` and `aria-describedby`.

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
					{#each sizes as size (size.value)}
						<Select.Item value={size.value} label={size.label} />
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select>
</Field>
```
-->
<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends Omit<HTMLSelectAttributes, 'value' | 'onchange'> {
		/**
		 * The options.
		 *
		 * bits-ui resolves the trigger's selected label from here while the list is closed.
		 */
		items?: { value: string; label: string; disabled?: boolean }[];

		/** The selected value. Two-way bindable. */
		value?: string;

		/** Name for form submission. */
		name?: string;

		/** Disable the select. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make selection required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Allow clicking the selected item again to clear it. */
		allowDeselect?: boolean;
	}

	let {
		items,
		value = $bindable(''),
		allowDeselect = false,
		disabled,
		required,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
</script>

<Select.Root
	bind:value
	{items}
	{allowDeselect}
	disabled={disabled ?? field?.disabled ?? false}
	required={required ?? field?.required ?? false}
	{...restProps}
	type="single"
>
	{@render children?.()}
</Select.Root>
