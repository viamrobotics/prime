import { test, expect } from '@playwright/test';

test('breadcrumbs should render the list of values as pills', async ({ page }) => {
  await page.goto('/test.html');

  // GIVEN a "crumbs" attribute has been applied to the v-breadcrumbs element
  // AND the value passed to the "crumbs" attribute is a comma-separated list of strings
  // WHEN the element is rendered
  // THEN the breadcrumbs should render the list of values as pills

  const breadcrumbs = page.getByText('Chocolate Chip Oatmeal Raisin')
  await expect(breadcrumbs).toBeVisible()
  await expect(breadcrumbs).toHaveCSS('border-color', 'rgb(0, 0, 0)')
  await expect(breadcrumbs).toHaveCSS('border-radius', '9999px')
  await expect(breadcrumbs).toHaveText('Chocolate Chip Oatmeal Raisin')
  await expect(page.getByText(/Chocolate Chip/i)).toBeVisible()
  await expect(page.getByText(/Oatmeal Raisin/i)).toBeVisible()

});

