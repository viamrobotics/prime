<!--
@component
A checkbox with an optional indeterminate state. Inside a [`Field`](../Field/Field.svelte)
it takes its `id` (the field's `controlId`), `disabled`, `required`, `state`, and
`aria-describedby` from there.
An `error` state sets `aria-invalid` and colors the default icon. See
[`Field`](../Field/Field.svelte) for pairing it with a `Hint`.

Built on [bits-ui `Checkbox`](https://bits-ui.com/docs/components/checkbox).

```svelte
<Field class="flex items-center gap-2">
	<Checkbox bind:checked />
	<Label>Accept the terms</Label>
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiCheckboxBlankOutline, mdiCheckboxIntermediate, mdiCheckboxMarked } from '@mdi/js';
	import { Checkbox } from 'bits-ui';

	import { fieldState, FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';
	import { FOCUS_RING } from '../focus-ring.ts';
	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children' | 'value'> {
		/** Checked state. @default false */
		checked?: boolean;
		/** Indeterminate ("mixed") state. Wins over `checked` visually. @default false */
		indeterminate?: boolean;
		/** Value submitted when checked. */
		value?: string;
		/** Require the box to be checked for form submission. Defaults to the enclosing field's `required`. */
		required?: boolean;
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
		/** Custom content instead of the default icon. Receives `{ checked, indeterminate }`. */
		children?: Snippet<[{ checked: boolean; indeterminate: boolean }]>;
	}

	let {
		id,
		checked = $bindable(),
		indeterminate = $bindable(),
		disabled,
		required,
		state,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);

	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
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
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	bind:indeterminate={() => indeterminate ?? false, (next) => (indeterminate = next)}
	id={id ?? field?.controlId ?? uid}
	class={[
		'rounded-sm',
		FOCUS_RING,
		isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
		extraClasses
	]}
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isError || undefined}
	aria-describedby={describedBy ?? field?.describedBy}
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
