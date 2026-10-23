<script lang="ts">
	import { onMount } from 'svelte';

	import { useSplitView } from '../useSplitView.svelte.ts';
	import type { UpdateProbe } from './update-probe.ts';

	interface Props {
		probe: UpdateProbe;
	}

	const { probe }: Props = $props();

	const context = useSplitView();

	onMount(() => {
		probe.update = context.update;
	});
</script>
