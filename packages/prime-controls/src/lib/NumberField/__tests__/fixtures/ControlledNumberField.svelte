<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import { untrack } from 'svelte';

	import NumberField from '../../NumberField.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'value'> & {
		initial?: number;
		shouldAccept?: boolean;
		record: (next: number | undefined) => void;
	};

	const { initial, shouldAccept = false, record, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField
	{...rest}
	bind:value={
		() => value,
		(next) => {
			record(next);
			if (shouldAccept) value = next;
		}
	}
/>
<span data-testid="owner">{String(value)}</span>
