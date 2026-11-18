<!--
@component
The floating list of a [`Select`](./Select.svelte), portaled to the body. Render a [`Select.Viewport`](./SelectViewport.svelte) inside it.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Content> {}

	const { children, ...restProps }: Props = $props();
</script>

<Select.Content {...restProps}>
	{@render children?.()}
</Select.Content>
