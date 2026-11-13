<!--
@component
The floating list of a [`Select`](./Select.svelte), portaled to the body. Render a [`Select.Viewport`](./SelectViewport.svelte) inside it.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.Content>;

	const { children, ...restProps }: Props = $props();
</script>

<Select.Content {...restProps}>
	{@render children?.()}
</Select.Content>
