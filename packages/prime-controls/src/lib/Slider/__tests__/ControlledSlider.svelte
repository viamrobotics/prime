<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import Slider from '../Slider.svelte';

	interface Props extends Omit<ComponentProps<typeof Slider>, 'value'> {
		initial?: number;
		accept?: boolean;
		record: (next: number) => void;
	}

	const { initial = 0, accept = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<Slider
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (accept) value = next;
		}
	}
/>
<span data-testid="owner">{value}</span>
