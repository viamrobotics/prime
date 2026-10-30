<!--
@component
One option of a [`ToggleButtons`](./ToggleButtons.svelte) group. Its children are the option's
content.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { ToggleGroup } from 'bits-ui';

	interface Props extends Omit<HTMLButtonAttributes, 'value'> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The value the group holds when this option is selected. */
		value: string;
	}

	const { value, class: extraClasses, children, ...restProps }: Props = $props();
</script>

<ToggleGroup.Item
	{value}
	class={[
		'-ml-px inline-flex cursor-pointer items-center justify-center gap-1.5 border border-gray-6 px-3 py-1.5 text-sm whitespace-nowrap focus-ring transition-colors select-none first:ml-0 first:rounded-l-sm last:rounded-r-sm',
		'bg-medium text-subtle-1 hover:bg-gray-3 active:bg-gray-4',
		'data-[state=on]:bg-light data-[state=on]:font-semibold data-[state=on]:text-default data-[state=on]:hover:bg-light',
		'disabled:cursor-not-allowed disabled:border-disabled-light disabled:bg-disabled-light disabled:text-disabled-dark',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
</ToggleGroup.Item>
