import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/list-box-test.html');
});

test('Renders left options and can move them to the right', async ({ page }) => {

  const leftOption = page.getByText(/Pikachu/i)
  await expect(leftOption).toBeVisible()
  await leftOption.click()
  
  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()


  const movedOption = page.getByText(/Pikachu/i)
  await expect(movedOption).toBeVisible()
});

test('Renders left options and does not move when move left button is clicked', async ({ page }) => {

  const leftOption = page.getByText(/Pikachu/i)
  await expect(leftOption).toBeVisible()
  await leftOption.click()
  
  const leftButton = page.getByTestId(/move-left/i)
  await leftButton.click()

  await expect(leftOption).toBeVisible()
});

test('Renders right options and can move them to the left', async ({ page }) => {

  const rightOption = page.getByText(/Butterfree/i)
  await expect(rightOption).toBeVisible()
  await rightOption.click()
  
  const leftButton = page.getByTestId(/move-right/i)
  await leftButton.click()


  const movedOption = page.getByText(/Butterfree/i)
  await expect(movedOption).toBeVisible()
});

test('Renders right options and does not move when move right button is clicked', async ({ page }) => {

  const rightOption = page.getByText(/Butterfree/i)
  await expect(rightOption).toBeVisible()
  await rightOption.click()
  
  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()

  await expect(rightOption).toBeVisible()
});


test('Only selected options move in the specified direction', async ({ page }) => {

  const leftOption1 = page.getByText(/Charmander/i)
  const leftOption2 = page.getByText(/Pikachu/i)
  const leftOption3 = page.getByText(/Venusaur/i)
  const rightOption = page.getByText(/Butterfree/i)

  await expect(leftOption1).toBeVisible()
  await expect(leftOption2).toBeVisible()
  await expect(leftOption3).toBeVisible()
  await expect(rightOption).toBeVisible()

  await leftOption2.click()
  

  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()

  await expect(leftOption1).toBeVisible()
  await expect(leftOption3).toBeVisible()
  await expect(rightOption).toBeVisible()
});

test('Displays the left empty state', async ({ page }) => {

  await page.getByText(/Charmander/i).click()
  await page.getByText(/Pikachu/i).click()
  await page.getByText(/Venusaur/i).click()

  const rightButton = page.getByTestId(/move-right/i)
  await rightButton.click()
  

  const leftEmpty = page.getByText(/your roster is empty/i)
  await expect(leftEmpty).toBeVisible()
});


test('Displays the right empty state', async ({ page }) => {

  await page.getByText(/Nidoqueen/i).click()
  await page.getByText(/Butterfree/i).click()
  await page.getByText(/Ditto/i).click()
  await page.getByText(/Gyardos/i).click()
  await page.getByText(/Machamp/i).click()
  
  const leftButton = page.getByTestId(/move-left/i)
  await leftButton.click()
  
  const rightEmpty = page.getByText(/this box is empty/i)
  await expect(rightEmpty).toBeVisible()
});