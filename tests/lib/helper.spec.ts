// Tests for test helpers 🤯
import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './helper.js';

test('Resolves with the details of a custom event', async ({ page }) => {
  const eventHandler = waitForCustomEvent(page, 'custom');

  await page.evaluate(() => {
    const event = new CustomEvent('custom', { detail: 'hello world' });
    window.dispatchEvent(event);
  });

  await expect(eventHandler.detail()).resolves.toEqual('hello world');
});

test('Rejects with an error if custom event does not happen', async ({
  page,
}) => {
  const eventHandler = waitForCustomEvent(page, 'custom', 10);

  await expect(eventHandler.detail()).rejects.toThrow(
    /"custom" did not occur/i
  );
});

test('Resolves with true if event does not happen and timeout expected', async ({
  page,
}) => {
  const eventHandler = waitForCustomEvent(page, 'custom', 10);

  await expect(eventHandler.didNotOccur()).resolves.toEqual(true);
});

test('Rejects with an error if event occurs and timeout expected', async ({
  page,
}) => {
  const eventHandler = waitForCustomEvent(page, 'custom');

  await page.evaluate(() => {
    const event = new CustomEvent('custom', { detail: 'hello world' });
    window.dispatchEvent(event);
  });

  await expect(eventHandler.didNotOccur()).rejects.toThrow(
    /"custom" .+ occurred/i
  );
});
