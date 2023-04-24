import { test, expect } from '@playwright/test';
import { hexToRGB } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/badge-test.html');
});

test('Renders the correct text', async ({ page }) => {
  await expect(page.getByText('Inactive')).toBeVisible();
});

test('Renders a gray badge if the variant is specified as gray', async ({
  page,
}) => {
  const grayBadge = page.getByText('Inactive');
  await expect(grayBadge).toHaveCSS(
    'background-color',
    hexToRGB('disabled-light')
  );
  await expect(grayBadge).toHaveCSS('color', hexToRGB('text-default'));
});

test('Renders a gray badge if the variant is not specified', async ({
  page,
}) => {
  const defaultBadge = page.getByText('Default');
  await expect(defaultBadge).toHaveCSS(
    'background-color',
    hexToRGB('disabled-light')
  );
  await expect(defaultBadge).toHaveCSS('color', hexToRGB('text-default'));
});

test('Renders a green badge if the variant is specified as green', async ({
  page,
}) => {
  const greenBadge = page.getByText('Go', { exact: true });
  await expect(greenBadge).toHaveCSS(
    'background-color',
    hexToRGB('success-light')
  );
  await expect(greenBadge).toHaveCSS('color', hexToRGB('success-dark'));
});

test('Renders an orange badge if the variant is specified as orange', async ({
  page,
}) => {
  const orangeBadge = page.getByText('Danger');
  await expect(orangeBadge).toHaveCSS(
    'background-color',
    hexToRGB('warning-light')
  );
  await expect(orangeBadge).toHaveCSS('color', hexToRGB('warning-dark'));
});

test('Renders a red badge if the variant is specified as red', async ({
  page,
}) => {
  const redBadge = page.getByText('Unhealthy');
  await expect(redBadge).toHaveCSS(
    'background-color',
    hexToRGB('danger-light')
  );
  await expect(redBadge).toHaveCSS('color', hexToRGB('danger-dark'));
});

test('Renders a blue badge if the variant is specified as blue', async ({
  page,
}) => {
  const blueBadge = page.getByText('Info');
  await expect(blueBadge).toHaveCSS('background-color', hexToRGB('info-light'));
  await expect(blueBadge).toHaveCSS('color', hexToRGB('info-dark'));
});
