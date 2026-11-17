<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Point from '../Point.svelte';
	import type { PointAxis } from '../point.ts';

	type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
		? Omit<TProps, TKey>
		: never;

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
