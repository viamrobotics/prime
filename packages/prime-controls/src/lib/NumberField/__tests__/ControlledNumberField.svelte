<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import NumberField from '../NumberField.svelte';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'value' | 'accept'> & {
		initial?: number;
		accept?: boolean;
		record: (next: number | undefined) => void;
	};

	const { initial, accept = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (accept) value = next;
		}
	}
/>
<span data-testid="owner">{String(value)}</span>
