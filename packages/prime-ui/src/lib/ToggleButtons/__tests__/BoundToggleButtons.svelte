<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import ToggleButtonsRoot from '../ToggleButtons.svelte';
	import ToggleButtonsItem from '../ToggleButtonsItem.svelte';

	type Props = Pick<
		ComponentProps<typeof ToggleButtonsRoot>,
		'disabled' | 'items' | 'state' | 'aria-labelledby' | 'aria-describedby'
	> & {
		itemDisabled?: boolean;
	};

	const { itemDisabled, state: fieldState, ...rest }: Props = $props();

	let value = $state('sm');
</script>

<ToggleButtonsRoot bind:value {...rest} state={fieldState}>
	<ToggleButtonsItem value="sm">Small</ToggleButtonsItem>
	<ToggleButtonsItem value="md" disabled={itemDisabled}>Medium</ToggleButtonsItem>
	<ToggleButtonsItem value="lg">Large</ToggleButtonsItem>
</ToggleButtonsRoot>
<span data-testid="owner">{value}</span>
