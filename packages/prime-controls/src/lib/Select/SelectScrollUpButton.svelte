<!--
@component
A control that scrolls the open list up, for lists taller than the viewport.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.ScrollUpButton>;

	const { children, ...restProps }: Props = $props();
</script>

<Select.ScrollUpButton {...restProps}>
	{@render children?.()}
</Select.ScrollUpButton>
