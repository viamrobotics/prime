import * as toast from '@zag-js/toast';
import { getContext, setContext, type Snippet } from 'svelte';

import type {
	NotifyChanges,
	NotifyContext,
	NotifyByVariant,
	NotifyOptions,
	NotifyProviderOptions,
	NotifyVariant
} from './notify.ts';

import { TOAST_TYPE_BY_VARIANT } from '../Toast/useToast.svelte.ts';

const NOTIFY_KEY = Symbol('Notify');

// The fields prime keeps on a toast beyond what the machine models.
export interface NotifyMeta {
	actions?: Snippet;
	progress?: number;
}

interface InternalNotifyContext extends NotifyContext {
	store: toast.Store<string | Snippet>;
}

const DEFAULT_DURATION = 8000;
const DEFAULT_MAX = 5;

const TYPE_BY_VARIANT: Record<NotifyVariant, toast.Type> = {
	...TOAST_TYPE_BY_VARIANT,
	pending: 'loading'
};

const NOTIFY_VARIANTS = Object.keys(TYPE_BY_VARIANT) as NotifyVariant[];

export const notifyVariantOf = (type: toast.Type): NotifyVariant =>
	NOTIFY_VARIANTS.find((variant) => TYPE_BY_VARIANT[variant] === type) ?? 'info';

const toZagToast = (
	variant: NotifyVariant,
	title: string,
	description: string | Snippet | undefined,
	options: NotifyOptions,
	duration: number
): toast.Options<string | Snippet> => {
	const persists = variant === 'pending' || options.persist === true;
	const meta: NotifyMeta = { actions: options.actions, progress: options.progress };
	return {
		title,
		description,
		type: TYPE_BY_VARIANT[variant],
		duration: persists ? Number.POSITIVE_INFINITY : (options.duration ?? duration),
		meta,
		onStatusChange: (details) => {
			if (details.status === 'unmounted') options.onDismiss?.();
		}
	};
};

// Only the fields the caller set. The timer changes only across `pending`: into it the
// notification stops dismissing itself, out of it the countdown restarts at the provider's duration.
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
			const id = store.create(toZagToast(variant, title, description, notifyOptions, duration));
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
	setContext<InternalNotifyContext>(NOTIFY_KEY, context);
	return context;
};

/** The notification stack from the nearest `provideNotify`. Throws outside one. */
export const useNotify = (): NotifyContext => useNotifyStore();

export const useNotifyStore = (): InternalNotifyContext => {
	const context = getContext<InternalNotifyContext | undefined>(NOTIFY_KEY);
	if (!context) throw new Error('useNotify() needs a provideNotify() above it');
	return context;
};
