import { type Page } from '@playwright/test';
import config from '../../tailwind.config.cjs';

export const hexToRGB = (color?: string) => {
  const hex = config.theme.extend.colors[color];

  if (!hex) {
    throw new Error(`hex not found for color: ${color}`);
  }

  let alpha = false;
  let h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = Number.parseInt(h, 16);
  return `rgb${alpha ? 'a' : ''}(${h >>> (alpha ? 24 : 16)}, ${
    (h & (alpha ? 0x00_ff_00_00 : 0x00_ff_00)) >>> (alpha ? 16 : 8)
  }, ${(h & (alpha ? 0x00_00_ff_00 : 0x00_00_ff)) >>> (alpha ? 8 : 0)}${
    alpha ? `, ${h & 0x00_00_00_ff}` : ''
  })`;
};

export interface CustomEventPayload {
  detail: unknown;
}

export const waitForCustomEvent = async (
  page: Page,
  eventName: string,
  waitFor: number = 2000
): Promise<CustomEventPayload> => {
  return page.evaluate(
    ({ eventName, waitFor }) => {
      return new Promise((resolve, reject) => {
        let timeoutRef: number | undefined;

        const handleEvent = (event: CustomEvent<unknown>) => {
          cleanup();
          resolve({ detail: event.detail });
        };

        const handleTimeout = () => {
          cleanup();
          reject(new Error(`Waited ${waitFor} ms for "${eventName}" event`));
        };

        const cleanup = () => {
          window.clearTimeout(timeoutRef);
          window.removeEventListener(eventName, handleEvent);
        };

        window.addEventListener(eventName, handleEvent, { once: true });
        timeoutRef = window.setTimeout(handleTimeout, waitFor);
      });
    },
    { eventName, waitFor }
  );
};

export const expectNoEvent = async (
  page: Page,
  eventName: string,
  waitFor: number = 500
): Promise<void> => {
  return page.evaluate(
    ({ eventName, waitFor }) => {
      return new Promise((resolve, reject) => {
        let timeoutRef: number | undefined;

        const handleEvent = (event: CustomEvent<unknown>) => {
          const payload = JSON.stringify(event.detail);

          cleanup();
          reject(
            new Error(
              `Did not expect "${eventName}" event for ${waitFor} ms, but got ${payload}`
            )
          );
        };

        const handleTimeout = () => {
          cleanup();
          resolve();
        };

        const cleanup = () => {
          window.clearTimeout(timeoutRef);
          window.removeEventListener(eventName, handleEvent);
        };

        window.addEventListener(eventName, handleEvent, { once: true });
        timeoutRef = window.setTimeout(handleTimeout, waitFor);
      });
    },
    { eventName, waitFor }
  );
};

export const delay = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
