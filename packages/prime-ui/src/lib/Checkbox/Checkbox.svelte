<!--
@component
A checkbox with an optional indeterminate state. Inside a [`Field`](../Field/Field.svelte)
it takes its `id`, `disabled`, `required`, and `aria-describedby` from there.

Built on [bits-ui `Checkbox`](https://bits-ui.com/docs/components/checkbox).

```svelte
<Field class="flex items-center gap-2">
	<Checkbox bind:checked />
	<Label>Accept the terms</Label>
</Field>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Checkbox } from 'bits-ui';

	import { useField } from '../Field/useField.svelte.ts';
	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** Checked state. @default false */
		checked?: boolean;
		/** Indeterminate ("mixed") state. Wins over `checked` visually. @default false */
		indeterminate?: boolean;
		/** Value submitted when checked. */
		value?: string;
		/** Require the box to be checked for form submission. Defaults to the enclosing field's `required`. */
		required?: boolean;
	}

	let {
		id,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		disabled,
		required,
		'aria-describedby': describedBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);

	const boxIcon = (isChecked: boolean, isIndeterminate: boolean) => {
		if (isIndeterminate) return 'checkbox-indeterminate';
		if (isChecked) return 'checkbox-marked';
		return 'checkbox-blank-outline';
	};
</script>

<Checkbox.Root
	bind:checked
	bind:indeterminate
	id={id ?? field?.id ?? uid}
	class={[
		'rounded outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-power-button-dark',
		isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
		extraClasses
	]}
	disabled={isDisabled}
	required={isRequired}
	aria-describedby={describedBy ?? field?.describedBy}
	{...restProps}
>
	{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
		<Icon
			icon={boxIcon(isChecked, isIndeterminate)}
			size="lg"
			class={{
				'text-disabled-dark': isDisabled,
				'text-default': !isDisabled && (isChecked || isIndeterminate),
				'text-subtle-2': !isDisabled && !isChecked && !isIndeterminate
			}}
		/>
	{/snippet}
</Checkbox.Root>
