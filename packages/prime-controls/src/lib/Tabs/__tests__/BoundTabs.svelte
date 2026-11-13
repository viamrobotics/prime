<script lang="ts">
	import { untrack } from 'svelte';

	import TabsHarness from './TabsHarness.svelte';

	let { initial }: { initial?: string } = $props();

	let value = $state(untrack(() => initial));
</script>

<TabsHarness bind:value />
<output data-testid="owner">{value}</output>
<button type="button" onclick={() => (value = 'scale')}>Pick scale</button>
