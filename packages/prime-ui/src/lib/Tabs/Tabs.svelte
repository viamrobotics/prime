<!--
@component
A tab strip with one panel per tab. Compose it from [`Tabs.List`](./TabsList.svelte) holding
one [`Tabs.Trigger`](./TabsTrigger.svelte) per tab, and one
[`Tabs.Content`](./TabsContent.svelte) per tab. With no `value`, or a `value` that names no tab,
the leftmost tab is selected.

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

	import type { TabsVariant } from './variant.ts';

	import { provideTabs } from './useTabs.svelte.ts';
	import { DEFAULT_TABS_VARIANT } from './variant.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The selected tab's `value`. Two-way bindable. Defaults to the leftmost tab's. */
		value?: string;

		/** The strip's look. `file` is compact, boxed tabs like an editor's file tabs. @default 'underline' */
		variant?: TabsVariant;
	}

	let {
		value = $bindable(),
		variant = DEFAULT_TABS_VARIANT,
		children,
		...restProps
	}: Props = $props();

	const tabs = provideTabs({ value: () => value, variant: () => variant });
</script>

<Tabs.Root bind:value={() => tabs.value ?? '', (next) => (value = next)} {...restProps}>
	{@render children?.()}
</Tabs.Root>
