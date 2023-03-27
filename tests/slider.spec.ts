import { test, expect } from '@playwright/test';
import {
  delay,
  waitForCustomEventWithParam,
  getCustomEventParam,
  waitForCustomEventTimeout,
  hexToRGB,
} from './lib/helper.ts';

const customMin = -50;
const customMax = 50;
const customStart = -20;
const customEnd = 30;
const value = 15;
const step = 25;

test.beforeEach(async ({ page }) => {
  await page.goto('/slider-test.html');
});

test('Displays min and max values', async ({ page }) => {
  const sliderMinMax = page.getByTestId('slider-min-max');
  await expect(sliderMinMax).toBeVisible();

  await expect(
    sliderMinMax.getByText(String(customMin), { exact: true })
  ).toBeVisible();
  await expect(
    sliderMinMax.getByText(String(customMax), { exact: true })
  ).toBeVisible();
});

test('Displays start and and end values', async ({ page }) => {
  const sliderMinMax = page.getByTestId('slider-min-max');
  await expect(sliderMinMax).toBeVisible();
  const box = await sliderMinMax.boundingBox();
  await expect(
    sliderMinMax.getByText(String(customStart), { exact: true })
  ).toBeVisible();
  const startPercentage = (customStart - customMin) / (customMax - customMin);
  let startLabelPos = await sliderMinMax
    .getByRole('slider')
    .filter({ hasText: String(customStart) })
    .evaluate((e) => {
      return getComputedStyle(e).left;
    });
  await expect(Number.parseFloat(startLabelPos)).toBeCloseTo(
    startPercentage * box.width,
    1
  );

  await expect(
    sliderMinMax.getByText(String(customEnd), { exact: true })
  ).toBeVisible();

  const endPercentage = (customEnd - customMin) / (customMax - customMin);
  let endLabelPos = await sliderMinMax
    .getByRole('slider')
    .filter({ hasText: String(customEnd) })
    .evaluate((e) => {
      return getComputedStyle(e).left;
    });
  await expect(Number.parseFloat(endLabelPos)).toBeCloseTo(
    endPercentage * box.width,
    1
  );

  // check that slider labels are not visible until on hover
  await expect(await sliderMinMax.locator('.floating').count()).toBe(2);

  let startLabelOpacity = await sliderMinMax
    .locator('.floating')
    .first()
    .evaluate((e) => {
      return getComputedStyle(e).opacity;
    });
  expect(startLabelOpacity).toBe('0');
  await sliderMinMax.getByRole('slider').first().hover();
  await delay(250); // wait for opacity transition
  startLabelOpacity = await sliderMinMax
    .locator('.floating')
    .first()
    .evaluate((e) => {
      return getComputedStyle(e).opacity;
    });
  expect(startLabelOpacity).toBe('1');

  let endLabelOpacity = await sliderMinMax
    .locator('.floating')
    .nth(1)
    .evaluate((e) => {
      return getComputedStyle(e).opacity;
    });
  expect(endLabelOpacity).toBe('0');
  await sliderMinMax.getByRole('slider').nth(1).hover();
  await delay(250); // wait for opacity transition
  endLabelOpacity = await sliderMinMax
    .locator('.floating')
    .nth(1)
    .evaluate((e) => {
      return getComputedStyle(e).opacity;
    });
  expect(endLabelOpacity).toBe('1');
});

test('Starts slider at minimum value', async ({ page }) => {
  const sliderMin = page.getByTestId('slider-min');
  await expect(sliderMin).toBeVisible();
  await expect(sliderMin.locator('span.bg-gray-9')).toHaveCSS('left', '0px'); // bg-gray-9 is color of slider line
});

test('Ends slider at maximum value', async ({ page }) => {
  const sliderMax = page.getByTestId('slider-max');
  await expect(sliderMax).toBeVisible();
  const box = await sliderMax.boundingBox();
  await expect(sliderMax.locator('span.bg-gray-9')).toHaveCSS('right', '0px');
});

test('Starts slider placement at value', async ({ page }) => {
  const sliderValue = page.getByTestId('slider-value');
  await expect(sliderValue).toBeVisible();
  const box = await sliderValue.boundingBox();
  const valuePercentage = (value - customMin) / (customMax - customMin);
  let sliderPos = await sliderValue.getByRole('slider').evaluate((e) => {
    return getComputedStyle(e).left;
  });
  await expect(Number.parseFloat(sliderPos)).toBeCloseTo(
    box.width * valuePercentage,
    1
  );
});

test('Displays axis ticks at intervals of size step', async ({ page }) => {
  // for reasonable step size, axis ticks display at intervals of size step
  // does not hold true for relatively small step sizes
  const sliderStep = page.getByTestId('slider-step');
  await expect(sliderStep).toBeVisible();
  const axisTicks = await sliderStep.locator('span.bg-gray-6').all();
  const numTicks = (customMax - customMin) / step - 1;
  await expect(axisTicks.length).toBe(numTicks);

  // check positioning of each tick
  const box = await sliderStep.boundingBox();
  for (let i = 0; i < numTicks; i++) {
    let tickPos = await axisTicks[i].evaluate((e) => {
      return getComputedStyle(e).left;
    });
    await expect(Number.parseFloat(tickPos)).toBeCloseTo(
      ((i + 1) / (numTicks + 1)) * box.width,
      1
    );
  }
});

