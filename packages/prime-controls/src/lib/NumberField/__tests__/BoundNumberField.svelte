<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import NumberField from '../NumberField.svelte';

	interface Props extends Omit<ComponentProps<typeof NumberField>, 'value'> {
		initial?: number;
	}

	const { initial, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField {...rest} bind:value />
<span data-testid="owner">{String(value)}</span>
