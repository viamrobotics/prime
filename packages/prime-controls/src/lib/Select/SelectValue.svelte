<!--
@component
The selected item's label inside [`Select.Trigger`](./SelectTrigger.svelte), or its `placeholder` when nothing is selected.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Value> {}

	const props: Props = $props();
</script>

<Select.Value {...props} />
