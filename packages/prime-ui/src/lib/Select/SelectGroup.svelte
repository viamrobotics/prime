<!--
@component
Groups related [`Select.Item`](./SelectItem.svelte)s, optionally labelled by a
[`Select.GroupHeading`](./SelectGroupHeading.svelte).
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	const { children, ...restProps }: Select.GroupProps = $props();
</script>

<Select.Group {...restProps}>
	{@render children?.()}
</Select.Group>
