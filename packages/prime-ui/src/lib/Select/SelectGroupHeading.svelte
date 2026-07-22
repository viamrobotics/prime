<!--
@component
A non-selectable heading for a [`Select.Group`](./SelectGroup.svelte).
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { class: extraClasses, children, ...restProps }: Select.GroupHeadingProps = $props();
</script>

<Select.GroupHeading
	{...restProps}
	class={['px-2 py-1.5 text-xs font-medium text-subtle-2', extraClasses]}
>
	{@render children?.()}
</Select.GroupHeading>