test('Restricts slider value to intervals of size step', async ({ page }) => {
  const sliderStep = await page.getByTestId('slider-step');
  const slider = await sliderStep.getByRole('slider');
  const isInputEventDispatched = await waitForCustomEventWithParam(
    page,
    'input',
    'value'
  );
  await expect(sliderStep).toBeVisible();
  const axisBox = await sliderStep.boundingBox();
  // slide a random amount, ensuring slide is large enough to change value
  const randomSlide =
    -1 *
    Math.sign(Math.random() - 0.5) *
    (Math.random() * ((3 * axisBox.width) / 8) + axisBox.width / 8);
  await slider.dragTo(slider, {
    targetPosition: { x: randomSlide, y: 0 },
    force: true,
  });
  await expect(isInputEventDispatched).toBeTruthy();
  await expect(
    Math.abs((await getCustomEventParam(page, 'input', 'value')) % 25)
  ).toBe(0);
});

test('Renders label above slider', async ({ page }) => {
  const sliderLabel = page.getByTestId('slider-label');
  await expect(sliderLabel).toBeVisible();
  await expect(sliderLabel.getByText('sliiide to the left')).toBeVisible();
  await expect(
    sliderLabel
      .locator('div.slider:below(:text("sliiide to the left"))')
      .first()
  ).toBeVisible();
});

test('Renders unit suffix with min and max values', async ({ page }) => {
  const sliderSuffix = page.getByTestId('slider-suffix');
  await expect(sliderSuffix).toBeVisible();
  await expect(
    sliderSuffix.getByText(String(customMin) + ' units', { exact: true })
  ).toBeVisible();
  await expect(
    sliderSuffix.getByText(String(customMax) + ' units', { exact: true })
  ).toBeVisible();
});

test('Dispatches "input" event with value when user drags slider to value', async ({
  page,
}) => {
  const sliderValue = page.getByTestId('slider-value');

  const slider = sliderValue.getByRole('slider');
  const isInputEventDispatched = await waitForCustomEventWithParam(
    page,
    'input',
    'value'
  );
  await slider.dragTo(await sliderValue.locator('span.bg-gray-6').first()); // slide to first tick, value -45
  await expect(isInputEventDispatched).toBeTruthy();
  await expect(await getCustomEventParam(page, 'input', 'value')).toBe(-45);
});

test('Given disabled attribute as true, displays slider as disabled and prevents interaction', async ({
  page,
}) => {
  const sliderDisabled = page.getByTestId('slider-disabled');
  const slider = sliderDisabled.getByRole('slider');
  const startBox = await slider.boundingBox();
  await expect(sliderDisabled).toBeVisible();
  const isInputEventDispatched = await waitForCustomEventTimeout(page, 'input');
  await slider.dragTo(await sliderDisabled.locator('span.bg-gray-6').first()); // try to slide
  const endBox = await slider.boundingBox();
  // make sure slider did not move
  await expect(endBox.x).toBe(startBox.x);
  await expect(endBox.y).toBe(startBox.y);
  await isInputEventDispatched;

  await expect(sliderDisabled.getByText('0', { exact: true })).toHaveCSS(
    'color',
    hexToRGB('text-disabled')
  );
  await expect(sliderDisabled.getByText('100', { exact: true })).toHaveCSS(
    'color',
    hexToRGB('text-disabled')
  );
  await expect(sliderDisabled.getByText('disabled', { exact: true })).toHaveCSS(
    'color',
    hexToRGB('text-disabled')
  );
});

test('Given readonly attribute as true, displays slider as readonly and prevents interaction', async ({
  page,
}) => {
  const sliderReadonly = page.getByTestId('slider-readonly');
  const slider = sliderReadonly.getByRole('slider');
  const startBox = await slider.boundingBox();
  await expect(sliderReadonly).toBeVisible();
  const isInputEventDispatched = await waitForCustomEventTimeout(page, 'input');
  await slider.dragTo(await sliderReadonly.locator('span.bg-gray-6').first()); // try to slide
  const endBox = await slider.boundingBox();
  // make sure slider did not move
  await expect(endBox.x).toBe(startBox.x);
  await expect(endBox.y).toBe(startBox.y);
  await isInputEventDispatched;

  await expect(sliderReadonly.getByText('0', { exact: true })).toHaveCSS(
    'color',
    'rgb(0, 0, 0)'
  );
  await expect(sliderReadonly.getByText('100', { exact: true })).toHaveCSS(
    'color',
    'rgb(0, 0, 0)'
  );
  await expect(sliderReadonly.getByText('readonly', { exact: true })).toHaveCSS(
    'color',
    'rgb(0, 0, 0)'
  );
});

test('Given no attributes, renders slider with { min: 0, max: 100, value: 50, step: 1 }', async ({
  page,
}) => {
  const sliderDefault = page.getByTestId('slider-default');
  await expect(sliderDefault.getByText('0', { exact: true })).toBeVisible();
  await expect(sliderDefault.getByText('50', { exact: true })).toBeVisible();
  await expect(sliderDefault.getByText('100', { exact: true })).toBeVisible();

  // check step: 1 by sliding from 50 to 49
  const slider = await sliderDefault.getByRole('slider');
  const isInputEventDispatched = await waitForCustomEventWithParam(
    page,
    'input',
    'value'
  );
  await expect(slider).toBeVisible();
  const box = await slider.boundingBox();
  await slider.dragTo(slider, { targetPosition: { x: -5, y: 0 } });
  await expect(await getCustomEventParam(page, 'input', 'value')).toBe(49);
});
