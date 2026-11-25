<!--
@component
The panel a [`Tabs`](./Tabs.svelte) strip shows while the tab with the same `value` is
selected.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	import { useTabs } from './useTabs.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The tab this panel belongs to. */
		value: string;
	}

	const { value, class: extraClasses, children, ...restProps }: Props = $props();

	const tabs = useTabs();

	// A `$derived` notifies only when the string changes, not whenever the prop's source does.
	const registeredValue = $derived(value);

	$effect(() => tabs?.registerPanel(registeredValue));
</script>

<Tabs.Content {value} class={['focus-ring', extraClasses]} {...restProps}>
	{@render children?.()}
</Tabs.Content>
