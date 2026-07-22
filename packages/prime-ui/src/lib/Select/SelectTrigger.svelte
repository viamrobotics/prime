<!--
@component
The button that opens a [`Select`](./Select.svelte). Inside a
[`Field`](../Field/Field.svelte) it takes the field's `id` and `aria-describedby`.

Add a [`Select.Value`](./SelectValue.svelte) child to show the current selection.

The trailing chevron is added for you.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	import { useField } from '../Field/useField.svelte.ts';
	import Icon from '../Icon/Icon.svelte';

	const {
		id,
		'aria-describedby': describedBy,
		class: extraClasses,
		children,
		...restProps
	}: Select.TriggerProps = $props();

	const field = useField();
</script>

<Select.Trigger
	{...restProps}
	id={id ?? field?.id}
	aria-describedby={describedBy ?? field?.describedBy}
	class={[
		'flex w-full items-center justify-between gap-2 rounded border border-light bg-white px-2 py-1.5 text-sm text-default transition-colors hover:border-gray-6 focus-visible:border-gray-9 focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:bg-disabled-light data-disabled:text-disabled-dark data-[state=open]:border-gray-9',
		extraClasses
	]}
>
	{@render children?.()}
	<Icon icon="chevron-down" size="sm" class="shrink-0 text-subtle-2" />
</Select.Trigger>
