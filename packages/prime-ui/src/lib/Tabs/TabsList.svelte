<!--
@component
The strip that holds a [`Tabs`](./Tabs.svelte) root's triggers. Give it an `aria-label` or
`aria-labelledby`. A strip with one tab is a bar with nothing to switch between, so render it
only when there are two or more.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Tabs.List class={['flex gap-4 border-b border-medium', extraClasses]} {...restProps}>
	{@render children?.()}
</Tabs.List>
