<!--
@component
The strip that holds a [`Tabs`](./Tabs.svelte) root's triggers. Give it an `aria-label` or
`aria-labelledby`.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import type { AccessibleName } from '../accessible-name.ts';

	import { Tabs } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends Omit<
		ComponentProps<typeof Tabs.List>,
		'label' | 'aria-label' | 'aria-labelledby'
	> {}

	const { class: extraClasses, children, ...restProps }: Props & AccessibleName = $props();
	const classes = $derived(['gap-2', extraClasses]);
</script>

<Tabs.List class={classes} {...restProps}>
	{@render children?.()}
</Tabs.List>
