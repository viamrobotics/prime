<!--
@component
One toast in a [`Toast`](./Toast.svelte) region. It owns the machine, the live-region role, and the
stacking motion, and shows the variant glyph, the title and description, an optional action, and a
dismiss button. The region renders it, so a consumer never places one.
-->
<script lang="ts">
	import { mdiAlert, mdiAlertCircle, mdiCheckCircle, mdiClose, mdiInformation } from '@mdi/js';
	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import * as toast from '@zag-js/toast';

	import Icon from '../Icon/Icon.svelte';
	import { toastVariantOf } from './useToast.svelte.ts';

	interface Props {
		/** The toast this item shows, as the region's machine hands it over. */
		item: toast.Props;
		/** Position in the region's list, which sets how far down the stack the item sits. */
		index: number;
		/** The region's machine. */
		parent: toast.GroupService;
	}

	const { item, index, parent }: Props = $props();

	const service = useMachine(toast.machine, () => ({ ...item, parent, index }));

	const api = $derived(toast.connect(service, normalizeProps));
	const variant = $derived(toastVariantOf(api.type));
	const isAlert = $derived(variant === 'warning' || variant === 'danger');
	const glyph = $derived(
		{
			info: { path: mdiInformation, tone: 'text-info-dark' },
			success: { path: mdiCheckCircle, tone: 'text-success-dark' },
			warning: { path: mdiAlert, tone: 'text-warning-dark' },
			danger: { path: mdiAlertCircle, tone: 'text-danger-dark' }
		}[variant]
	);
</script>

<!-- The width cap is against the viewport: a region pinned to one side has no width of its own for a percentage to resolve against. -->
<div
	{...api.getRootProps()}
	role={isAlert ? 'alert' : 'status'}
	class="z-[var(--z-index)] flex h-10 w-80 max-w-[calc(100vw-var(--spacing)*8)] [translate:var(--x)_var(--y)] [scale:var(--scale)] items-center gap-2 rounded-sm border border-medium bg-medium px-3 opacity-[var(--opacity)] transition-[translate,scale,opacity] duration-300 will-change-[translate,opacity,scale]"
>
	<span {...api.getGhostBeforeProps()}></span>
	<span {...api.getGhostAfterProps()}></span>
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
</div>
