<script lang="ts">
	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state('sm');
</script>

<RadioGroupRoot
	bind:value={
		() => value,
		(v) => {
			if (accept) value = v;
		}
	}
	name="size"
>
	<RadioGroupItem value="sm">Small</RadioGroupItem>
	<RadioGroupItem value="md">Medium</RadioGroupItem>
	<RadioGroupItem value="lg">Large</RadioGroupItem>
</RadioGroupRoot>
<span data-testid="owner">{value}</span>
