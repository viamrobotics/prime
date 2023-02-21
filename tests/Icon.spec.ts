import { test, expect } from '@playwright/test';

test('Icons render as expected', async ({ page }) => {
    await page.goto('/test.html');

    // default valid
    await expect(page.getByTestId("icon-default-valid")).toBeVisible()
    // default invalid
    await expect(page.getByTestId("icon-default-invalid")).not.toBeVisible()
    // size-xs
    await expect(page.getByTestId("icon-size-xs")).toBeVisible()
    await expect(page.getByTestId("icon-size-xs").locator('i')).toHaveClass(/text-xs/)
    // size-sm
    await expect(page.getByTestId("icon-size-sm")).toBeVisible()
    await expect(page.getByTestId("icon-size-sm").locator('i')).toHaveClass(/text-sm/)
    // size-base
    await expect(page.getByTestId("icon-size-base")).toBeVisible()
    await expect(page.getByTestId("icon-size-base").locator('i')).toHaveClass(/text-base/)
    // size-lg
    await expect(page.getByTestId("icon-size-lg")).toBeVisible()
    await expect(page.getByTestId("icon-size-lg").locator('i')).toHaveClass(/text-lg/)
    // size-xl
    await expect(page.getByTestId("icon-size-xl")).toBeVisible()
    await expect(page.getByTestId("icon-size-xl").locator('i')).toHaveClass(/text-xl/)
    // size-2xl
    await expect(page.getByTestId("icon-size-2xl")).toBeVisible()
    await expect(page.getByTestId("icon-size-2xl").locator('i')).toHaveClass(/text-2xl/)
    // size-3xl
    await expect(page.getByTestId("icon-size-3xl")).toBeVisible()
    await expect(page.getByTestId("icon-size-3xl").locator('i')).toHaveClass(/text-3xl/)
    // size-4xl
    await expect(page.getByTestId("icon-size-4xl")).toBeVisible()
    await expect(page.getByTestId("icon-size-4xl").locator('i')).toHaveClass(/text-4xl/)
});
