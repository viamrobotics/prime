<!--
@component
One option of a [`ToggleButtons`](./ToggleButtons.svelte) group, at a tool panel's scale. Its children are
the option's content.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { ToggleButtons } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof ToggleButtons.Item> {}

	const { class: extraClasses, children, ...restProps }: Props = $props();
	// prime-ui's item sets the same properties with plain utilities of the same specificity, which win here unless these are important.
	const classes = $derived(['min-h-6 px-1.5! py-0.5! text-xs!', extraClasses]);
</script>

<ToggleButtons.Item class={classes} {...restProps}>
	{@render children?.()}
</ToggleButtons.Item>
