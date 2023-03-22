import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/icon-test.html');
});

test('Renders an icon if name attribute is specified as a valid v-icon', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-default-valid')).toBeVisible();
});

test('Does not render an icon if name attribute is specified as an invalid v-icon', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-default-invalid')).not.toBeVisible();
});

test('Renders and icon as extra small if size attribute is specified as xs', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-xs')).toBeVisible();
  await expect(page.getByTestId('icon-size-xs').locator('i')).toHaveClass(
    /text-xs/
  );
});

test('Renders and icon as small if size attribute is specified as sm', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-sm')).toBeVisible();
  await expect(page.getByTestId('icon-size-sm').locator('i')).toHaveClass(
    /text-sm/
  );
});

test('Renders and icon as the base size if size attribute is specified as base', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-base')).toBeVisible();
  await expect(page.getByTestId('icon-size-base').locator('i')).toHaveClass(
    /text-base/
  );
});

test('Renders and icon as the large size if size attribute is specified as lg', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-lg')).toBeVisible();
  await expect(page.getByTestId('icon-size-lg').locator('i')).toHaveClass(
    /text-lg/
  );
});

test('Renders and icon as the extra large size if size attribute is specified as xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-xl')).toBeVisible();
  await expect(page.getByTestId('icon-size-xl').locator('i')).toHaveClass(
    /text-xl/
  );
});

test('Renders and icon as the 2xl size if size attribute is specified as 2xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-2xl')).toBeVisible();
  await expect(page.getByTestId('icon-size-2xl').locator('i')).toHaveClass(
    /text-2xl/
  );
});

test('Renders and icon as the 3xl size if size attribute is specified as 3xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-3xl')).toBeVisible();
  await expect(page.getByTestId('icon-size-3xl').locator('i')).toHaveClass(
    /text-3xl/
  );
});

test('Renders and icon as the 4xl size if size attribute is specified as 4xl', async ({
  page,
}) => {
  await expect(page.getByTestId('icon-size-4xl')).toBeVisible();
  await expect(page.getByTestId('icon-size-4xl').locator('i')).toHaveClass(
    /text-4xl/
  );
});
