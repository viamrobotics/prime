import * as toast from '@zag-js/toast';
import { getContext, setContext } from 'svelte';

import type {
	CreateByVariant,
	ToastContext,
	ToastOptions,
	ToastProviderOptions,
	ToastVariant
} from './toast.ts';

const TOAST_KEY = Symbol('Toast');

const DEFAULT_DURATION = 4000;
const DEFAULT_MAX = 3;

interface InternalToastContext extends ToastContext {
	store: toast.Store;
}

export const TOAST_TYPE_BY_VARIANT: Record<ToastVariant, toast.Type> = {
	info: 'info',
	success: 'success',
	warning: 'warning',
	danger: 'error'
};

const TOAST_VARIANTS = Object.keys(TOAST_TYPE_BY_VARIANT) as ToastVariant[];

export const toastVariantOf = (type: toast.Type): ToastVariant =>
	TOAST_VARIANTS.find((variant) => TOAST_TYPE_BY_VARIANT[variant] === type) ?? 'info';

const definedEntries = <T extends object>(object: T): Partial<T> =>
	Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined)
	) as Partial<T>;

// Only the keys the caller set, so an update never wipes a field it did not name.
const toZagOptions = (options: Partial<ToastOptions>): Partial<toast.Options<string>> =>
	definedEntries({
		title: options.title,
		description: options.description,
		type: options.variant === undefined ? undefined : TOAST_TYPE_BY_VARIANT[options.variant],
		duration: options.duration,
		action:
			options.action === undefined
				? undefined
				: { label: options.action.label, onClick: options.action.onclick }
	});

/**
 * Creates the toast stack's state and shares it with everything below. Render one `Toast` near
 * the app root to show the stack.
 */
export const provideToast = (options: ToastProviderOptions = {}): ToastContext => {
	const duration = options.duration ?? DEFAULT_DURATION;
	const store = toast.createStore({
		placement: options.placement ?? 'bottom',
		max: options.max ?? DEFAULT_MAX,
		duration
	});

	const create = (toastOptions: ToastOptions): string =>
		store.create({ type: 'info', duration, ...toZagOptions(toastOptions) });

	const createByVariant =
		(variant: ToastVariant): CreateByVariant =>
		(title, rest = {}) =>
			create({ ...rest, title, variant });

	return setContext<InternalToastContext>(TOAST_KEY, {
		store,
		create,
		info: createByVariant('info'),
		success: createByVariant('success'),
		warning: createByVariant('warning'),
		danger: createByVariant('danger'),
		update: (id, toastOptions) => {
			store.update(id, toZagOptions(toastOptions));
		},
		dismiss: (id) => store.dismiss(id),
		pause: (id) => store.pause(id),
		resume: (id) => store.resume(id)
	});
};

/** The toast stack from the nearest `provideToast`. Throws outside one. */
export const useToast = (): ToastContext => useToastStore();

export const useToastStore = (): InternalToastContext => {
	const context = getContext<InternalToastContext | undefined>(TOAST_KEY);
	if (!context) throw new Error('useToast() needs a provideToast() above it');
	return context;
};
