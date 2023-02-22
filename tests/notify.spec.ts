import { test, expect } from '@playwright/test';

test('Notify displays text properly', async ({ page }) => {
  await page.goto('/test.html');

  //   default success
  await expect(page.getByTestId("notify-default")).toBeVisible()
  await expect(page.getByTestId("notify-default")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-default")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-default").locator("div")).toHaveClass(/border-blue/)
  await expect(page.getByTestId("notify-default").locator("v-icon")).toHaveClass(/text-blue/)
  await expect(page.getByTestId("notify-default").locator("div")).toHaveClass(/bg-gray/)

  // variant error
  await expect(page.getByTestId("notify-variant-error")).toBeVisible()
  await expect(page.getByTestId("notify-variant-error")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-variant-error")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-variant-error").locator("div")).toHaveClass(/border-red/)
  await expect(page.getByTestId("notify-variant-error").locator("v-icon")).toHaveClass(/text-red/)

  // variant warning
  await expect(page.getByTestId("notify-variant-warning")).toBeVisible()
  await expect(page.getByTestId("notify-variant-warning")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-variant-warning")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-variant-warning").locator("div")).toHaveClass(/border-orange/)
  await expect(page.getByTestId("notify-variant-warning").locator("path")).toHaveAttribute("fill","#FF9900")
  
  // variant success
  await expect(page.getByTestId("notify-variant-success")).toBeVisible()
  await expect(page.getByTestId("notify-variant-success")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-variant-success")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-variant-success").locator("div")).toHaveClass(/border-green/)
  await expect(page.getByTestId("notify-variant-success").locator("v-icon")).toHaveClass(/text-green/)

  // variant info
  await expect(page.getByTestId("notify-variant-info")).toBeVisible()
  await expect(page.getByTestId("notify-variant-info")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-variant-info")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-variant-info").locator("div")).toHaveClass(/border-blue/)
  await expect(page.getByTestId("notify-variant-info").locator("v-icon")).toHaveClass(/text-blue/)

  // background gray
  await expect(page.getByTestId("notify-background-gray")).toBeVisible()
  await expect(page.getByTestId("notify-background-gray")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-background-gray")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-background-gray").locator("div")).toHaveClass(/bg-gray/)

  // background white
  await expect(page.getByTestId("notify-background-white")).toBeVisible()
  await expect(page.getByTestId("notify-background-white")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-background-white")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-background-white").locator("div")).toHaveClass(/bg-white/)

  // slot
  await expect(page.getByTestId("notify-slot")).toBeVisible()
  await expect(page.getByTestId("notify-slot")).toHaveText(/title text/)
  await expect(page.getByTestId("notify-slot")).toHaveText(/message text/)
  await expect(page.getByTestId("notify-slot")).toHaveText(/slot text/)
});
