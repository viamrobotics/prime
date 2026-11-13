<!--
@component
The scrollable area inside [`Select.Content`](./SelectContent.svelte). Render [`Select.Items`](./SelectItems.svelte), or items and groups by hand.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.Viewport>;

	const { children, ...restProps }: Props = $props();
</script>

<Select.Viewport {...restProps}>
	{@render children?.()}
</Select.Viewport>
