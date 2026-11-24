<!--
@component
A checkbox with an optional indeterminate state. Inside a [`Field`](../Field/Field.svelte)
it takes its `id` (the field's `controlId`), `disabled`, `required`, `state`,
`aria-describedby`, and name from there.
An `error` state sets `aria-invalid` and colors the default icon. See
[`Field`](../Field/Field.svelte) for pairing it with a `Hint`.

Built on [bits-ui `Checkbox`](https://bits-ui.com/docs/components/checkbox).

```svelte
<Field label="Accept the terms" class="flex items-center gap-2">
	<Checkbox bind:checked />
	<Label />
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked } from '@mdi/js';
	import { Checkbox } from 'bits-ui';

	import { warnIfUnnamed } from '../accessible-name-warning.ts';
	import { fieldState, FieldStates, type FieldState } from '../Field/state.ts';
	import { controlName, useField } from '../Field/useField.svelte.ts';
	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children' | 'form' | 'value'> {
		/** Checked state. @default false */
		checked?: boolean;
		/** Indeterminate ("mixed") state. Wins over `checked` visually. @default false */
		indeterminate?: boolean;
		/** Value submitted when checked and a `name` is given. */
		value?: string;
		/** Mark the box required. With a `name`, the form does not submit until it is checked. Defaults to the enclosing field's `required`. */
		required?: boolean;
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
		/** Id of the form to submit with. bits-ui accepts a string only, so `null` is dropped. */
		form?: string;
		/** Custom content instead of the default icon. Receives `{ checked, indeterminate }`. */
		children?: Snippet<[{ checked: boolean; indeterminate: boolean }]>;
	}

	let {
		id,
		checked = $bindable(),
		indeterminate = $bindable(),
		disabled,
		required,
		state: stateProp,
		'aria-describedby': describedBy,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();
	let element = $state<HTMLButtonElement | null>(null);

	const name = $derived(controlName(field, { ariaLabel, ariaLabelledBy }));

	$effect(() => {
		if (element) warnIfUnnamed(element, 'Checkbox');
	});

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);

	const currentState = $derived(stateProp ?? field?.state ?? FieldStates.None);
	const isError = $derived(fieldState.isError(currentState));

	const isChecked = $derived(checked ?? false);
	const isIndeterminate = $derived(indeterminate ?? false);
	const boxIcon = $derived.by(() => {
		if (isIndeterminate) return mdiCheckboxIntermediate;
		if (isChecked) return mdiCheckboxMarked;
		return mdiCheckboxBlankOutline;
	});
</script>

<Checkbox.Root
	bind:ref={element}
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	bind:indeterminate={() => indeterminate ?? false, (next) => (indeterminate = next)}
	id={id ?? field?.controlId ?? uid}
	class={[
		'rounded-sm focus-ring',
		isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
		extraClasses
	]}
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isError || undefined}
	aria-describedby={describedBy ?? field?.describedBy}
	aria-label={name['aria-label']}
	aria-labelledby={name['aria-labelledby']}
	{...restProps}
>
	{#if children}
		{@render children({ checked: isChecked, indeterminate: isIndeterminate })}
	{:else}
		<Icon
			icon={boxIcon}
			class={{
				'text-disabled-dark': isDisabled,
				'text-danger-dark': !isDisabled && isError,
				'text-default': !isDisabled && !isError && (isChecked || isIndeterminate),
				'text-subtle-2': !isDisabled && !isError && !isChecked && !isIndeterminate
			}}
		/>
	{/if}
</Checkbox.Root>
