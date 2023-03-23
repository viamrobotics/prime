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
  await expect(page.getByTestId('notify-default').locator('div')).toHaveClass(
    /border-info-fg/
  );
  await expect(
    page.getByTestId('notify-default').locator('v-icon')
  ).toHaveClass(/text-info-fg/);
  await expect(page.getByTestId('notify-default').locator('div')).toHaveClass(
    /bg-bg-2/
  );
});

test('Renders notify with error style if the variant is set to error', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-error')).toBeVisible();
  await expect(page.getByTestId('notify-variant-error')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-variant-error')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-variant-error').locator('div')
  ).toHaveClass(/border-danger-fg/);
  await expect(
    page.getByTestId('notify-variant-error').locator('v-icon')
  ).toHaveClass(/text-danger-fg/);
});

test('Renders notify with warning style if the variant is set to warning', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-warning')).toBeVisible();
  await expect(page.getByTestId('notify-variant-warning')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-variant-warning')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-variant-warning').locator('div')
  ).toHaveClass(/border-warning-fg/);
  await expect(
    page.getByTestId('notify-variant-warning').locator('svg')
  ).toHaveClass(/fill-warning-fg/);
});

test('Renders notify with success style if the variant is set to success', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-success')).toBeVisible();
  await expect(page.getByTestId('notify-variant-success')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-variant-success')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-variant-success').locator('div')
  ).toHaveClass(/border-success-fg/);
  await expect(
    page.getByTestId('notify-variant-success').locator('v-icon')
  ).toHaveClass(/text-success-fg/);
});

test('Renders notify with info style if the variant is set to info', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-variant-info')).toBeVisible();
  await expect(page.getByTestId('notify-variant-info')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-variant-info')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-variant-info').locator('div')
  ).toHaveClass(/border-info-fg/);
  await expect(
    page.getByTestId('notify-variant-info').locator('v-icon')
  ).toHaveClass(/text-info-fg/);
});

test('Renders notify with gray background if the background attribute is set to gray', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-background-gray')).toBeVisible();
  await expect(page.getByTestId('notify-background-gray')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-background-gray')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-background-gray').locator('div')
  ).toHaveClass(/bg-bg-2/);
});

test('Renders notify with white background if the background attribute is set to white', async ({
  page,
}) => {
  await expect(page.getByTestId('notify-background-white')).toBeVisible();
  await expect(page.getByTestId('notify-background-white')).toHaveText(
    /title text/
  );
  await expect(page.getByTestId('notify-background-white')).toHaveText(
    /message text/
  );
  await expect(
    page.getByTestId('notify-background-white').locator('div')
  ).toHaveClass(/bg-white/);
});

test('Renders notify slot text', async ({ page }) => {
  await expect(page.getByTestId('notify-slot')).toBeVisible();
  await expect(page.getByTestId('notify-slot')).toHaveText(/title text/);
  await expect(page.getByTestId('notify-slot')).toHaveText(/message text/);
  await expect(page.getByTestId('notify-slot')).toHaveText(/slot text/);
});
