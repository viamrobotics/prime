<!--
@component
One option of a [`ToggleButtons`](./ToggleButtons.svelte) group, at a tool panel's scale. Its children are
the option's content.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { ToggleButtons } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof ToggleButtons.Item>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
	// prime-ui's utility sorts after this one in the stylesheet and wins unless this one is important.
	const classes = $derived(['min-h-6 px-1.5! py-0.5! text-xs!', extraClasses]);
</script>

<ToggleButtons.Item class={classes} {...restProps}>
	{@render children?.()}
</ToggleButtons.Item>
