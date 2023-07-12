import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/icon-test.html');
});

test('Renders an icon if name attribute is specified as a valid v-icon', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-default-valid')).toBeVisible();
});

test('Does not render an icon if name attribute is specified as an invalid v-icon', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-default-invalid').locator('svg')).toBeHidden();
});

test('Renders and icon as extra small if size attribute is specified as xs', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-xs').locator('svg')).toHaveClass(
    /w-3 h-3/u
  );
});

test('Renders and icon as small if size attribute is specified as sm', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-sm').locator('svg')).toHaveClass(
    /w-3.5 h-3.5/u
  );
});

test('Renders and icon as the base size if size attribute is specified as base', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-base').locator('svg')).toHaveClass(
    /w-4 h-4/u
  );
});

test('Renders and icon as the large size if size attribute is specified as lg', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-lg').locator('svg')).toHaveClass(
    /w-4.5 h-4.5/u
  );
});

test('Renders and icon as the extra large size if size attribute is specified as xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-xl').locator('svg')).toHaveClass(
    /w-5 h-5/u
  );
});

test('Renders and icon as the 2xl size if size attribute is specified as 2xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-2xl').locator('svg')).toHaveClass(
    /w-6 h-6/u
  );
});

test('Renders and icon as the 3xl size if size attribute is specified as 3xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-3xl').locator('svg')).toHaveClass(
    /w-7 h-7/u
  );
});

test('Renders and icon as the 4xl size if size attribute is specified as 4xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-4xl').locator('svg')).toHaveClass(
    /w-8 h-8/u
  );
});
