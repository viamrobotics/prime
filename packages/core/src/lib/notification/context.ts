import { setContext, getContext } from 'svelte';
import {
  derived,
  get,
  writable,
  type Readable,
  type Writable,
} from 'svelte/store';

import { useUniqueId } from '$lib/unique-id';
import { BannerVariant, type BannerVariantType } from '$lib/banner';

import { pausableProgress } from './pausable-progress';

/** Internal notification context. */
export interface NotifyContext {
  state: NotifyState;
  notify: Notify;
}

/** Notification sender. */
export interface Notify {
  /** Push an info notification with a title and optional message. */
  info: (title: string, message?: string) => void;
  /** Push a warning notification with a title and optional message. */
  warn: (title: string, message?: string) => void;
  /** Push a danger notification with a title and optional message. */
  danger: (title: string, message?: string) => void;
  /** Push a success notification with a title and optional message. */
  success: (title: string, message?: string) => void;
}

export interface NotifyOptions {
  duration?: number;
}

/** Internal notification state. */
export interface NotifyState {
  notifications: Readable<Notification[]>;
  pageIsVisible: Writable<boolean>;
}

/** Internal notification item state and actions. */
export interface Notification {
  id: string;
  title: string;
  message: string | undefined;
  variant: BannerVariantType;
  progress: Readable<number>;
  pause: () => void;
  resume: () => void;
  dismiss: () => void;
}

const NotifyContextKey = Symbol('notify-context');
const NotificationDuration = 4000;

/** Create the internal notification state and context object. */
export const createNotifyContext = (): NotifyContext => {
  const notifications = writable<Notification[]>([]);
  const pageIsVisible = writable(true);
  const pausedID = writable<string | undefined>();
  const unsubscribeByID = new Map<string, () => void>();

  const add =
    (variant: BannerVariantType) =>
    (title: string, message?: string): void => {
      const id = useUniqueId('notification');
      const isPaused = derived(
        [pageIsVisible, pausedID],
        ([$pageIsVisible, $pausedID]) => $pausedID === id || !$pageIsVisible
      );

      const pause = () => setPaused(id, true);
      const resume = () => setPaused(id, false);
      const dismiss = () => remove(id);
      const { progress, unsubscribe } = pausableProgress({
        isPaused,
        totalDuration: NotificationDuration,
        onComplete: dismiss,
      });

      const notification = {
        id,
        variant,
        title,
        message,
        progress,
        pause,
        resume,
        dismiss,
      };

      unsubscribeByID.set(id, unsubscribe);
      notifications.set([...get(notifications), notification]);
    };

  const remove = (id: string) => {
    unsubscribeByID.get(id)?.();
    unsubscribeByID.delete(id);
    notifications.set(get(notifications).filter((item) => item.id !== id));
  };

  const setPaused = (id: string, isPaused: boolean) => {
    if (isPaused) {
      pausedID.set(id);
    } else if (get(pausedID) === id) {
      pausedID.set(undefined);
    }
  };

  const context: NotifyContext = {
    state: { notifications, pageIsVisible },
    notify: {
      info: add(BannerVariant.Info),
      warn: add(BannerVariant.Warning),
      danger: add(BannerVariant.Danger),
      success: add(BannerVariant.Success),
    },
  };

  return context;
};

/** Provide notification state to a component tree. */
export const provideNotify = (context = createNotifyContext()): void => {
  setContext(NotifyContextKey, context);
};

const useNotifyContext = (): NotifyContext => {
  const context = getContext<NotifyContext | undefined>(NotifyContextKey);

  if (!context) {
    throw new Error('Usage: No context from `provideNotify` available');
  }

  return context;
};

/** Get access to the notification sender in a component. */
export const useNotify = (): Notify => {
  return useNotifyContext().notify;
};

/** Get access to the internal notification state. */
export const useNotifyState = (): NotifyState => {
  return useNotifyContext().state;
};
