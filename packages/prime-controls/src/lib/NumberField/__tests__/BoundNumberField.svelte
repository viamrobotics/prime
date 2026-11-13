<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import NumberField from '../NumberField.svelte';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'value'> & {
		initial?: number;
	};

	const { initial, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField {...rest} bind:value />
<span data-testid="owner">{String(value)}</span>
