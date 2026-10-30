import * as toast from '@zag-js/toast';
import { getContext, setContext, type Snippet } from 'svelte';

import type { BannerVariant } from '../Banner/useBanner.svelte.ts';
import type { ToastPlacement } from '../Toast/useToast.svelte.ts';

const key = Symbol('Notify');

/** The tone of a notification: a `Banner` variant, or `pending` for work still running. */
export type NotifyVariant = BannerVariant | 'pending';

/** What the variant methods take after the title and description. */
export interface NotifyOptions {
	/** Milliseconds before the notification dismisses itself. Defaults to the provider's `duration`. `pending` never dismisses itself. */
	duration?: number;
	/** Stay until dismissed. */
	persist?: boolean;
	/** Called once the notification has gone, however it went. */
	onDismiss?: () => void;
}

/** What `Notify`'s `item` snippet receives for one notification. */
export interface NotifyItemState {
	id: string;
	variant: NotifyVariant;
	title: string;
	description?: string | Snippet;
	/** Milliseconds until it dismisses itself. Absent when it never does. */
	remaining?: number;
	/** The full duration `remaining` counts down from. Absent when it never dismisses itself. */
	duration?: number;
	/** Whether the timer is held, by hover, focus, or the page losing focus. */
	paused: boolean;
	dismiss: () => void;
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

type NotifyByVariant = (
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
	/** Changes a visible notification in place, such as a `pending` one that finished. */
	update: (
		id: string,
		changes: { variant?: NotifyVariant; title?: string; description?: string | Snippet }
	) => void;
	/** Dismisses one notification, or every notification when called without an id. */
	dismiss: (id?: string) => void;
}

interface InternalNotifyContext extends NotifyContext {
	store: toast.Store<string | Snippet>;
}

const DEFAULT_DURATION = 8000;
const DEFAULT_MAX = 5;

const TYPE_BY_VARIANT: Record<NotifyVariant, toast.Type> = {
	info: 'info',
	success: 'success',
	warning: 'warning',
	danger: 'error',
	pending: 'loading'
};

/** The inverse of `TYPE_BY_VARIANT`, for an item reading its tone back off the machine. */
export const notifyVariantOf = (type: toast.Type): NotifyVariant => {
	if (type === 'error') return 'danger';
	if (type === 'loading') return 'pending';
	if (type === 'success') return 'success';
	if (type === 'warning') return 'warning';
	return 'info';
};

/**
 * Creates the notification stack's state and shares it with everything below. Render one
 * `Notify` near the app root to show the stack. It is a second stack beside `provideToast`,
 * with its own placement and a longer default duration.
 */
export const provideNotify = (options: NotifyProviderOptions = {}): NotifyContext => {
	const duration = options.duration ?? DEFAULT_DURATION;
	const store = toast.createStore<string | Snippet>({
		placement: options.placement ?? 'top-end',
		max: options.max ?? DEFAULT_MAX,
		duration
	});

	const notifyByVariant =
		(variant: NotifyVariant): NotifyByVariant =>
		(title, description, notifyOptions = {}) => {
			const persists = variant === 'pending' || notifyOptions.persist === true;
			const id = store.create({
				title,
				description,
				type: TYPE_BY_VARIANT[variant],
				duration: persists ? Number.POSITIVE_INFINITY : (notifyOptions.duration ?? duration),
				onStatusChange: (details) => {
					if (details.status === 'unmounted') notifyOptions.onDismiss?.();
				}
			});
			return { id, dismiss: () => store.dismiss(id) };
		};

	const context: InternalNotifyContext = {
		store,
		info: notifyByVariant('info'),
		success: notifyByVariant('success'),
		warning: notifyByVariant('warning'),
		danger: notifyByVariant('danger'),
		pending: notifyByVariant('pending'),
		update: (id, changes) => {
			store.update(id, {
				title: changes.title,
				description: changes.description,
				type: changes.variant === undefined ? undefined : TYPE_BY_VARIANT[changes.variant],
				duration:
					changes.variant === undefined || changes.variant === 'pending' ? undefined : duration
			});
		},
		dismiss: (id) => store.dismiss(id)
	};
	setContext<InternalNotifyContext>(key, context);
	return context;
};

/** The notification stack from the nearest `provideNotify`. Throws outside one. */
export const useNotify = (): NotifyContext => useNotifyStore();

export const useNotifyStore = (): InternalNotifyContext => {
	const context = getContext<InternalNotifyContext | undefined>(key);
	if (!context) throw new Error('useNotify() needs a provideNotify() above it');
	return context;
};
