<!--
@component
A labelled set of items inside [`Select.Viewport`](./SelectViewport.svelte). Start it with a [`Select.GroupHeading`](./SelectGroupHeading.svelte).
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.Group>;

	const { children, ...restProps }: Props = $props();
</script>

<Select.Group {...restProps}>
	{@render children?.()}
</Select.Group>
