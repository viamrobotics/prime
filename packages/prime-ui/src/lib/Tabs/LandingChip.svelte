<script lang="ts">
	import type { TabsVariant } from './variant.ts';

	import { useTabs } from './useTabs.svelte.ts';
	import { DEFAULT_TABS_VARIANT } from './variant.ts';

	interface Props {
		label: string;
	}

	const { label }: Props = $props();

	const tabs = useTabs();

	const slotClasses: Record<TabsVariant, string> = {
		underline: 'mx-1 flex flex-none items-center self-center',
		file: 'file-tab-slot'
	};
</script>

<span
	data-tab-landing
	aria-hidden="true"
	inert
	class={slotClasses[tabs?.variant ?? DEFAULT_TABS_VARIANT]}
>
	<span class="rounded-sm bg-info-light px-2 py-0.5 text-xs whitespace-nowrap text-info-dark">
		{label}
	</span>
</span>
