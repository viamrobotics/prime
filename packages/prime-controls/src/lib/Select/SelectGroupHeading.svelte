<!--
@component
The heading of a [`Select.Group`](./SelectGroup.svelte), at a tool panel's scale.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.GroupHeading> {}

	const { class: extraClasses, children, ...restProps }: Props = $props();
	const classes = $derived(['px-1.5 py-0.5', extraClasses]);
</script>

<Select.GroupHeading class={classes} {...restProps}>
	{@render children?.()}
</Select.GroupHeading>
