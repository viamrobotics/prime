import { writable } from 'svelte/store';
import type { FlyParams } from 'svelte/transition';

export interface NotificationOptions {
  // Unique id generated for every notification
  id?: number;
  // Container target name to send notification to
  target?: string;
  // Notification title
  title: string;
  // Notification message
  message?: string | undefined;
  // Notification variant
  variant?: 'info' | 'warning' | 'danger' | 'success' | undefined;
  // duration of progress bar tween from initial to next
  duration?: number;
  // initial progress bar value
  initial: number;
  // next progress bar value
  next?: number;
  // pause progress bar tween on mouse hover
  pausable?: boolean;
  // allow dissmiss with close button
  dismissable?: boolean;
  // display toasts in reverse order
  reversed?: boolean;
  // notification intro fly animation settings
  intro?: FlyParams;
  // callback that runs on notification dismiss
  onpop?: (id: number) => void;
  reset?: number;
}

type PartialOptions = Partial<NotificationOptions>;

export const defaults: Omit<NotificationOptions, 'title' | 'message'> = {
  duration: 4000,
  initial: 1,
  next: 0,
  pausable: true,
  dismissable: true,
  reversed: false,
  intro: { x: 256 },
};

const createToast = () => {
  const { subscribe, update } = writable<NotificationOptions[]>([]);

  const options: Record<string, PartialOptions> = {};
  let count = 0;

  const init = (target = 'default', opts: PartialOptions = {}) => {
    options[target] = opts;
    return options;
  };

  /**
   * Send a new notification
   */
  const push = ({
    title,
    message,
    variant,
    opts,
  }: {
    title: string;
    message?: string | undefined;
    variant?: 'info' | 'warning' | 'danger' | 'success';
    opts?: PartialOptions;
  }): number => {
    const param = {
      target: 'default',
      title,
      message,
      variant,
      ...opts,
    };

    const config = options[param.target] ?? {};

    count += 1;

    const entry: NotificationOptions = {
      ...defaults,
      ...config,
      ...param,
      id: count,
      reset: 0,
    };

    update((value) => {
      const match = value.find(
        (item) => item.title === entry.title && item.message === entry.message
      );

      if (match) {
        value.splice(value.indexOf(match), 1);
        match.reset! += 1;
        return match.reversed ? [...value, match] : [match, ...value];
      }

      return entry.reversed ? [...value, entry] : [entry, ...value];
    });

    return count;
  };

  /**
   * Remove notification(s)
   * - notification.pop() // removes the last notification
   * - notification.pop(0) // remove all toasts
   * - notification.pop(id) // removes the notification with specified `id`
   * - notification.pop({ target: 'foo' }) // remove all toasts from target `foo`
   */
  const pop = (id: number | { target: string }) => {
    update((items) => {
      if (items.length === 0 || id === 0) {
        return [];
      }

      if (typeof id === 'object') {
        return items.filter((item) => item.target !== id.target);
      }

      const found = id || Math.max(...items.map((i) => i.id!));
      return items.filter((i) => i.id !== found);
    });
  };

  /**
   * Update an existing notification
   */
  const set = (id: number | NotificationOptions, opts: NotificationOptions) => {
    const param = typeof id === 'number' ? { ...opts, id } : id;

    update((items) => {
      const idx = items.findIndex((item) => item.id === param.id);
      if (idx > -1) {
        items[idx] = { ...items[idx], ...param };
      }
      return items;
    });
  };

  return { subscribe, push, pop, set, init };
};

export const notification = createToast();
