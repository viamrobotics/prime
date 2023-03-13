import { test, expect } from '@playwright/test';

const customMin = -50
const customMax = 50
const customStart = -20
const customEnd = 30
const value = 15
const step = 25

test.beforeEach(async ({ page }) => {
  await page.goto('/slider-test.html');
});

test('Displays min and max values', async ({ page }) => {
  const sliderMinMax = page.getByTestId('slider-min-max')
  await expect(sliderMinMax).toBeVisible()

  await expect(sliderMinMax.getByText(String(customMin), { exact: true })).toBeVisible()
  // await sliderDefault.locator('span:below(:text("0")').first().click()
  await expect(sliderMinMax.getByText(String(customMax), { exact: true })).toBeVisible()
  // how to check positions of text?
});

test('Displays start and and end values', async ({ page }) => {
  const sliderMinMax = page.getByTestId('slider-min-max')
  const box = await sliderMinMax.boundingBox()
  await expect(sliderMinMax.getByText(String(customStart), { exact: true })).toBeVisible()
  const startPercentage = (customStart - customMin) / (customMax - customMin)
  await expect(sliderMinMax.getByRole('slider').filter({ hasText: String(customStart) })).toHaveCSS('left', String(startPercentage * box.width) + 'px')

  await expect(sliderMinMax.getByText(String(customEnd), { exact: true })).toBeVisible()
  const endPercentage = (customEnd - customMin) / (customMax - customMin)
  await expect(sliderMinMax.getByRole('slider').filter({ hasText: String(customEnd) })).toHaveCSS('left', String(endPercentage * box.width) + 'px')
  // how to test hover functionality? change in opacity

  // const initialColor = await sliderMinMax.getByRole('slider').filter({ hasText: customStart }).evaluate((el) => {
  //   return getComputedStyle(el).opacity;
  // });
  // console.log(initialColor)
});

test('Starts slider at minimum value', async ({ page }) => {
  const sliderMin = page.getByTestId('slider-min')
  await expect(sliderMin).toBeVisible()
  await expect(sliderMin.locator('span.bg-gray-9')).toHaveCSS('left', '0px') // bg-gray-9 is color of slider line
});

test('Ends slider at maximum value', async ({ page }) => {
  const sliderMax = page.getByTestId('slider-max')
  await expect(sliderMax).toBeVisible()
  const box = await sliderMax.boundingBox()
  await expect(sliderMax.locator('span.bg-gray-9')).toHaveCSS('right', '0px')
});

test('Starts slider placement at value', async ({ page }) => {
  const sliderValue = page.getByTestId('slider-value')
  await expect(sliderValue).toBeVisible()
  const box = await sliderValue.boundingBox()
  const valuePercentage = (value - customMin) / (customMax - customMin)
  await expect(sliderValue.getByRole('slider')).toHaveCSS('left', String(box.width * valuePercentage) + 'px')
});

test('Displays axis ticks at intervals of size step', async ({ page }) => {
  const sliderStep = page.getByTestId('slider-step')
  await expect(sliderStep).toBeVisible()
  const axisTicks = await sliderStep.locator('span.bg-gray-6').all()
  const numTicks = ((customMax - customMin) / step) - 1
  await expect(axisTicks.length).toBe(numTicks)
  
  // check positioning of each tick
  const box = await sliderStep.boundingBox()
  for (let i = 0; i < numTicks; i++) {
    await expect(axisTicks[i]).toHaveCSS('left', String((i + 1) / (numTicks + 1) * box.width) + 'px')
  }
});

test('Renders label above slider', async ({ page }) => {
  const sliderLabel = page.getByTestId('slider-label')
  await expect(sliderLabel).toBeVisible()
  await expect(sliderLabel.getByText('sliiide to the left')).toBeVisible()
  await expect(sliderLabel.locator('div.slider:below(:text("sliiide to the left"))').first()).toBeVisible()
});

test('Renders unit suffix with min and max values', async ({ page }) => {
  const sliderSuffix = page.getByTestId('slider-suffix')
  await expect(sliderSuffix).toBeVisible()
  await expect(sliderSuffix.getByText(String(customMin) + ' units', { exact: true })).toBeVisible()
  await expect(sliderSuffix.getByText(String(customMax) + ' units', { exact: true })).toBeVisible()
});

// On: Input

// GIVEN an option is selected using the v-slider element (user dragged slider to a certain value)
// THEN the slider should emit an "input" event with that value

// Disabled

// GIVEN a "disabled" attribute has been applied to the v-slider element
// AND the "disabled" attribute is "true"
// WHEN the element is rendered
// THEN the slider element should render as disabled

// Readonly

// GIVEN a "readonly" attribute of "true" has been applied to the v-slider element
// WHEN the element is rendered
// THEN the slider should render as readonly

// Default

// GIVEN no "min", "max", "step", and "value" have been applied to the v-slider element
// WHEN the element is rendered
// THEN the slider element should render 0 as the min value
// AND 100 as the max value
// AND 50 as the starting value
// AND 1 as the step value

