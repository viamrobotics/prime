<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import { untrack } from 'svelte';

	import Slider from '../../Slider.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof Slider>, 'value'> & {
		initial?: number;
	};

	const { initial = 0, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<Slider {...rest} bind:value />
<span data-testid="owner">{value}</span>
