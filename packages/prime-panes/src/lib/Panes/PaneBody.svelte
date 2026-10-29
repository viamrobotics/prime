<script lang="ts">
	import { untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { usePane } from './usePanes.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'> {
		/**
		 * The pane's body, apart from the header that holds its `Panes.TabList`. Its rect sets the
		 * pane's edge and center drop regions, and a pane without one uses the whole pane. In a stacked
		 * pane with a `TabList` this region becomes the tab panel the `TabList` controls, labeled by the
		 * active tab. Elsewhere it renders a plain `div`.
		 */
		children: Snippet;
	}

	const { children, ...rest }: Props = $props();

	const pane = usePane();

	const isTabPanel = $derived(pane.stack !== undefined && pane.hasTabList);

	const registerBody: Attachment<HTMLElement> = (body) => untrack(() => pane.registerBody(body));

	$effect(() => pane.registerPanel());
</script>

<div
	{...rest}
	id={pane.stack ? pane.panelId(pane.paneId) : rest.id}
	role={isTabPanel ? 'tabpanel' : undefined}
	aria-labelledby={isTabPanel ? pane.tabId(pane.paneId) : rest['aria-labelledby']}
	{@attach registerBody}
>
	{@render children()}
</div>
