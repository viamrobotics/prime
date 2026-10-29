<!--
@component
Wraps the control a [`Tooltip`](./Tooltip.svelte) describes. It renders a `<span>` around its
children, never a button, so the control inside keeps its own role and focus behavior.

Focusing the control inside opens the tooltip. While it is open, the control's `aria-describedby`
names the [`Tooltip.Content`](./TooltipContent.svelte). A child with nothing focusable in it,
such as an [`Icon`](../Icon/Icon.svelte), opens the tooltip on hover only. Give the icon an
`aria-label` and `tabindex="0"` to make it reachable by keyboard.

Built on [bits-ui `Tooltip`](https://bits-ui.com/docs/components/tooltip).

```svelte
<Tooltip.Trigger>
	<button type="button" aria-label="Copy">Copy</button>
</Tooltip.Trigger>
```
-->
<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tooltip } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { id, children, ...restProps }: Props = $props();

	type FocusHandlers = Partial<
		Record<'onfocus' | 'onblur' | 'onfocusin' | 'onfocusout', (event: FocusEvent) => void>
	>;

	const buttonOnlyAttributes = {
		type: undefined,
		disabled: undefined,
		tabindex: undefined,
		'aria-describedby': undefined,
		onfocus: undefined,
		onblur: undefined
	};

	const focusableSelector = ':scope button, :scope a[href], :scope input, :scope [tabindex]';

	// aria-describedby on the span would name nothing: the span is not what a screen reader focuses.
	const describeFocusable =
		(describedBy: unknown): Attachment<HTMLSpanElement> =>
		(span) => {
			const contentId = typeof describedBy === 'string' ? describedBy : undefined;
			const target = contentId ? span.querySelector(focusableSelector) : null;
			if (!target || !contentId) return;

			const existing = target.getAttribute('aria-describedby');
			target.setAttribute('aria-describedby', existing ? `${existing} ${contentId}` : contentId);

			return () => {
				const remaining = (target.getAttribute('aria-describedby') ?? '')
					.split(' ')
					.filter((token) => token && token !== contentId)
					.join(' ');
				if (remaining) target.setAttribute('aria-describedby', remaining);
				else target.removeAttribute('aria-describedby');
			};
		};
</script>

<Tooltip.Trigger {id} {...restProps}>
	{#snippet child({ props })}
		{@const { onfocus, onblur, onfocusin, onfocusout } = props as FocusHandlers}
		<!-- Focus does not bubble and bits-ui listens with onfocus/onblur, so forward the bubbling pair. -->
		<span
			{...props}
			{...buttonOnlyAttributes}
			onfocusin={(event) => {
				onfocusin?.(event);
				onfocus?.(event);
			}}
			onfocusout={(event) => {
				onfocusout?.(event);
				onblur?.(event);
			}}
			{@attach describeFocusable(props['aria-describedby'])}
		>
			{@render children?.()}
		</span>
	{/snippet}
</Tooltip.Trigger>
