import * as toast from '@zag-js/toast';
import { getContext, setContext } from 'svelte';

const key = Symbol('Toast');

const DEFAULT_DURATION = 4000;
const DEFAULT_MAX = 3;

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

/** What `Toast`'s `item` snippet receives for one toast. */
export interface ToastItemState {
	id: string;
	variant: ToastVariant;
	title: string;
	description?: string;
	/** The action with its handler already composed to dismiss the toast after it runs. */
	action?: {
		label: string;
		onclick: () => void;
	};
	/** Whether the timer is held, by hover, focus, or `pause`. */
	paused: boolean;
	dismiss: () => void;
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

type CreateByVariant = (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;

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

interface InternalToastContext extends ToastContext {
	store: toast.Store;
}

/** zag names the danger tone `error`. */
export const toastTypeOf = (variant: ToastVariant): toast.Type =>
	variant === 'danger' ? 'error' : variant;

/** The inverse of `toastTypeOf`, for an item reading its tone back off the machine. */
export const toastVariantOf = (type: toast.Type): ToastVariant => {
	if (type === 'error') return 'danger';
	if (type === 'success') return 'success';
	if (type === 'warning') return 'warning';
	return 'info';
};

const definedEntries = <T extends object>(object: T): Partial<T> =>
	Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined)
	) as Partial<T>;

/** Only the keys the caller set, so an update never wipes a field it did not name. */
const toZagOptions = (options: Partial<ToastOptions>): Partial<toast.Options<string>> =>
	definedEntries({
		title: options.title,
		description: options.description,
		type: options.variant === undefined ? undefined : toastTypeOf(options.variant),
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

	return setContext<InternalToastContext>(key, {
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
	const context = getContext<InternalToastContext | undefined>(key);
	if (!context) throw new Error('useToast() needs a provideToast() above it');
	return context;
};
