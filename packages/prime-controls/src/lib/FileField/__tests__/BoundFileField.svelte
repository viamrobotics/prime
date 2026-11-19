<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../__tests__/distributive-omit.ts';

	import FileField from '../FileField.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof FileField>, 'value'>;

	const { ...rest }: Props = $props();

	let value = $state<File[]>([]);
</script>

<div style:width="320px">
	<FileField {...rest} bind:value />
</div>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
