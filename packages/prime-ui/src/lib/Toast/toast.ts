import type * as toast from '@zag-js/toast';

/** The tone of a toast: which glyph it wears and whether it announces as a `status` or an `alert`. */
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

/** Where the toast stack sits on the viewport. */
export type ToastPlacement = toast.Placement;

/** What `toast.create` takes. */
export interface ToastOptions {
	/** The message. */
	title: string;
	/** A second line under the title. */
	description?: string;
	/** @default 'info' */
	variant?: ToastVariant;
	/** Milliseconds before the toast dismisses itself. Defaults to the provider's `duration`. */
	duration?: number;
	/** An inline action button after the message. */
	action?: {
		label: string;
		onclick: () => void;
	};
}

/** What `provideToast` takes. */
export interface ToastProviderOptions {
	/** @default 'bottom' */
	placement?: ToastPlacement;
	/** Default milliseconds before a toast dismisses itself. @default 4000 */
	duration?: number;
	/** How many toasts show at once before new ones queue. @default 3 */
	max?: number;
}

/** The shape of `info`, `success`, `warning`, and `danger` on a `ToastContext`. */
export type CreateByVariant = (
	title: string,
	options?: Omit<ToastOptions, 'title' | 'variant'>
) => string;

/** What `useToast` returns. Every method that takes an id accepts the one `create` returned. */
export interface ToastContext {
	/** Shows a toast and returns its id. */
	create: (options: ToastOptions) => string;
	info: CreateByVariant;
	success: CreateByVariant;
	warning: CreateByVariant;
	danger: CreateByVariant;
	/** Changes a visible toast in place. */
	update: (id: string, options: Partial<ToastOptions>) => void;
	/** Dismisses one toast, or every toast when called without an id. */
	dismiss: (id?: string) => void;
	/** Holds one toast's timer, or every timer when called without an id. */
	pause: (id?: string) => void;
	/** Restarts a timer `pause` held. */
	resume: (id?: string) => void;
}
