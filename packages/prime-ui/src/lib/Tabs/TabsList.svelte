<!--
@component
The strip that holds a [`Tabs`](./Tabs.svelte) root's triggers. Give it an `aria-label` or
`aria-labelledby`. A strip with one tab is a bar with nothing to switch between, so render it
only when there are two or more. Under the root's `file` variant it is a single row that
scrolls sideways and never wraps.

With `reorderable`, Alt+Shift+ArrowLeft and Alt+Shift+ArrowRight move the focused tab one place,
dragging a tab drops it where the pointer lets go, and either writes the new strip order to
`order`. Render the triggers from `order` in a keyed `{#each}`.

```svelte
<Tabs.List aria-label="Files" reorderable bind:order>
	{#each order as id (id)}
		<Tabs.Trigger value={id}>{names[id]}</Tabs.Trigger>
	{/each}
</Tabs.List>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	import type { TabsVariant } from './variant.ts';

	import LandingChip from './LandingChip.svelte';
	import { useTabs } from './useTabs.svelte.ts';
	import { provideTabsDrag } from './useTabsDrag.svelte.ts';
	import { provideTabsReorder } from './useTabsReorder.svelte.ts';
	import { DEFAULT_TABS_VARIANT } from './variant.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** Let the keyboard and the pointer move tabs within the strip. @default false */
		reorderable?: boolean;
		/** The tab values in strip order. Two-way bindable. A move writes a new array here, and a function binding can refuse it. Defaults to the triggers' mount order. */
		order?: string[];
	}

	let {
		reorderable = false,
		order = $bindable(),
		class: extraClasses,
		children,
		...restProps
	}: Props = $props();

	const tabs = useTabs();

	const reorder = provideTabsReorder({
		reorderable: () => reorderable,
		order: { get: () => order, set: (next) => (order = next) },
		registered: () => tabs?.triggers ?? []
	});

	const drag = provideTabsDrag(reorder);

	const GHOST_OFFSET_PX = 12;

	const listClasses: Record<TabsVariant, string> = {
		underline: 'underline-tabs',
		file: 'file-tabs'
	};
</script>

<Tabs.List
	class={[listClasses[tabs?.variant ?? DEFAULT_TABS_VARIANT], extraClasses]}
	{...restProps}
>
	{@render children?.()}
	{#if drag.isChipAtEnd}
		<LandingChip label={drag.label} />
	{/if}
</Tabs.List>
{#if reorderable}
	<div role="status" class="sr-only">{reorder.announcement}</div>
{/if}
{#if drag.lifted !== undefined}
	<div
		data-tab-ghost
		aria-hidden="true"
		inert
		class="pointer-events-none fixed top-0 left-0 z-overlay w-max rounded-sm border border-medium bg-white px-2 py-1 text-xs whitespace-nowrap text-default shadow-sm"
		style:translate="{drag.point.x + GHOST_OFFSET_PX}px {drag.point.y + GHOST_OFFSET_PX}px"
	>
		{drag.label}
	</div>
{/if}
