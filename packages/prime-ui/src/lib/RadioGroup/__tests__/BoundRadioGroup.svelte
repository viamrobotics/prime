<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import RadioGroupRoot from '../RadioGroup.svelte';
	import RadioGroupItem from '../RadioGroupItem.svelte';

	type Props = Pick<
		ComponentProps<typeof RadioGroupRoot>,
		'disabled' | 'name' | 'orientation' | 'state'
	>;

	const { disabled, name, orientation, state: fieldState }: Props = $props();

	let value = $state('sm');
</script>

<RadioGroupRoot bind:value {name} {disabled} {orientation} state={fieldState}>
	<RadioGroupItem value="sm">Small</RadioGroupItem>
	<RadioGroupItem value="md">Medium</RadioGroupItem>
	<RadioGroupItem value="lg">Large</RadioGroupItem>
</RadioGroupRoot>
<span data-testid="owner">{value}</span>
