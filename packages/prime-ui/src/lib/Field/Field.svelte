<!--
@component
Groups a label, a control, and hints, and wires their ids and ARIA for you.

The parts read the control id, `disabled`, `required`, and `state` from the field.
`Label` points `for` at the control. Each `Hint` joins the control's `aria-describedby`.
`RadioGroup` takes `aria-labelledby` from the labels.
[`Field.StateIcon`](./StateIcon.svelte) shows the state. A prop passed to a part directly
still wins.

An `error` state sets `aria-invalid` on the control and changes its color. Color is never
the only signal, so pair it with a `Hint` that says what is wrong, or with
`Field.StateIcon`.

```svelte
<Field class="flex flex-col gap-1" required state="error">
	<Label>Email</Label>
	<Input type="email" bind:value />
	<Hint>We'll never share it.</Hint>
	<Hint>Enter a valid address.</Hint>
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import type { FieldState } from './state.ts';

	import { provideField, type FieldContext } from './useField.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Id the field assigns to the control inside. Generated when omitted. `id` lands on this wrapper. */
		controlId?: string;

		/** Disable the control and dim the label and hints. @default false */
		disabled?: boolean;

		/** Mark the control required and show the asterisk on the label. @default false */
		required?: boolean;

		/** Contextual state shared with the control and hints. @default 'none' */
		state?: FieldState;

		/** The parts. Receives the field context, with `controlId`, `disabled`, `required`, and `state`. */
		children?: Snippet<[FieldContext]>;
	}

	const {
		controlId,
		disabled = false,
		required = false,
		state,
		children,
		...restProps
	}: Props = $props();

	const uid = $props.id();

	const field = provideField({
		controlId: () => controlId ?? uid,
		disabled: () => disabled,
		required: () => required,
		state: () => state
	});
</script>

<div {...restProps}>
	{@render children?.(field)}
</div>
