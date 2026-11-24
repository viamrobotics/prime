<!--
@component
Groups a label, a control, and hints, and wires their ids and ARIA for you.

A field requires a name: a `label`, an `aria-label`, or an `aria-labelledby` naming a visible
element. A `Label` with no children renders the `label` text where you place it. With no
`Label` placed, the control takes the `label` or `aria-label` as its `aria-label`, or the
`aria-labelledby` as its own. The name never lands on the wrapper.

The parts read the control id, `disabled`, `required`, and `state` from the field.
`Label` points `for` at the control, and the control takes `aria-labelledby` from the labels.
Each `Hint` joins the control's `aria-describedby`.
[`Field.StateIcon`](./StateIcon.svelte) shows the state. A prop passed to a part directly
still wins.

An `error` state sets `aria-invalid` on the control and changes its color. Color is never
the only signal, so pair it with a `Hint` that says what is wrong, or with
`Field.StateIcon`.

```svelte
<Field label="Email" class="flex flex-col gap-1" required state="error">
	<Label />
	<Input type="email" bind:value />
	<Hint>We'll never share it.</Hint>
	<Hint>Enter a valid address.</Hint>
</Field>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import type { AccessibleName } from '../accessible-name.ts';
	import type { FieldContext } from './context.ts';
	import type { FieldState } from './state.ts';

	import { provideField } from './useField.svelte.ts';

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'children' | 'aria-label' | 'aria-labelledby'
	> {
		/** Id the field assigns to the control inside. Generated when omitted. `id` lands on this wrapper. */
		controlId?: string;

		/** Disable the control and dim the label and hints. @default false */
		disabled?: boolean;

		/** Mark the control required and show the asterisk on the label. @default false */
		required?: boolean;

		/** Contextual state shared with the control and hints. @default 'none' */
		state?: FieldState;

		/** The parts. Receives the field context, with `controlId`, `disabled`, `required`, `state`, and the name. */
		children?: Snippet<[FieldContext]>;
	}

	const {
		controlId,
		disabled = false,
		required = false,
		state,
		label,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		children,
		...restProps
	}: Props & AccessibleName = $props();

	const uid = $props.id();

	const field = provideField({
		controlId: () => controlId ?? uid,
		disabled: () => disabled,
		required: () => required,
		state: () => state,
		labelText: () => label,
		ariaLabel: () => ariaLabel,
		ariaLabelledBy: () => ariaLabelledBy
	});
</script>

<div {...restProps}>
	{@render children?.(field)}
</div>
