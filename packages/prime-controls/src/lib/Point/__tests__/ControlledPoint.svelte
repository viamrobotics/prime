<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import Point from '../Point.svelte';
	import type { PointValue } from '../point.ts';

	interface Props extends Omit<ComponentProps<typeof Point>, 'value' | 'accept'> {
		initial: PointValue;
		accept?: boolean;
		record: (next: PointValue) => void;
	}

	const { initial, accept = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<Point
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (accept) value = next;
		}
	}
/>
<span data-testid="owner">{JSON.stringify(value)}</span>
