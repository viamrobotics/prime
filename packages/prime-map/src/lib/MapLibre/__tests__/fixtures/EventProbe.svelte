<script lang="ts">
	import { useMapLibreEvent } from '../../useMapLibreEvent.svelte.ts';

	interface Props {
		onMove: () => void;
	}

	const { onMove }: Props = $props();

	useMapLibreEvent('move', () => onMove());
</script>
