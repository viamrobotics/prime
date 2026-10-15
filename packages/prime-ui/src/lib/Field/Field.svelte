<!--
@component
Groups a label, a control, and hints, and wires their ids and ARIA for you.

The parts read `id`, `disabled`, `required`, and `state` from here: `Label` points
`for` at the control, each `Hint` lands in the control's `aria-describedby`, and
`RadioGroup` is named by the label through `aria-labelledby`. A prop passed to a part
directly still wins.

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

	import type { InputState } from '../Input/state.ts';

	import { provideField, type FieldContext } from './useField.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Id for the control inside, not for this wrapper. Generated when omitted. */
		id?: string;

		/** Disable the control and dim the label and hints. @default false */
		disabled?: boolean;

		/** Mark the control required and show the asterisk on the label. @default false */
		required?: boolean;

		/** Contextual state shared with the control and hints. @default 'none' */
		state?: InputState;

		children?: Snippet<[FieldContext]>;
	}

	const { id, disabled = false, required = false, state, children, ...restProps }: Props = $props();

	const uid = $props.id();

	const field = provideField({
		id: () => id ?? uid,
		disabled: () => disabled,
		required: () => required,
		state: () => state
	});
</script>

<div {...restProps}>
	{@render children?.(field)}
</div>
