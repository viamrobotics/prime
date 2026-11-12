import * as toast from '@zag-js/toast';
import { getContext, setContext, type Snippet } from 'svelte';

import type { BannerVariant } from '../Banner/useBanner.svelte.ts';
import type { ToastPlacement } from '../Toast/useToast.svelte.ts';

const key = Symbol('Notify');

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

/** The fields prime keeps on a toast beyond what the machine models. */
export interface NotifyMeta {
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
	/** Changes a visible notification in place, such as a `pending` one that finished. Fields left out keep their value, and a timer changes only when the variant crosses `pending`. */
	update: (id: string, changes: NotifyChanges) => void;
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
 * Only the fields the caller set, so an update never wipes a field it did not name. The timer
 * changes only across the `pending` boundary: into it the notification stops dismissing itself,
 * out of it the countdown starts at the provider's `duration`.
 */
const toZagChanges = (
	current: toast.Options<string | Snippet>,
	changes: NotifyChanges,
	duration: number
): Partial<toast.Options<string | Snippet>> => {
	const next: Partial<toast.Options<string | Snippet>> = {};
	if (changes.title !== undefined) next.title = changes.title;
	if (changes.description !== undefined) next.description = changes.description;
	if (changes.actions !== undefined || changes.progress !== undefined) {
		const meta: NotifyMeta = { ...current.meta };
		if (changes.actions !== undefined) meta.actions = changes.actions;
		if (changes.progress !== undefined) meta.progress = changes.progress;
		next.meta = meta;
	}
	if (changes.variant !== undefined) {
		next.type = TYPE_BY_VARIANT[changes.variant];
		if (changes.variant === 'pending') next.duration = Number.POSITIVE_INFINITY;
		else if (current.type === 'loading') next.duration = duration;
	}
	return next;
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
			const meta: NotifyMeta = { actions: notifyOptions.actions, progress: notifyOptions.progress };
			const id = store.create({
				title,
				description,
				type: TYPE_BY_VARIANT[variant],
				duration: persists ? Number.POSITIVE_INFINITY : (notifyOptions.duration ?? duration),
				meta,
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
			store.update(id, (current) => ({ ...current, ...toZagChanges(current, changes, duration) }));
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
