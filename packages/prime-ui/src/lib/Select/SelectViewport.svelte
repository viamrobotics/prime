<!--
@component
The scrollable region inside a [`Select.Content`](./SelectContent.svelte) that
holds the items.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { class: extraClasses, children, ...restProps }: Select.ViewportProps = $props();
</script>

<Select.Viewport {...restProps} class={['p-1', extraClasses]}>
	{@render children?.()}
</Select.Viewport>
