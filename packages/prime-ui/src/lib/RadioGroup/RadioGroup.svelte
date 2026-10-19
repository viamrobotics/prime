<!--
@component
A radio group. Compose options with [`RadioGroup.Item`](./RadioGroupItem.svelte).
Inside a [`Field`](../Field/Field.svelte) it takes its `id` (the field's
`controlId`), `disabled`, `required`, `state`, `aria-labelledby`, and `aria-describedby`
from there. An `error` state sets
`aria-invalid` and colors the items' default icons. See [`Field`](../Field/Field.svelte) for pairing it
with a `Hint`.

Built on [bits-ui `RadioGroup`](https://bits-ui.com/docs/components/radio-group).

Focus never lands on the group `<div>`, and `focus` and `blur` do not bubble. To observe
focus, set `onfocusin` and `onfocusout` on `RadioGroup`, or `onfocus` and `onblur` on an
item.

```svelte
<Field class="flex flex-col gap-1">
	<Label>Size</Label>
	<RadioGroup bind:value name="size">
		<RadioGroup.Item value="sm">Small</RadioGroup.Item>
		<RadioGroup.Item value="md">Medium</RadioGroup.Item>
	</RadioGroup>
</Field>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { RadioGroup } from 'bits-ui';

	import { FieldStates, type FieldState } from '../Field/state.ts';
	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		/** The selected value. Two-way bindable. */
		value?: string;

		/** Direction the items are laid out. @default 'vertical' */
		orientation?: 'vertical' | 'horizontal';

		/** Name for form submission. */
		name?: string;

		/** Disable all options. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make selection required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Contextual state. Defaults to the enclosing field's `state`. */
		state?: FieldState;
	}

	let {
		id,
		value = $bindable(),
		orientation = 'vertical',
		name,
		disabled,
		required,
		state,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();

	const currentState = $derived(state ?? field?.state ?? FieldStates.None);
</script>

<RadioGroup.Root
	bind:value={() => value ?? '', (next) => (value = next)}
	{orientation}
	{name}
	disabled={disabled ?? field?.disabled ?? false}
	required={required ?? field?.required ?? false}
	aria-invalid={currentState === FieldStates.Error || undefined}
	aria-labelledby={labelledBy ?? field?.labelledBy}
	aria-describedby={describedBy ?? field?.describedBy}
	id={id ?? field?.controlId ?? uid}
	class={['group flex', orientation === 'vertical' ? 'flex-col' : 'flex-row', extraClasses]}
	loop
	{...restProps}
>
	{@render children?.()}
</RadioGroup.Root>
