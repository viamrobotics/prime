<script lang="ts">
	import ToggleButtonsRoot from '../../ToggleButtons.svelte';
	import ToggleButtonsItem from '../../ToggleButtonsItem.svelte';

	let value = $state<string>();
</script>

<ToggleButtonsRoot bind:value aria-label="Size">
	<ToggleButtonsItem value="sm">Small</ToggleButtonsItem>
	<ToggleButtonsItem value="md">Medium</ToggleButtonsItem>
	<ToggleButtonsItem value="lg">Large</ToggleButtonsItem>
</ToggleButtonsRoot>
<span data-testid="owner">{String(value)}</span>
