<!--
@component
One notification in a [`Notify`](./Notify.svelte) stack. It owns the live-region role, the stacking
motion, and the countdown, and renders the `layout` snippet when given one, a
[`Banner`](../Banner/Banner.svelte) otherwise.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import { Banner } from '../Banner/banner.ts';
	import { notifyVariantOf, type NotifyItemState } from './useNotify.svelte.ts';

	interface Props {
		/** The notification to show, as the stack lists it. */
		item: toast.Props<string | Snippet>;
		/** Where the notification sits in the stack, newest first. */
		index: number;
		/** The stack machine this notification belongs to. */
		parent: toast.GroupService;
		/** Renders the notification's content in place of the default `Banner`. */
		layout?: Snippet<[NotifyItemState]>;
	}

	const COUNTDOWN_STEP_MS = 100;

	const { item, index, parent, layout }: Props = $props();

	const service = useMachine(toast.machine, () => ({ ...item, parent, index }));
	const api = $derived(toast.connect(service, normalizeProps));
	// zag types every id as nullable, and the Banner parts take a string or nothing.
	const titleProps = $derived(api.getTitleProps());
	const descriptionProps = $derived(api.getDescriptionProps());
	const closeProps = $derived(api.getCloseTriggerProps());

	const variant = $derived(notifyVariantOf(api.type));
	const bannerVariant = $derived(variant === 'pending' ? 'info' : variant);
	const role = $derived(variant === 'warning' || variant === 'danger' ? 'alert' : 'status');
	const description = $derived(item.description);
	const countdownDuration = $derived(
		item.duration !== undefined && Number.isFinite(item.duration) ? item.duration : undefined
	);

	let elapsed = $state(0);

	const itemState: NotifyItemState = $derived({
		id: service.prop('id'),
		variant,
		title: typeof item.title === 'string' ? item.title : '',
		description,
		remaining:
			countdownDuration === undefined ? undefined : Math.max(countdownDuration - elapsed, 0),
		duration: countdownDuration,
		paused: api.paused,
		dismiss: api.dismiss
	});

	$effect(() => {
		if (countdownDuration === undefined) return;
		elapsed = 0;
		const timer = setInterval(() => {
			if (!api.paused) elapsed += COUNTDOWN_STEP_MS;
		}, COUNTDOWN_STEP_MS);
		return () => clearInterval(timer);
	});
</script>

<div
	{...api.getRootProps()}
	{role}
	class="z-[var(--z-index)] w-96 [translate:var(--x)_var(--y)] [scale:var(--scale)] opacity-[var(--opacity)] transition-[translate,scale,opacity] duration-300 will-change-[translate,opacity,scale]"
>
	{#if layout}
		{@render layout(itemState)}
	{:else}
		<Banner variant={bannerVariant} role={null}>
			{#if variant === 'pending'}
				<Banner.Icon class="bg-light">
					<span class="progress-dots" aria-hidden="true"></span>
				</Banner.Icon>
			{/if}
			<Banner.Title {...titleProps} id={titleProps.id ?? undefined}>{itemState.title}</Banner.Title>
			{#if description !== undefined}
				<Banner.Description {...descriptionProps} id={descriptionProps.id ?? undefined}>
					{#if typeof description === 'string'}
						{description}
					{:else}
						{@render description()}
					{/if}
				</Banner.Description>
			{/if}
			<Banner.Close {...closeProps} id={closeProps.id ?? undefined} aria-label="Dismiss" />
			{#if itemState.remaining !== undefined && itemState.duration !== undefined}
				<Banner.Progress
					value={itemState.remaining}
					max={itemState.duration}
					label="Time until dismissed"
				/>
			{/if}
		</Banner>
	{/if}
</div>
