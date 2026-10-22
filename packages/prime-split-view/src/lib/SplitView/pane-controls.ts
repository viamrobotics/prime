import type { Attachment } from 'svelte/attachments';

/** The `pane` snippet's second argument. Attach each one to an element you render. */
export interface PaneControls {
	/** Starts a drag of this pane from the element. Native controls inside it never start one. */
	dragTrigger: Attachment<HTMLElement>;
	/** Keeps a drag from starting on the element, for a custom control inside a `dragTrigger`. */
	dragIgnore: Attachment<HTMLElement>;
	/**
	 * Toggles move mode, the alternative to dragging that WCAG 2.5.7 requires whenever a pane has a
	 * `dragTrigger`. Use a `button`, an element with `role="button"`, or a menu item whose menu
	 * dispatches `click`.
	 */
	moveTrigger: Attachment<HTMLElement>;
}
