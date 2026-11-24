<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import { untrack } from 'svelte';

	import NumberField from '../../NumberField.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'value'> & {
		initial: number;
		filter: (next: number) => number | undefined;
		record: (next: number | undefined) => void;
	};

	const { initial, filter, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (next === undefined) return;
			const accepted = filter(next);
			if (accepted !== undefined) value = accepted;
		}
	}
/>
<span data-testid="owner">{String(value)}</span>
