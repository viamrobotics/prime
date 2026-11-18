<!--
@component
A labelled set of items inside [`Select.Viewport`](./SelectViewport.svelte). Start it with a [`Select.GroupHeading`](./SelectGroupHeading.svelte).
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Group> {}

	const { children, ...restProps }: Props = $props();
</script>

<Select.Group {...restProps}>
	{@render children?.()}
</Select.Group>
