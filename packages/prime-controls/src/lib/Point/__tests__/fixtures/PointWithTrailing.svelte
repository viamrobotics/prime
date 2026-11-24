<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import Point from '../../Point.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof Point>, 'trailing'>;

	const props: Props = $props();
</script>

<Point {...props}>
	{#snippet trailing(axis)}
		<button type="button" class="shrink-0">Reset {axis}</button>
	{/snippet}
</Point>
