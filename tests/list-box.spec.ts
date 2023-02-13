import { test, expect } from '@playwright/test';

test('Renders left options and can move them to the right', async ({ page }) => {
  await page.goto('/test.html');

  const leftOption = page.getByText(/Pikachu/i)
  await expect(leftOption).toBeVisible()
  await leftOption.click()
  
  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()


  const movedOption = page.getByText(/Pikachu/i)
  await expect(movedOption).toBeVisible()
});

test('Renders left options and does not move when move left button is clicked', async ({ page }) => {
  await page.goto('/test.html');

  const leftOption = page.getByText(/Pikachu/i)
  await expect(leftOption).toBeVisible()
  await leftOption.click()
  
  const leftButton = page.getByTestId(/move-left/i)
  await leftButton.click()

  await expect(leftOption).toBeVisible()
});

test('Renders right options and can move them to the left', async ({ page }) => {
  await page.goto('/test.html');

  const rightOption = page.getByText(/Butterfree/i)
  await expect(rightOption).toBeVisible()
  await rightOption.click()
  
  const leftButton = page.getByTestId(/move-right/i)
  await leftButton.click()


  const movedOption = page.getByText(/Butterfree/i)
  await expect(movedOption).toBeVisible()
});

test('Renders right options and does not move when move right button is clicked', async ({ page }) => {
  await page.goto('/test.html');

  const rightOption = page.getByText(/Butterfree/i)
  await expect(rightOption).toBeVisible()
  await rightOption.click()
  
  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()

  await expect(rightOption).toBeVisible()
});

