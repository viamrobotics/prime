<script lang="ts">
	import type { Snippet } from 'svelte';

	import { provideDateRangePickerFrame } from './useDateRangePicker.svelte.ts';

	interface Props {
		props: Record<string, unknown>;
		children?: Snippet;
	}

	const { props, children }: Props = $props();

	// A snippet cannot set context, so this component hands bits-ui's root attributes to `DateRangePicker.Field`, which renders the frame bits-ui wires as its root.
	provideDateRangePickerFrame(() => props);
</script>

{@render children?.()}
