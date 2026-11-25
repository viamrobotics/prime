<script lang="ts">
	import { onMount } from 'svelte';

	import { useMapLibre, type MapLibreContext } from '../../useMapLibre.svelte.ts';

	interface Props {
		onContext?: (context: MapLibreContext) => void;
	}

	const { onContext }: Props = $props();

	const context = useMapLibre();

	onMount(() => {
		onContext?.(context);
	});
</script>

<output data-testid="zoom">{context.zoom}</output>
<output data-testid="lng">{context.center.lng}</output>
<output data-testid="provider">{context.mapProvider}</output>
<output data-testid="satellite">{context.satellite}</output>
<output data-testid="width">{context.size.width}</output>
