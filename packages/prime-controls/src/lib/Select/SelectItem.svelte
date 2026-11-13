<!--
@component
One option of a [`Select`](./Select.svelte), at a tool panel's scale. Without children it shows its label
and a check when selected.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.Item>;

	const { class: extraClasses, ...restProps }: Props = $props();
	// prime-ui's utility sorts after this one in the stylesheet and wins unless this one is important.
	const classes = $derived(['min-h-6 px-1.5! py-0.5! text-xs!', extraClasses]);
</script>

<Select.Item class={classes} {...restProps} />
