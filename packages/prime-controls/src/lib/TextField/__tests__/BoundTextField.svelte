<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { untrack } from 'svelte';

	import TextField from '../TextField.svelte';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

	type Props = DistributiveOmit<ComponentProps<typeof TextField>, 'value'> & {
		initial?: string;
	};

	const { initial = '', ...rest }: Props = $props();

	let value = $state(untrack(() => initial));
</script>

<TextField {...rest} bind:value />
<button type="button" onclick={() => (value = 'from outside')}>Write</button>
<span data-testid="owner">{JSON.stringify(value)}</span>
