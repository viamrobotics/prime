import { notification } from './stores';

/** Pushes an info notification with the passed title and optional message. */
const info = (title: string, message?: string) => {
  notification.push({ title, message });
};

/** Pushes an warning notification with the passed title and optional message. */
const warn = (title: string, message?: string) => {
  notification.push({ variant: 'warning', title, message });
};

/** Pushes an danger notification with the passed title and optional message. */
const danger = (title: string, message?: string) => {
  notification.push({ variant: 'danger', title, message });
};

/** Pushes an success notification with the passed title and optional message. */
const success = (title: string, message?: string) => {
  notification.push({ variant: 'success', title, message });
};

/** An API for pushing notifications to the user. */
export const notify = {
  info,
  warn,
  danger,
  success,
};
