<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import Point from '../Point.svelte';
	import type { PointValue } from '../point.ts';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

	type Props = DistributiveOmit<ComponentProps<typeof Point>, 'value'> & {
		initial: PointValue;
	};

	const { initial, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<Point {...rest} bind:value />
<span data-testid="owner">{JSON.stringify(value)}</span>
