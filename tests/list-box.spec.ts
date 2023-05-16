import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/list-box-test.html');
});

test('Renders left options and can move them to the right', async ({
  page,
}) => {
  const leftOption = page.getByText(/pikachu/iu);
  await expect(leftOption).toBeVisible();
  await leftOption.click();

  const rightButton = page.getByTestId(/move-right/iu);
  await rightButton.click();

  const movedOption = page.getByText(/pikachu/iu);
  await expect(movedOption).toBeVisible();
});

test('Renders left options and does not move when move left button is clicked', async ({
  page,
}) => {
  const leftOption = page.getByText(/pikachu/iu);
  await expect(leftOption).toBeVisible();
  await leftOption.click();

  const leftButton = page.getByTestId(/move-left/iu);
  await leftButton.click();

  await expect(leftOption).toBeVisible();
});

test('Renders right options and can move them to the left', async ({
  page,
}) => {
  const rightOption = page.getByText(/butterfree/iu);
  await expect(rightOption).toBeVisible();
  await rightOption.click();

  const leftButton = page.getByTestId(/move-right/iu);
  await leftButton.click();

  const movedOption = page.getByText(/butterfree/iu);
  await expect(movedOption).toBeVisible();
});

test('Renders right options and does not move when move right button is clicked', async ({
  page,
}) => {
  const rightOption = page.getByText(/butterfree/iu);
  await expect(rightOption).toBeVisible();
  await rightOption.click();

  const rightButton = page.getByTestId(/move-right/iu);
  await rightButton.click();

  await expect(rightOption).toBeVisible();
});

test('Only selected options move in the specified direction', async ({
  page,
}) => {
  const leftOption1 = page.getByText(/charmander/iu);
  const leftOption2 = page.getByText(/pikachu/iu);
  const leftOption3 = page.getByText(/venusaur/iu);
  const rightOption = page.getByText(/butterfree/iu);

  await expect(leftOption1).toBeVisible();
  await expect(leftOption2).toBeVisible();
  await expect(leftOption3).toBeVisible();
  await expect(rightOption).toBeVisible();

  await leftOption2.click();

  const rightButton = page.getByTestId(/move-right/iu);
  await rightButton.click();

  await expect(leftOption1).toBeVisible();
  await expect(leftOption3).toBeVisible();
  await expect(rightOption).toBeVisible();
});

test('Displays the left empty state', async ({ page }) => {
  await page.getByText(/charmander/iu).click();
  await page.getByText(/pikachu/iu).click();
  await page.getByText(/venusaur/iu).click();

  const rightButton = page.getByTestId(/move-right/iu);
  await rightButton.click();

  const leftEmpty = page.getByText(/your roster is empty/iu);
  await expect(leftEmpty).toBeVisible();
});

test('Displays the right empty state', async ({ page }) => {
  await page.getByText(/nidoqueen/iu).click();
  await page.getByText(/butterfree/iu).click();
  await page.getByText(/ditto/iu).click();
  await page.getByText(/gyardos/iu).click();
  await page.getByText(/machamp/iu).click();

  const leftButton = page.getByTestId(/move-left/iu);
  await leftButton.click();

  const rightEmpty = page.getByText(/this box is empty/iu);
  await expect(rightEmpty).toBeVisible();
});
