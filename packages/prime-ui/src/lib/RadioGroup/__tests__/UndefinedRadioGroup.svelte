<script lang="ts">
	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';

	let value = $state<string>();
</script>

<RadioGroupRoot bind:value name="size">
	<RadioGroupItem value="sm">Small</RadioGroupItem>
	<RadioGroupItem value="md">Medium</RadioGroupItem>
	<RadioGroupItem value="lg">Large</RadioGroupItem>
</RadioGroupRoot>
<span data-testid="owner">{String(value)}</span>
