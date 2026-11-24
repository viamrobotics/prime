<!--
@component
The panel of a [`ContextMenu`](./ContextMenu.svelte), portaled to the body and opened at the pointer. It closes on Escape, on a press outside, and when an item is activated.
The trigger area names the panel unless you pass `aria-label` or `aria-labelledby`.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ContextMenu } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';
	import { useTriggerName } from './useTriggerName.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Where the panel renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	const uid = $props.id();

	const {
		id,
		class: extraClasses,
		children,
		portal,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		...restProps
	}: Props = $props();

	const contentId = $derived(id ?? `context-menu-${uid}`);

	const triggerName = useTriggerName();
	const labelledBy = $derived(ariaLabelledBy ?? (ariaLabel ? undefined : triggerName?.id));
</script>

<ContextMenu.Portal {...portalProps(portal)}>
	<ContextMenu.Content
		id={contentId}
		aria-label={ariaLabel}
		aria-labelledby={labelledBy}
		class={['z-menu min-w-40 popover-panel p-1', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</ContextMenu.Content>
</ContextMenu.Portal>
