<script lang="ts">
	import { Chart } from '../chart.ts';
</script>

<div style:width="400px" style:height="200px">
	<Chart aria-label="Readings">
		{#snippet empty()}
			<span>Nothing recorded</span>
		{/snippet}
	</Chart>
</div>
