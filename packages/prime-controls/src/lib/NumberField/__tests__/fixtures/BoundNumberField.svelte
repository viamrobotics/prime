<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import { untrack } from 'svelte';

	import NumberField from '../../NumberField.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'value'> & {
		initial?: number;
	};

	const { initial, ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<NumberField {...rest} bind:value />
<span data-testid="owner">{String(value)}</span>
