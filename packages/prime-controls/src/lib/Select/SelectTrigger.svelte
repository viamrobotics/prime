<!--
@component
The button that opens a [`Select`](./Select.svelte), at a tool panel's scale. Its children are usually a
[`Select.Value`](./SelectValue.svelte).
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Trigger> {}

	const { class: extraClasses, children, ...restProps }: Props = $props();
	const classes = $derived(['input-compact min-h-6', extraClasses]);
</script>

<Select.Trigger class={classes} {...restProps}>
	{@render children?.()}
</Select.Trigger>
