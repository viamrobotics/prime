<!--
@component
A radio group. Compose options with [`RadioGroup.Item`](./RadioGroupItem.svelte).
Inside a [`Field`](../Field/Field.svelte) it takes `id`, `disabled`, `required`,
`aria-labelledby`, and `aria-describedby` from there.

Built on [bits-ui `RadioGroup`](https://bits-ui.com/docs/components/radio-group).

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

	import { useField } from '../Field/useField.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		/** The selected value. Two-way bindable. */
		value?: string;

		/** Render orientation. @default 'vertical' */
		orientation?: 'vertical' | 'horizontal';

		/** Name for form submission. */
		name?: string;

		/** Disable all options. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make selection required. Defaults to the enclosing field's `required`. */
		required?: boolean;
	}

	let {
		id,
		value = $bindable(''),
		orientation = 'vertical',
		name,
		disabled,
		required,
		'aria-labelledby': labelledBy,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const field = useField();
	const uid = $props.id();
</script>

<RadioGroup.Root
	bind:value
	{orientation}
	{name}
	disabled={disabled ?? field?.disabled ?? false}
	required={required ?? field?.required ?? false}
	aria-labelledby={labelledBy ?? field?.labelledBy}
	aria-describedby={describedBy ?? field?.describedBy}
	id={id ?? field?.id ?? uid}
	class={['flex', orientation === 'vertical' ? 'flex-col' : 'flex-row', extraClasses]}
	loop
	{...restProps}
>
	{@render children?.()}
</RadioGroup.Root>
