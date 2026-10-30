<!--
@component
One toast in a [`Toast`](./Toast.svelte) region. It owns the machine, the live-region role, and the
stacking motion. Its content is the `layout` snippet when one is given, and otherwise the variant
glyph, the title and description, an optional action, and a dismiss button. The region renders it,
so a consumer never places one.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { mdiAlert, mdiAlertCircle, mdiCheckCircle, mdiClose, mdiInformation } from '@mdi/js';
	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import Icon from '../Icon/Icon.svelte';
	import { toastVariantOf, type ToastItemState } from './useToast.svelte.ts';

	interface Props {
		/** The toast this item shows, as the region's machine hands it over. */
		item: toast.Props;
		/** Position in the region's list, which sets how far down the stack the item sits. */
		index: number;
		/** The region's machine. */
		parent: toast.GroupService;
		/** Replaces the default layout inside the item. */
		layout?: Snippet<[ToastItemState]>;
	}

	const { item, index, parent, layout }: Props = $props();

	const service = useMachine(toast.machine, () => ({ ...item, parent, index }));

	const api = $derived(toast.connect(service, normalizeProps));
	const variant = $derived(toastVariantOf(api.type));
	const isAlert = $derived(variant === 'warning' || variant === 'danger');
	const glyph = $derived(
		{
			info: { path: mdiInformation, tone: 'text-info-dark' },
			success: { path: mdiCheckCircle, tone: 'text-success-dark' },
			warning: { path: mdiAlert, tone: 'text-warning-text' },
			danger: { path: mdiAlertCircle, tone: 'text-danger-dark' }
		}[variant]
	);

	const itemState: ToastItemState = $derived({
		id: service.prop('id'),
		variant,
		title: item.title ?? '',
		description: item.description,
		action: item.action && {
			label: item.action.label,
			onclick: () => {
				item.action?.onClick?.();
				api.dismiss();
			}
		},
		paused: api.paused,
		dismiss: api.dismiss
	});
</script>

<div
	{...api.getRootProps()}
	role={isAlert ? 'alert' : 'status'}
	class={[
		'z-[var(--z-index)] [translate:var(--x)_var(--y)] [scale:var(--scale)] opacity-[var(--opacity)] transition-[translate,scale,opacity] duration-300 will-change-[translate,opacity,scale]',
		!layout &&
			'flex h-10 w-80 max-w-full items-center gap-2 rounded-sm border border-medium bg-medium px-3'
	]}
>
	<span {...api.getGhostBeforeProps()}></span>
	<span {...api.getGhostAfterProps()}></span>
	{#if layout}
		{@render layout(itemState)}
	{:else}
		<Icon icon={glyph.path} size="base" class={['shrink-0', glyph.tone]} />
		<span class="min-w-0 truncate text-sm text-default" {...api.getTitleProps()}>{api.title}</span>
		{#if api.description}
			<span class="min-w-0 truncate text-sm text-subtle-1" {...api.getDescriptionProps()}>
				{api.description}
			</span>
		{/if}
		{#if item.action}
			<button
				{...api.getActionTriggerProps()}
				class="ml-auto shrink-0 text-sm font-medium text-link focus-ring"
			>
				{item.action.label}
			</button>
		{/if}
		<button
			{...api.getCloseTriggerProps()}
			aria-label="Dismiss"
			class={['icon-button shrink-0', !item.action && 'ml-auto']}
		>
			<Icon icon={mdiClose} size="sm" />
		</button>
	{/if}
</div>
