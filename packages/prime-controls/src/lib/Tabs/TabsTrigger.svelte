<!--
@component
One tab of a [`Tabs`](./Tabs.svelte) strip. Its children are the tab's label.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Tabs } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Tabs.Trigger>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
	// prime-ui's utility sorts after this one in the stylesheet and wins unless this one is important.
	const classes = $derived(['min-h-6 pt-1! pb-0.5! text-xs', extraClasses]);
</script>

<Tabs.Trigger class={classes} {...restProps}>
	{@render children?.()}
</Tabs.Trigger>
