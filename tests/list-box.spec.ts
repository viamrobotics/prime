import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/list-box-test.html');
});

test('Renders left options and can move them to the right', async ({
  page,
}) => {
  const leftOption = page.getByText(/pikachu/i);
  await expect(leftOption).toBeVisible();
  await leftOption.click();

  const rightButton = page.getByTestId(/move-right/i);
  await rightButton.click();

  const movedOption = page.getByText(/pikachu/i);
  await expect(movedOption).toBeVisible();
});

test('Renders left options and does not move when move left button is clicked', async ({
  page,
}) => {
  const leftOption = page.getByText(/pikachu/i);
  await expect(leftOption).toBeVisible();
  await leftOption.click();

  const leftButton = page.getByTestId(/move-left/i);
  await leftButton.click();

  await expect(leftOption).toBeVisible();
});

test('Renders right options and can move them to the left', async ({
  page,
}) => {
  const rightOption = page.getByText(/butterfree/i);
  await expect(rightOption).toBeVisible();
  await rightOption.click();

  const leftButton = page.getByTestId(/move-right/i);
  await leftButton.click();

  const movedOption = page.getByText(/butterfree/i);
  await expect(movedOption).toBeVisible();
});

test('Renders right options and does not move when move right button is clicked', async ({
  page,
}) => {
  const rightOption = page.getByText(/butterfree/i);
  await expect(rightOption).toBeVisible();
  await rightOption.click();

  const rightButton = page.getByTestId(/move-right/i);
  await rightButton.click();

  await expect(rightOption).toBeVisible();
});

test('Only selected options move in the specified direction', async ({
  page,
}) => {
  const leftOption1 = page.getByText(/charmander/i);
  const leftOption2 = page.getByText(/pikachu/i);
  const leftOption3 = page.getByText(/venusaur/i);
  const rightOption = page.getByText(/butterfree/i);

  await expect(leftOption1).toBeVisible();
  await expect(leftOption2).toBeVisible();
  await expect(leftOption3).toBeVisible();
  await expect(rightOption).toBeVisible();

  await leftOption2.click();

  const rightButton = page.getByTestId(/move-right/i);
  await rightButton.click();

  await expect(leftOption1).toBeVisible();
  await expect(leftOption3).toBeVisible();
  await expect(rightOption).toBeVisible();
});

test('Displays the left empty state', async ({ page }) => {
  await page.getByText(/charmander/i).click();
  await page.getByText(/pikachu/i).click();
  await page.getByText(/venusaur/i).click();

  const rightButton = page.getByTestId(/move-right/i);
  await rightButton.click();

  const leftEmpty = page.getByText(/your roster is empty/i);
  await expect(leftEmpty).toBeVisible();
});

test('Displays the right empty state', async ({ page }) => {
  await page.getByText(/nidoqueen/i).click();
  await page.getByText(/butterfree/i).click();
  await page.getByText(/ditto/i).click();
  await page.getByText(/gyardos/i).click();
  await page.getByText(/machamp/i).click();

  const leftButton = page.getByTestId(/move-left/i);
  await leftButton.click();

  const rightEmpty = page.getByText(/this box is empty/i);
  await expect(rightEmpty).toBeVisible();
});
