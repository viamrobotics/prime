<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../../__tests__/fixtures/distributive-omit.ts';

	import NumberField from '../../NumberField.svelte';

	type Props = DistributiveOmit<ComponentProps<typeof NumberField>, 'trailing'>;

	const props: Props = $props();
</script>

<NumberField {...props}>
	{#snippet trailing()}
		<button type="button" class="shrink-0">Reset</button>
	{/snippet}
</NumberField>
