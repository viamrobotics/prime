<!--
@component
The strip that holds a [`Tabs`](./Tabs.svelte) root's triggers. Give it an `aria-label` or
`aria-labelledby`.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Tabs } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Tabs.List>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
	// prime-ui's utility sorts after this one in the stylesheet and wins unless this one is important.
	const classes = $derived(['gap-2!', extraClasses]);
</script>

<Tabs.List class={classes} {...restProps}>
	{@render children?.()}
</Tabs.List>
