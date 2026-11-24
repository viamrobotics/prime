<script lang="ts">
	import NumberField from '../../NumberField.svelte';
</script>

<NumberField label="Length" value={1}>
	{#snippet trailing()}
		<span class="h-8 w-4 shrink-0"></span>
	{/snippet}
</NumberField>
