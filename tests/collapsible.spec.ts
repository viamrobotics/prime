import { test, expect } from '@playwright/test';

test('collapsible shows and hides child content', async ({ page }) => {
  await page.goto('http://localhost:1000/test.html');

  const collapseTitle = page.getByText(/click to find out!/i)

  await expect(collapseTitle).toBeVisible()

  await expect(page.getByText(/you found out!/i)).not.toBeVisible()

  collapseTitle.click()

  await expect(page.getByText(/you found out!/i)).toBeVisible()

  collapseTitle.click()

  await expect(page.getByText(/you found out!/i)).toBeVisible()
});
