<script lang="ts">
	import type { TabsVariant } from './variant.ts';

	import { useTabs } from './useTabs.svelte.ts';

	interface Props {
		label: string;
	}

	const { label }: Props = $props();

	const tabs = useTabs();

	// A file-style slot is a cell of the strip, so it carries the separator every tab draws on its right.
	const slotClasses: Record<TabsVariant, string> = {
		underline: 'mx-1 self-center',
		file: 'self-stretch border-r border-gray-3 px-1'
	};
</script>

<span
	data-tab-landing
	aria-hidden="true"
	inert
	class={['flex flex-none items-center', slotClasses[tabs?.variant ?? 'underline']]}
>
	<span class="rounded-sm bg-info-light px-2 py-0.5 text-xs whitespace-nowrap text-info-dark">
		{label}
	</span>
</span>
