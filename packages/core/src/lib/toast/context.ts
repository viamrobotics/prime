import { setContext, getContext } from 'svelte';
import {
  derived,
  get,
  writable,
  type Readable,
  type Writable,
} from 'svelte/store';

import { uniqueId } from '$lib/unique-id';

import { pausableProgress } from '$lib/notification';
import type { ToastVariantType } from '.';

export type Toast = (params: ToastParams) => void;

/** Internal toast context. */
export interface ToastContext {
  state: ToastState;
  toast: Toast;
}
export interface ToastParams {
  message: string;
  action?: { text: string; handler: () => unknown } | undefined;
  variant?: ToastVariantType;
}

/** Internal toast state. */
export interface ToastState {
  toasts: Readable<ToastElement[]>;
  pageIsVisible: Writable<boolean>;
}

/** Internal toast item state and actions. */
export interface ToastElement {
  id: string;
  message: string;
  action?: { text: string; handler: () => unknown } | undefined;
  variant?: ToastVariantType;
  pause: () => void;
  resume: () => void;
  dismiss: () => void;
}

const ToastContextKey = Symbol('toast-context');
const ToastDuration = 4000;

/** Create the internal toast state and context object. */
export const createToastContext = (): ToastContext => {
  const toasts = writable<ToastElement[]>([]);
  const pageIsVisible = writable(true);
  const pausedID = writable<string | undefined>();
  const unsubscribeByID = new Map<string, () => void>();

  const add = (params: ToastParams): void => {
    const id = uniqueId('toast-element');
    const isPaused = derived(
      [pageIsVisible, pausedID],
      ([$pageIsVisible, $pausedID]) => $pausedID === id || !$pageIsVisible
    );

    const pause = () => setPaused(id, true);
    const resume = () => setPaused(id, false);
    const dismiss = () => remove(id);
    const { progress, unsubscribe } = pausableProgress({
      isPaused,
      totalDuration: ToastDuration,
      onComplete: dismiss,
    });

    const toast = {
      id,
      progress,
      pause,
      resume,
      dismiss,
      ...params,
    };

    unsubscribeByID.set(id, unsubscribe);
    toasts.set([...get(toasts), toast]);
  };

  const remove = (id: string) => {
    unsubscribeByID.get(id)?.();
    unsubscribeByID.delete(id);
    toasts.set(get(toasts).filter((item) => item.id !== id));
  };

  const setPaused = (id: string, isPaused: boolean) => {
    if (isPaused) {
      pausedID.set(id);
    } else if (get(pausedID) === id) {
      pausedID.set(undefined);
    }
  };

  const context: ToastContext = {
    state: { toasts, pageIsVisible },
    toast: add,
  };

  return context;
};

/** Provide toast state to a component tree. */
export const provideToast = (context = createToastContext()): Toast => {
  setContext(ToastContextKey, context);
  return context.toast;
};

const useToastContext = (): ToastContext => {
  const context = getContext<ToastContext | undefined>(ToastContextKey);

  if (!context) {
    throw new Error('Usage: No context from `provideToast` available');
  }

  return context;
};

/** Get access to the toast notifier in a component. */
export const useToast = (): Toast => {
  return useToastContext().toast;
};

/** Get access to the internal toast state. */
export const useToastState = (): ToastState => {
  return useToastContext().state;
};
