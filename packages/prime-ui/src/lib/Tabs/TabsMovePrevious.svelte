<!--
@component
A button that moves its tab one place toward the start of a `reorderable`
[`Tabs.List`](./TabsList.svelte), the pointer path beside a drag. Place it in the `actions`
snippet of a [`Tabs.Trigger`](./TabsTrigger.svelte). It is named `Move <label> left`, stays out
of the Tab order since Alt+Shift+ArrowLeft makes the same move, and is disabled where the tab
cannot move. Pass children to replace the chevron.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import TabsMoveButton from './TabsMoveButton.svelte';

	interface Props extends Omit<
		HTMLButtonAttributes,
		'type' | 'disabled' | 'tabindex' | 'aria-label' | 'aria-labelledby' | 'onclick'
	> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const props: Props = $props();
</script>

<TabsMoveButton step="previous" {...props} />
