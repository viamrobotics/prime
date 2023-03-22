import { expect, Page } from '@playwright/test';
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

export const waitForCustomEvent = async (
  page: Page,
  customEventName: string
) => {
  return page.evaluate(
    (eventName) =>
      new Promise((callback) =>
        window.addEventListener(eventName, callback, { once: true })
      ),
    customEventName
  );
};

export const waitForCustomEventTimeout = async (
  page: Page,
  customEventName: string
) => {
  const value = await Promise.race([
    page.evaluate(
      (eventName) =>
        new Promise((callback) =>
          window.addEventListener(eventName, callback, { once: true })
        ),
      customEventName
    ),
    new Promise((resolve) => {
      setTimeout(resolve, 500, 'timeout');
    }),
  ]);

  expect(value).toBe('timeout');
};

// This function adds an event listener for eventName and puts the value of paramName on the window
export const waitForCustomEventWithParam = async (
  page: Page,
  eventName: string,
  paramName: string
) => {
  return page.evaluate(
    (eventInfo) => {
      function listener(event) {
        const dispatchedEvent = {
          [eventInfo.eventName]: {
            [eventInfo.paramName]: event.detail[eventInfo.paramName],
          },
        };
        window['__testingCustomEvents'] = dispatchedEvent;
      }
      return new Promise((resolve) => {
        window.addEventListener(eventInfo.eventName, listener, { once: true });
        resolve(eventInfo.eventName + ' event called!');
      });
    },
    { eventName, paramName }
  );
};

// This function retrieves the dispatched event's parameter value, as set by waitForCustomEventWithParam()
// Call this only after setting up an event listener with waitForCustomEventWithParam()
export const getCustomEventParam = async (
  page: Page,
  eventName: string,
  paramName: string
) => {
  return page.evaluate(
    `window.__testingCustomEvents.${eventName}.${paramName}`
  );
};
