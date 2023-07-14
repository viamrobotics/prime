import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/breadcrumb-test.html');
});

test('Renders breadcrumbs with the list of values specified in crumbs attribute as pills', async ({
  page,
}) => {
  const breadcrumbs = page.getByText('Chocolate Chip Oatmeal Raisin');
  await expect(breadcrumbs).toBeVisible();
  await expect(breadcrumbs).toHaveText('Chocolate Chip Oatmeal Raisin');
  await expect(page.getByText(/chocolate chip/iu)).toBeVisible();
  await expect(page.getByText(/oatmeal raisin/iu)).toBeVisible();
});
