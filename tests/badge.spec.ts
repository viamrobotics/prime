import { test, expect } from '@playwright/test';

test('Badge E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // Gray Badge Test

  const grayBadge = page.getByText('Inactive')
  
  await expect(grayBadge).toBeVisible()
  await expect(grayBadge).toHaveText("Inactive")
  
  await expect(grayBadge).toHaveCSS("background-color", "rgb(229, 231, 235)")
  await expect(grayBadge).toHaveCSS("color", "rgb(31, 41, 55)")


  // Default Badge Test

  const defaultBadge = page.getByText("Default")
  
  await expect(defaultBadge).toBeVisible()
  await expect(defaultBadge).toHaveText("Default")

  await expect(defaultBadge).toHaveCSS("background-color", "rgb(229, 231, 235)")
  await expect(defaultBadge).toHaveCSS("color", "rgb(31, 41, 55)")

  // Green Badge Test

  const greenBadge = page.getByText("Go")
  
  await expect(greenBadge).toBeVisible()
  await expect(greenBadge).toHaveText("Go")

  await expect(greenBadge).toHaveCSS("background-color", "rgb(187, 247, 208)")
  await expect(greenBadge).toHaveCSS("color", "rgb(20, 83, 45)")

  // Orange Badge Test

  const orangeBadge = page.getByText("Danger")
  
  await expect(orangeBadge).toBeVisible()
  await expect(orangeBadge).toHaveText("Danger")

  await expect(orangeBadge).toHaveCSS("background-color", "rgb(254, 215, 170)")
  await expect(orangeBadge).toHaveCSS("color", "rgb(124, 45, 18)")

  // Red Badge Test

  const redBadge = page.getByText("Unhealthy")
  
  await expect(redBadge).toBeVisible()
  await expect(redBadge).toHaveText("Unhealthy")

  await expect(redBadge).toHaveCSS("background-color", "rgb(254, 202, 202)")
  await expect(redBadge).toHaveCSS("color", "rgb(127, 29, 29)")

});
