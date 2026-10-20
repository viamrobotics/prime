<!--
@component
A native text input with the Viam border and padding. Inside a [`Field`](../Field/Field.svelte)
it takes its `id` (the field's `controlId`), `disabled`, `required`, `state`, and `aria-describedby` from there. An
`error` state sets `aria-invalid` and the error border. See [`Field`](../Field/Field.svelte) for
pairing it with a `Hint` or a `Field.StateIcon`.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Email</Label>
	<Input type="email" class="w-64" bind:value />
</Field>
```

To add an icon or a suffix, put the input in an [`Input.Group`](./InputGroup.svelte). See
[`Input.Group`](./InputGroup.svelte).

```svelte
<Field state="error">
	<Input.Group>
		<Input type="email" bind:value />
		<Field.StateIcon />
	</Input.Group>
</Field>
```
-->
<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';

	import type { FieldState } from '../Field/state.ts';

	import { useInputControl } from './useInputControl.svelte.ts';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'children' | 'type'> {
		/** The text in the input. */
		value?: string;

		/**
		 * Any native type whose value is a string. `number` and `range` bind a number, so they
		 * belong to [`NumberInput`](./NumberInput.svelte). `checkbox`, `radio`, and `file` bind
		 * something other than `value`. @default 'text'
		 */
		type?: Exclude<HTMLInputTypeAttribute, 'number' | 'range' | 'checkbox' | 'radio' | 'file'>;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		value = $bindable(),
		state,
		disabled,
		required,
		readonly,
		'aria-describedby': describedBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const control = useInputControl({
		id: () => id,
		disabled: () => disabled,
		required: () => required,
		readonly: () => readonly,
		state: () => state,
		describedBy: () => describedBy,
		extraClasses: () => extraClasses
	});
</script>

<input
	{...restProps}
	bind:value
	id={control.id}
	class={control.classes}
	disabled={control.disabled}
	required={control.required}
	{readonly}
	aria-describedby={control.describedBy}
	aria-invalid={control.invalid}
	data-state={control.dataState}
/>
