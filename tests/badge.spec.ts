import { test, expect } from '@playwright/test';
import { Children } from 'react';

test('Badge E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // Gray Badge Test

  const grayBadge = page.getByTestId("gray")
  
  await expect(grayBadge).toBeVisible()
  await expect(grayBadge).toHaveText("Inactive")

  const childGrayBadge = grayBadge.locator('small').nth(0)
  
  await expect(childGrayBadge).toHaveCSS("background-color", "rgb(229, 231, 235)")
  await expect(childGrayBadge).toHaveCSS("color", "rgb(31, 41, 55)")


  // Default Badge Test

  const defaultBadge = page.getByTestId("default")
  
  await expect(defaultBadge).toBeVisible()
  await expect(defaultBadge).toHaveText("Default")

  const childDefaultBadge = defaultBadge.locator('small').nth(0)

  await expect(childDefaultBadge).toHaveCSS("background-color", "rgb(229, 231, 235)")
  await expect(childDefaultBadge).toHaveCSS("color", "rgb(31, 41, 55)")

  // Green Badge Test

  const greenBadge = page.getByTestId("green")
  
  await expect(greenBadge).toBeVisible()
  await expect(greenBadge).toHaveText("Active")

  const childGreenBadge = greenBadge.locator('small').nth(0)

  await expect(childGreenBadge).toHaveCSS("background-color", "rgb(187, 247, 208)")
  await expect(childGreenBadge).toHaveCSS("color", "rgb(20, 83, 45)")

  // Orange Badge Test

  const orangeBadge = page.getByTestId("orange")
  
  await expect(orangeBadge).toBeVisible()
  await expect(orangeBadge).toHaveText("Danger")

  const childOrangeBadge = orangeBadge.locator('small').nth(0)

  await expect(childOrangeBadge).toHaveCSS("background-color", "rgb(254, 215, 170)")
  await expect(childOrangeBadge).toHaveCSS("color", "rgb(124, 45, 18)")

  // Red Badge Test

  const redBadge = page.getByTestId("red")
  
  await expect(redBadge).toBeVisible()
  await expect(redBadge).toHaveText("Unhealthy")

  const childRedBadge = redBadge.locator('small').nth(0)

  await expect(childRedBadge).toHaveCSS("background-color", "rgb(254, 202, 202)")
  await expect(childRedBadge).toHaveCSS("color", "rgb(127, 29, 29)")

});
