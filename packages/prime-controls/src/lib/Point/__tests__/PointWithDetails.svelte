<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { DistributiveOmit } from '../../__tests__/distributive-omit.ts';

	import Point from '../Point.svelte';
	import type { PointAxis } from '../point.ts';

	type Props = DistributiveOmit<ComponentProps<typeof Point>, 'details' | 'axes'> & {
		/** The axis that gets a message under it, which then describes that field. */
		messageAxis?: PointAxis;
	};

	const { messageAxis, ...rest }: Props = $props();

	const messageId = $props.id();
</script>

<Point {...rest} axes={messageAxis ? { [messageAxis]: { describedBy: messageId } } : undefined}>
	{#snippet details(axis)}
		<button type="button">Reset {axis}</button>
		{#if axis === messageAxis}
			<span id={messageId}>Moved since your edit</span>
		{/if}
	{/snippet}
</Point>
