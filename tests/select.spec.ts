import { test, expect } from '@playwright/test';

test('user is able to make a selection with mouse', async ({ page }) => {
  await page.goto('/test.html');

  await expect(page.getByLabel(/bobbins/i)).toBeVisible()

  const input = page.getByPlaceholder(/select a bobbins/i).last()

  input.click()
  input.type('bogs')

  const option = page.getByText(/sticky bogs/i)

  await expect(option).toBeVisible()

  option.click()

  await expect(input).toHaveValue(/sticky bogs/i)
});
