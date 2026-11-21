<script lang="ts">
	import { Chart } from '../chart.ts';

	interface Props {
		loading?: boolean;
	}

	let { loading = false }: Props = $props();
</script>

<Chart aria-label="Readings" {loading}>
	<Chart.Plot class="h-64">
		<Chart.XAxis />
		<Chart.YAxis />
	</Chart.Plot>
</Chart>
