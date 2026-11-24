<!--
@component
One option of a [`Select`](./Select.svelte), at a tool panel's scale. Without children it shows its label
and a check when selected.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Item> {}

	const { class: extraClasses, ...restProps }: Props = $props();
	const classes = $derived(['min-h-6 px-1.5 py-0.5 text-xs', extraClasses]);
</script>

<Select.Item class={classes} {...restProps} />
