<!--
@component
A control that scrolls the open list down, for lists taller than the viewport.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.ScrollDownButton>;

	const { children, ...restProps }: Props = $props();
</script>

<Select.ScrollDownButton {...restProps}>
	{@render children?.()}
</Select.ScrollDownButton>
