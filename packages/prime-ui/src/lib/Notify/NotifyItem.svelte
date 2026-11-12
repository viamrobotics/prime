<!--
@component
One notification in a [`Notify`](./Notify.svelte) stack: a [`Banner`](../Banner/Banner.svelte) that
owns the live-region role, the stacking motion, and the bar along the bottom: progress while pending, the countdown after. The region renders it, so a
consumer never places one.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import { Banner } from '../Banner/banner.ts';
	import { notifyVariantOf, type NotifyMeta } from './useNotify.svelte.ts';

	interface Props {
		/** The notification to show, as the stack lists it. */
		item: toast.Props<string | Snippet>;
		/** Where the notification sits in the stack, newest first. */
		index: number;
		/** The stack machine this notification belongs to. */
		parent: toast.GroupService;
	}

	const COUNTDOWN_STEP_MS = 100;

	const { item, index, parent }: Props = $props();

	const service = useMachine(toast.machine, () => ({ ...item, parent, index }));
	const api = $derived(toast.connect(service, normalizeProps));

	// zag types every id as nullable, and the Banner parts take a string or nothing.
	const rootProps = $derived(api.getRootProps());
	const titleProps = $derived(api.getTitleProps());
	const descriptionProps = $derived(api.getDescriptionProps());
	const closeProps = $derived(api.getCloseTriggerProps());

	const variant = $derived(notifyVariantOf(api.type));
	const description = $derived(item.description);
	const meta = $derived(item.meta as NotifyMeta | undefined);
	const progress = $derived(variant === 'pending' ? meta?.progress : undefined);
	const duration = $derived(
		item.duration !== undefined && Number.isFinite(item.duration) ? item.duration : undefined
	);

	let elapsed = $state(0);
	const countdown = $derived(
		duration === undefined ? undefined : { max: duration, value: Math.max(duration - elapsed, 0) }
	);

	$effect(() => {
		if (duration === undefined) return;
		elapsed = 0;
		const timer = setInterval(() => {
			if (!api.paused) elapsed += COUNTDOWN_STEP_MS;
		}, COUNTDOWN_STEP_MS);
		return () => clearInterval(timer);
	});
</script>

<!-- zag's root role is always status, so it is dropped for the one Banner picks by variant. -->
<Banner
	{...rootProps}
	id={rootProps.id ?? undefined}
	role={undefined}
	{variant}
	class="z-[var(--z-index)] w-96 [translate:var(--x)_var(--y)] [scale:var(--scale)] opacity-[var(--opacity)] transition-[translate,scale,opacity] duration-300 will-change-[translate,opacity,scale]"
>
	<Banner.Title {...titleProps} id={titleProps.id ?? undefined}>{item.title}</Banner.Title>
	{#if description !== undefined}
		<Banner.Description {...descriptionProps} id={descriptionProps.id ?? undefined}>
			{#if typeof description === 'string'}
				{description}
			{:else}
				{@render description()}
			{/if}
		</Banner.Description>
	{/if}
	{#if meta?.actions}
		<Banner.Actions>{@render meta.actions()}</Banner.Actions>
	{/if}
	<Banner.Close {...closeProps} id={closeProps.id ?? undefined} aria-label="Dismiss" />
	{#if progress !== undefined}
		<Banner.Progress value={progress} label="Progress" />
	{:else if countdown}
		<Banner.Progress value={countdown.value} max={countdown.max} label="Time until dismissed" />
	{/if}
</Banner>
