import type { Locator } from '@playwright/test';
// eslint-disable-next-line import/extensions
import { theme } from '../../public/theme.js';

type Key =
  | keyof typeof theme.extend.backgroundColor
  | keyof typeof theme.extend.borderColor
  | keyof typeof theme.extend.boxShadow
  | keyof typeof theme.extend.colors
  | keyof typeof theme.extend.textColor;

export const hexToRGB = (section: keyof typeof theme.extend, key: Key) => {
  const extend = theme.extend as Record<string, unknown>;
  const hex = (extend[section] as Record<string, Record<string, string>>)[
    key
  ] as unknown as string;

  if (!hex) {
    throw new Error(`hex not found for ${section}: ${key}`);
  }

  let alpha = false;
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map((x) => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  }

  const parsedHex = Number.parseInt(h, 16);

  /* eslint-disable no-bitwise */
  return `rgb${alpha ? 'a' : ''}(${parsedHex >>> (alpha ? 24 : 16)}, ${
    (parsedHex & (alpha ? 0x00_ff_00_00 : 0x00_ff_00)) >>> (alpha ? 16 : 8)
  }, ${(parsedHex & (alpha ? 0x00_00_ff_00 : 0x00_00_ff)) >>> (alpha ? 8 : 0)}${
    alpha ? `, ${parsedHex & 0x00_00_00_ff}` : ''
  })`;
  /* eslint-enable */
};

export interface CustomEventHandler {
  detail: () => Promise<unknown>;
  didNotOccur: () => Promise<true>;
}
/**
 * Wait for a custom event to occur on the browser's `window`
 *
 * @param page - The Playwright Page object
 * @param eventName - The event to listen for
 * @param waitFor - How long to wait before declaring a timeout
 *
 * @returns A handler interface with `detail` and `timeout` methods.
 *   If the event occurs, `detail()` will resolve with `event.detail`
 *   and `didNotOccur()` will reject.
 *   If the event does not occur within `waitFor`, `timeout()` will resolve
 *   and `didNotOccur()` will reject.
 */
export const waitForCustomEvent = (
  locator: Locator,
  eventName: string,
  waitFor = 1000
): CustomEventHandler => {
  const eventReceipt: Promise<{ detail: unknown } | { timeout: true }> =
    locator.evaluate(
      (element, inputs) => {
        return new Promise((resolve) => {
          const handleEvent = (event: Event) => {
            cleanup();
            // `Event`s are not serializable across the `evaluate` boundary
            // Send the detail object explicitly, because it's what we care about
            resolve({ detail: (event as CustomEvent<unknown>).detail });
          };

          const handleTimeout = () => {
            cleanup();
            // Promise rejects from the Browser context do weird things in Playwright
            // Resolve the promise with a custom error payload, instead
            resolve({ timeout: true });
          };

          const cleanup = () => {
            window.clearTimeout(timeoutRef);
            element.removeEventListener(inputs.eventName, handleEvent);
          };

          const timeoutRef = window.setTimeout(handleTimeout, inputs.waitFor);
          element.addEventListener(inputs.eventName, handleEvent, {
            once: true,
          });
        });
      },
      { eventName, waitFor }
    );

  const detail = async () => {
    const result = await eventReceipt;
    if ('timeout' in result) {
      throw new Error(
        `Event "${eventName}" did not occur within ${waitFor} ms`
      );
    }
    return result.detail;
  };

  const didNotOccur = async () => {
    const result = await eventReceipt;
    if ('detail' in result) {
      const payload = JSON.stringify(result.detail);
      throw new Error(`Event "${eventName}" with payload ${payload} occurred`);
    }
    return result.timeout;
  };

  // Rejecting directly from the helper function can confuse Playwright,
  // and cause it to think something has gone wrong in its teardown.
  // (This weird behavior appears to be browser specific).
  // Instead, we return methods to interact with the `eventReceipt` Promise,
  // which Playwright is much happier with.
  return { detail, didNotOccur };
};

export const delay = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
