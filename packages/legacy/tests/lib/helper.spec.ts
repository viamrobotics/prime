// Tests for test helpers 🤯
import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './helper.js';

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => {
    const div = document.createElement('div');
    // eslint-disable-next-line unicorn/prefer-dom-node-dataset
    div.setAttribute('data-testid', 'test-div');
    document.body.append(div);
  });
});

test('Resolves with the details of a custom event', async ({ page }) => {
  const locator = page.getByTestId('test-div');
  const eventHandler = waitForCustomEvent(locator, 'custom');

  await locator.evaluate((div) => {
    const event = new CustomEvent('custom', { detail: 'hello world' });
    div.dispatchEvent(event);
  });

  await expect(eventHandler.detail()).resolves.toEqual('hello world');
});

test('Rejects with an error if custom event does not happen', async ({
  page,
}) => {
  const locator = page.getByTestId('test-div');
  const eventHandler = waitForCustomEvent(locator, 'custom', 10);

  await expect(eventHandler.detail()).rejects.toThrow(
    /"custom" did not occur/iu
  );
});

test('Resolves with true if event does not happen and timeout expected', async ({
  page,
}) => {
  const locator = page.getByTestId('test-div');
  const eventHandler = waitForCustomEvent(locator, 'custom', 10);

  await expect(eventHandler.didNotOccur()).resolves.toEqual(true);
});

test('Rejects with an error if event occurs and timeout expected', async ({
  page,
}) => {
  const locator = page.getByTestId('test-div');
  const eventHandler = waitForCustomEvent(locator, 'custom');

  await locator.evaluate((div) => {
    const event = new CustomEvent('custom', { detail: 'hello world' });
    div.dispatchEvent(event);
  });

  await expect(eventHandler.didNotOccur()).rejects.toThrow(
    /"custom" .+ occurred/iu
  );
});
