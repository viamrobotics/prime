<!--
@component
An on/off switch. Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's
`controlId`), `disabled`, `required`, `state`, and `aria-describedby` from there. An `error`
state sets `aria-invalid`. Always pair it with a `Label`.

Built on [bits-ui `Switch`](https://bits-ui.com/docs/components/switch).

```svelte
<Field class="flex items-center gap-2">
	<Switch bind:checked />
	<Label>Notifications</Label>
</Field>
```
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Switch } from 'bits-ui';

	import { fieldState, FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'children' | 'value'> {
		/** Checked (on) state. Two-way bindable. @default false */
		checked?: boolean;
		/** Value submitted when on and a `name` is given. */
		value?: string;
		/** Form field name. `null` is not accepted. */
		name?: string;
		/** Require the switch to be on for form submission. Defaults to the enclosing field's `required`. */
		required?: boolean;
		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		checked = $bindable(),
		disabled,
		required,
		state,
		'aria-describedby': describedBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const isDisabled = $derived(disabled ?? field?.disabled ?? false);
	const isRequired = $derived(required ?? field?.required ?? false);
	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
	const isError = $derived(fieldState.isError(currentState));
</script>

<Switch.Root
	bind:checked={() => checked ?? false, (next) => (checked = next)}
	id={id ?? field?.controlId ?? uid}
	class={[
		'inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 focus-ring',
		isDisabled
			? 'cursor-not-allowed bg-disabled-light data-[state=checked]:bg-disabled-dark'
			: 'cursor-pointer bg-gray-6 aria-invalid:bg-danger-light data-[state=checked]:bg-gray-9 aria-invalid:data-[state=checked]:bg-danger-dark',
		extraClasses
	]}
	disabled={isDisabled}
	required={isRequired}
	aria-invalid={isError || undefined}
	aria-describedby={describedBy ?? field?.describedBy}
	{...restProps}
>
	<Switch.Thumb
		class="pointer-events-none size-4 rounded-full bg-white transition-transform data-[state=checked]:translate-x-4"
	/>
</Switch.Root>
