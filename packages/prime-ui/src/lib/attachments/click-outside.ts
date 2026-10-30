import type { Attachment } from 'svelte/attachments';

import { trackInteractOutside } from '@zag-js/interact-outside';

/** What `clickOutside` takes beside the handler. */
export interface ClickOutsideOptions {
	/**
	 * Targets a press may land on without counting as outside, beyond the element's own
	 * subtree and the portaled content it links through `aria-controls`.
	 */
	exclude?: (target: HTMLElement) => boolean;
}

/**
 * Runs `handler` on a pointerdown outside the element it is attached to.
 *
 * A press inside the element, or inside content the element opens into a portal (a
 * `Popover` or `Menu` whose trigger is inside it), does not count as outside.
 *
 * ```svelte
 * <div {@attach clickOutside(() => (open = false))}>…</div>
 * ```
 */
export const clickOutside =
	(
		handler: (event: PointerEvent) => void,
		options?: ClickOutsideOptions
	): Attachment<HTMLElement> =>
	(element) =>
		trackInteractOutside(element, {
			onPointerDownOutside: (event) => handler(event.detail.originalEvent as PointerEvent),
			exclude: options?.exclude
		});
