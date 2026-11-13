<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import Slider from '../Slider.svelte';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

	type Props = DistributiveOmit<ComponentProps<typeof Slider>, 'value'> & {
		initial?: number;
	};

	const { initial = 0, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<Slider {...rest} bind:value />
<span data-testid="owner">{value}</span>
