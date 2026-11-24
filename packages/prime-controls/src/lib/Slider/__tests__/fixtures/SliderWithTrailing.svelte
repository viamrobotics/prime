<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import Slider from '../../Slider.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof Slider>, 'trailing'>;

	const props: Props = $props();
</script>

<Slider {...props}>
	{#snippet trailing()}
		<button type="button" class="shrink-0">Reset</button>
	{/snippet}
</Slider>
