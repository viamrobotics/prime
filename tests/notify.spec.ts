import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/notify-test.html');
});

test('Renders notify element with appropriate title text, message text, if those attributes are specified', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-default')).toBeVisible();
  await expect(page.getByTestId('notify-default')).toHaveText(/title text/);
  await expect(page.getByTestId('notify-default')).toHaveText(/message text/);
});

test('Renders notify with default style if no variant is specified', async ({
  page,
}) => {
  await expect(
    page.getByTestId('notify-default').locator('.bg-info-dark')
  ).toBeVisible();
  await expect(
    page.getByTestId('notify-default').locator('v-icon')
  ).toHaveClass(/text-info-dark/);
});

test('Renders notify with danger style if the variant is set to danger', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-danger')).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-danger').locator('.bg-danger-dark')
  ).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-danger').locator('v-icon')
  ).toHaveClass(/text-danger-dark/);
});

test('Renders notify with warning style if the variant is set to warning', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-warning')).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-warning').locator('.bg-warning-bright')
  ).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-warning').locator('svg')
  ).toHaveClass(/fill-warning-bright/);
});

test('Renders notify with success style if the variant is set to success', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-success')).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-success').locator('.bg-success-dark')
  ).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-success').locator('v-icon')
  ).toHaveClass(/text-success-dark/);
});

test('Renders notify with info style if the variant is set to info', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-info')).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-info').locator('.bg-info-dark')
  ).toBeVisible();
  await expect(
    page.getByTestId('notify-variant-info').locator('v-icon')
  ).toHaveClass(/text-info-dark/);
});

test('Renders notify slot text', async ({ page }) => {
  await expect(page.getByTestId('notify-slot')).toBeVisible();
  await expect(page.getByTestId('notify-slot')).toHaveText(/title text/);
  await expect(page.getByTestId('notify-slot')).toHaveText(/message text/);
  await expect(page.getByTestId('notify-slot')).toHaveText(/slot text/);
});
