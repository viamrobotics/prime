import { get, writable } from 'svelte/store';

interface Logger {
  debug: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
}

/**
 * A logger that only logs when the passed condition is met. Useful for adding
 * debugging logging in specific environments or when certain criteria is met.
 *
 * @param key A key to prefix messages with for easy identification: `[key]: message`
 * @param condition The condition that must be met to allow logging
 * @returns A logger that emits messages only when the passed condition is `true`
 */
export const conditionalLogger = (key: string, condition: boolean): Logger => {
  const log = (
    type: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    data?: unknown
  ) => {
    if (!condition) {
      return;
    }

    if (data !== undefined) {
      // eslint-disable-next-line no-console
      console[type](`[${key}] ${message}`, data);
      return;
    }

    // eslint-disable-next-line no-console
    console[type](`[${key}] ${message}`);
  };

  const debug = (message: string, data?: unknown) =>
    log('debug', message, data);

  const info = (message: string, data?: unknown) => log('info', message, data);
  const warn = (message: string, data?: unknown) => log('warn', message, data);

  const error = (message: string, data?: unknown) =>
    log('error', message, data);

  return {
    debug,
    info,
    warn,
    error,
  };
};

const onceMap = writable<Record<string, boolean>>({});

/**
 * Stores whether a particular message has been logged once before, and if so
 * returns `false`; otherwise, adds the message to the store to prevent further
 * logging and returns `true`.
 *
 * @param message The message that should be logged once
 * @returns Whether the message should allowed to be logged
 */
export const shouldLogOnce = (message: string) => {
  const map = get(onceMap);
  if (map[message]) {
    return false;
  }

  onceMap.set({ ...map, [message]: true });
  return true;
};
