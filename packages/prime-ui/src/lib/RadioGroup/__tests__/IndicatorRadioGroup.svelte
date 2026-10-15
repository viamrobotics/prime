<script lang="ts">
	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';

	let value = $state('sm');
</script>

<RadioGroupRoot bind:value name="size">
	<RadioGroupItem value="sm">
		{#snippet indicator({ checked })}
			<span data-testid="indicator">{checked ? 'on' : 'off'}</span>
		{/snippet}
		Small
	</RadioGroupItem>
	<RadioGroupItem value="md">Medium</RadioGroupItem>
</RadioGroupRoot>
