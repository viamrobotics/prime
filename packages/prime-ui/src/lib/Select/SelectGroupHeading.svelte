<!--
@component
A non-selectable heading for a [`Select.Group`](./SelectGroup.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Id of the element. bits-ui requires a string, so `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Select.GroupHeading
	class={['px-2 py-1.5 text-xs font-medium text-subtle-2', extraClasses]}
	{...restProps}
>
	{@render children?.()}
</Select.GroupHeading>
