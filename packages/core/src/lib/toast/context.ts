import { setContext, getContext } from 'svelte';
import {
  derived,
  get,
  writable,
  type Readable,
  type Writable,
} from 'svelte/store';

import { uniqueId } from '$lib/unique-id';
import { ToastVariant, type ToastVariantType } from '$lib/toast';

import { pausableProgress } from '../notification/pausable-progress';

/** Internal toast context. */
export interface ToastContext {
  state: ToastState;
  toast: Toast;
}

/** Notification sender. */
export interface Toast {
  /** Push a neutral toast with a message. */
  neutral: (message: string, closeable?: boolean) => void;
  /** Push an upload toast with a message. */
  upload: (message: string, closeable?: boolean) => void;
  /** Push a success toast with a message. */
  success: (message: string, closeable?: boolean) => void;
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
  closeable: boolean | undefined;
  variant: ToastVariantType;
  progress: Readable<number>;
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

  const add =
    (variant: ToastVariantType) =>
    (message: string, closeable: boolean | undefined): void => {
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
        variant,
        message,
        progress,
        closeable,
        pause,
        resume,
        dismiss,
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
    toast: {
      neutral: add(ToastVariant.Neutral),
      upload: add(ToastVariant.Upload),
      success: add(ToastVariant.Success),
    },
  };

  return context;
};

/** Provide toast state to a component tree. */
export const provideToast = (context = createToastContext()): void => {
  setContext(ToastContextKey, context);
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
