<script lang="ts">
	import { type ComponentProps, untrack } from 'svelte';

	import ToggleButtonsRoot from '../../ToggleButtons.svelte';
	import ToggleButtonsItem from '../../ToggleButtonsItem.svelte';

	type Props = Pick<
		ComponentProps<typeof ToggleButtonsRoot>,
		'disabled' | 'items' | 'state' | 'aria-labelledby' | 'aria-describedby'
	> & {
		itemDisabled?: boolean;
		initial?: string;
	};

	const { itemDisabled, initial = 'sm', state: fieldState, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<ToggleButtonsRoot bind:value aria-label="Size" {...rest} state={fieldState}>
	<ToggleButtonsItem value="sm">Small</ToggleButtonsItem>
	<ToggleButtonsItem value="md" disabled={itemDisabled}>Medium</ToggleButtonsItem>
	<ToggleButtonsItem value="lg">Large</ToggleButtonsItem>
</ToggleButtonsRoot>
<span data-testid="owner">{value}</span>
