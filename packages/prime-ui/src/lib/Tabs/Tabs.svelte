<!--
@component
A tab strip with one panel per tab. Compose it from [`Tabs.List`](./TabsList.svelte) holding
one [`Tabs.Trigger`](./TabsTrigger.svelte) per tab, and one
[`Tabs.Content`](./TabsContent.svelte) per tab. The first tab is selected until the user picks
another, and a selection whose tab is gone falls back to the first.

Built on [bits-ui `Tabs`](https://bits-ui.com/docs/components/tabs).

```svelte
<Tabs bind:value>
	<Tabs.List aria-label="Details">
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="usage">Usage</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">…</Tabs.Content>
	<Tabs.Content value="usage">…</Tabs.Content>
</Tabs>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	import { provideTabs } from './useTabs.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The selected tab's `value`. Two-way bindable. Defaults to the first tab's. */
		value?: string;
	}

	let { value = $bindable(), children, ...restProps }: Props = $props();

	const tabs = provideTabs({ value: () => value });
</script>

<Tabs.Root bind:value={() => tabs.value ?? '', (next) => (value = next)} {...restProps}>
	{@render children?.()}
</Tabs.Root>
