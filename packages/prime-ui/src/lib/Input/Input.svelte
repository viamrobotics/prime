<!--
@component
A native text input with the Viam border and padding. Inside a [`Field`](../Field/Field.svelte)
it takes its `id` (the field's `controlId`), `disabled`, `required`, `state`, `aria-describedby`, and its name from there. An
`error` state sets `aria-invalid` and the error border. See [`Field`](../Field/Field.svelte) for
pairing it with a `Hint` or a `Field.StateIcon`.

```svelte
<Field label="Email" class="flex flex-col gap-1">
	<Label />
	<Input type="email" class="w-64" bind:value />
</Field>
```

To add an icon or a suffix, put the input in an [`Input.Group`](./InputGroup.svelte).

```svelte
<Field label="Email" state="error">
	<Label />
	<Input.Group>
		<Input type="email" bind:value />
		<Field.StateIcon />
	</Input.Group>
</Field>
```
-->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import type { FieldState } from '../Field/state.ts';

	import { accessibleNameWarning } from '../accessible-name-warning.ts';
	import { useInputControl } from './useInputControl.svelte.ts';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'children' | 'type'> {
		/** The text in the input. */
		value?: string;

		/**
		 * A native type whose value is a string. Listed out, because Svelte's
		 * `HTMLInputTypeAttribute` admits any string. `number` and `range` bind a number, so they
		 * belong to [`NumberInput`](./NumberInput.svelte). `checkbox`, `radio`, and `file` bind
		 * something other than `value`. @default 'text'
		 */
		type?:
			| 'text'
			| 'email'
			| 'password'
			| 'search'
			| 'tel'
			| 'url'
			| 'date'
			| 'datetime-local'
			| 'month'
			| 'time'
			| 'week'
			| 'color'
			| 'hidden';

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
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		class: extraClasses,
		...restProps
	}: Props = $props();

	const control = useInputControl({
		id: () => id,
		disabled: () => disabled,
		required: () => required,
		state: () => state,
		describedBy: () => describedBy,
		ariaLabel: () => ariaLabel,
		ariaLabelledBy: () => ariaLabelledBy
	});
</script>

<input
	{...restProps}
	{...control.attributes}
	bind:value
	class={['input', extraClasses]}
	{readonly}
	{@attach accessibleNameWarning('Input')}
/>
