import type { Snippet } from 'svelte';

import type { BannerVariant } from '../Banner/variant.ts';
import type { ToastPlacement } from '../Toast/toast.ts';

/** The tone of a notification, which is the `Banner` variant it renders with. */
export type NotifyVariant = BannerVariant;

/** What the variant methods take after the title and description. */
export interface NotifyOptions {
	/** Milliseconds before the notification dismisses itself. Defaults to the provider's `duration`. `pending` never dismisses itself. */
	duration?: number;
	/** Stay until dismissed. */
	persist?: boolean;
	/** Rendered in the banner's action row: a link to what happened, a retry button. */
	actions?: Snippet;
	/** Percent complete, `0` to `100`, shown as a bar along the bottom while the notification is `pending`. */
	progress?: number;
	/** Called once the notification has gone, however it went. */
	onDismiss?: () => void;
}

/** What `update` takes: the fields a visible notification may change. */
export interface NotifyChanges {
	variant?: NotifyVariant;
	title?: string;
	description?: string | Snippet;
	actions?: Snippet;
	progress?: number;
}

/** What `provideNotify` takes. */
export interface NotifyProviderOptions {
	/** @default 'top-end' */
	placement?: ToastPlacement;
	/** Default milliseconds before a notification dismisses itself. @default 8000 */
	duration?: number;
	/** How many notifications show at once before new ones queue. @default 5 */
	max?: number;
}

/** The handle a variant method returns. */
export interface NotifyHandle {
	id: string;
	dismiss: () => void;
}

/** The shape of the variant methods on a `NotifyContext`. */
export type NotifyByVariant = (
	title: string,
	description?: string | Snippet,
	options?: NotifyOptions
) => NotifyHandle;

/** What `useNotify` returns. */
export interface NotifyContext {
	info: NotifyByVariant;
	success: NotifyByVariant;
	warning: NotifyByVariant;
	danger: NotifyByVariant;
	/** A spinner in the chip and no timer. Resolve it with `dismiss` on the handle, or `update`. */
	pending: NotifyByVariant;
	/** Changes a visible notification in place, such as a `pending` one that finished. Fields left out keep their value, and a timer changes only when the variant crosses `pending`. */
	update: (id: string, changes: NotifyChanges) => void;
	/** Dismisses one notification, or every notification when called without an id. */
	dismiss: (id?: string) => void;
}
