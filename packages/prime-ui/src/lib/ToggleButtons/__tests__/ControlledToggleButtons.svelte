<script lang="ts">
	import ToggleButtonsRoot from '../ToggleButtons.svelte';
	import ToggleButtonsItem from '../ToggleButtonsItem.svelte';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state('sm');
</script>

<ToggleButtonsRoot
	bind:value={
		() => value,
		(v) => {
			if (accept) value = v;
		}
	}
>
	<ToggleButtonsItem value="sm">Small</ToggleButtonsItem>
	<ToggleButtonsItem value="md">Medium</ToggleButtonsItem>
	<ToggleButtonsItem value="lg">Large</ToggleButtonsItem>
</ToggleButtonsRoot>
<span data-testid="owner">{value}</span>
