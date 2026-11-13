<!--
@component
The controls a [`Tabs`](./Tabs.svelte) strip shows while the tab with the same `value` is
selected.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Tabs } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Tabs.Content>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Tabs.Content class={['flex flex-col gap-1', extraClasses]} {...restProps}>
	{@render children?.()}
</Tabs.Content>
