<!--
@component
Shares the range field's root attributes with [`DateRangePicker.Field`](./DateRangePickerField.svelte),
so the field's frame is the element bits-ui wires as its root.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { provideDateRangePickerFrame } from './useDateRangePicker.svelte.ts';

	interface Props {
		/** The attributes bits-ui computes for the range field's root element. */
		props: Record<string, unknown>;

		/** The `DateRangePicker.*` parts. */
		children?: Snippet;
	}

	const { props, children }: Props = $props();

	provideDateRangePickerFrame(() => props);
</script>

{@render children?.()}
