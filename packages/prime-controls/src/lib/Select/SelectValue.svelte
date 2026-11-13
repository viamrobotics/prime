<!--
@component
The selected item's label inside [`Select.Trigger`](./SelectTrigger.svelte), or its `placeholder` when nothing is selected.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	type Props = ComponentProps<typeof Select.Value>;

	const props: Props = $props();
</script>

<Select.Value {...props} />
