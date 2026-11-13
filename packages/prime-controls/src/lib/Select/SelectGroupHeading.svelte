<!--
@component
The heading of a [`Select.Group`](./SelectGroup.svelte), at a tool panel's scale.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.GroupHeading>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
	// prime-ui's utility sorts after this one in the stylesheet and wins unless this one is important.
	const classes = $derived(['px-1.5! py-0.5! text-xs!', extraClasses]);
</script>

<Select.GroupHeading class={classes} {...restProps}>
	{@render children?.()}
</Select.GroupHeading>
