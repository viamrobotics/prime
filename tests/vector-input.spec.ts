import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/vector-input-test.html');
});

test('Renders the default vector input with x, y, z placeholders, a step of 1, and input type text', async ({
  page,
}) => {
  const vectorInputDefault = page.getByTestId('vector-input-default');

  await expect(vectorInputDefault).toBeVisible();

  const dimensionCount = await vectorInputDefault.locator('input').count();
  expect(dimensionCount).toBe(3);

  // Placeholders are x, y, and z
  const xPlaceholderValue = await vectorInputDefault
    .locator('input')
    .nth(0)
    .getAttribute('placeholder');
  expect(xPlaceholderValue).toBe('x');
  const yPlaceholderValue = await vectorInputDefault
    .locator('input')
    .nth(1)
    .getAttribute('placeholder');
  expect(yPlaceholderValue).toBe('y');
  const zPlaceholderValue = await vectorInputDefault
    .locator('input')
    .nth(2)
    .getAttribute('placeholder');
  expect(zPlaceholderValue).toBe('z');

  // Starting x value is ''
  const xInput = vectorInputDefault.locator('input').nth(0);
  expect(await xInput.inputValue()).toBe('');

  // x input step default increments up 1
  await xInput.focus();
  await xInput.press('ArrowUp');
  expect(await xInput.inputValue()).toBe('1');

  // x input step default decrements down 1
  await xInput.focus();
  await xInput.press('ArrowDown');
  expect(await xInput.inputValue()).toBe('0');

  // y default step tests
  const yInput = vectorInputDefault.locator('input').nth(1);
  expect(await yInput.inputValue()).toBe('');

  await yInput.focus();
  await yInput.press('ArrowUp');
  expect(await yInput.inputValue()).toBe('1');

  await yInput.focus();
  await yInput.press('ArrowDown');
  expect(await yInput.inputValue()).toBe('0');

  // z default step tests
  const zInput = vectorInputDefault.locator('input').nth(2);
  expect(await zInput.inputValue()).toBe('');

  await zInput.focus();
  await zInput.press('ArrowUp');
  expect(await zInput.inputValue()).toBe('1');

  await zInput.focus();
  await zInput.press('ArrowDown');
  expect(await zInput.inputValue()).toBe('0');

  // input type tests
  const xTypeValue = await vectorInputDefault
    .locator('input')
    .nth(0)
    .getAttribute('type');
  expect(xTypeValue).toBe('text');
  const yTypeValue = await vectorInputDefault
    .locator('input')
    .nth(1)
    .getAttribute('type');
  expect(yTypeValue).toBe('text');
  const zTypeValue = await vectorInputDefault
    .locator('input')
    .nth(2)
    .getAttribute('type');
  expect(zTypeValue).toBe('text');
});

test('Renders three inputs with type text if number type specified', async ({
  page,
}) => {
  const vectorInputNumType = page.getByTestId('vector-input-type-number');

  await expect(vectorInputNumType).toBeVisible();

  const xTypeValue = await vectorInputNumType
    .locator('input')
    .nth(0)
    .getAttribute('type');
  expect(xTypeValue).toBe('text');
  const yTypeValue = await vectorInputNumType
    .locator('input')
    .nth(1)
    .getAttribute('type');
  expect(yTypeValue).toBe('text');
  const zTypeValue = await vectorInputNumType
    .locator('input')
    .nth(2)
    .getAttribute('type');
  expect(zTypeValue).toBe('text');
});

test('Renders three inputs with type number if integer type specified', async ({
  page,
}) => {
  const vectorInputTypeInteger = page.getByTestId('vector-input-type-integer');

  const xTypeValue = await vectorInputTypeInteger
    .locator('input')
    .nth(0)
    .getAttribute('type');
  expect(xTypeValue).toBe('number');
  const yTypeValue = await vectorInputTypeInteger
    .locator('input')
    .nth(1)
    .getAttribute('type');
  expect(yTypeValue).toBe('number');
  const zTypeValue = await vectorInputTypeInteger
    .locator('input')
    .nth(2)
    .getAttribute('type');
  expect(zTypeValue).toBe('number');
});

test('When inputs are updated, events fire', async ({ page }) => {
  const vectorInputOnInput = page.getByTestId('vector-input-on-input');

  await expect(vectorInputOnInput).toBeVisible();

  const xInput = vectorInputOnInput.locator('input').nth(0);
  const xInputEvent = waitForCustomEvent(page, 'input');
  await xInput.focus();
  await xInput.press('ArrowUp');
  await expect(xInputEvent).resolves.toEqual({ detail: { value: [1] } });

  const yInput = vectorInputOnInput.locator('input').nth(1);
  const yInputEvent = waitForCustomEvent(page, 'input');
  await yInput.focus();
  await yInput.press('ArrowUp');
  await expect(yInputEvent).resolves.toEqual({ detail: { value: [1, 1] } });

  const zInput = vectorInputOnInput.locator('input').nth(2);
  const zInputEvent = waitForCustomEvent(page, 'input');
  await zInput.focus();
  await zInput.press('ArrowUp');
  await expect(zInputEvent).resolves.toEqual({ detail: { value: [1, 1, 1] } });
});

test('When label is specified, label renders to the left of inputs', async ({
  page,
}) => {
  const vectorInputLabelLeft = page.getByTestId('vector-input-label');

  await expect(vectorInputLabelLeft).toBeVisible();

  const labelText = await vectorInputLabelLeft
    .getByRole('paragraph')
    .textContent();
  expect(labelText).toBe('Label Left');

  // Confirm label is to the left of x input (x input is to the right of label)
  const xInputPlaceholder = await page
    .locator("input:right-of(:text('Label Left'))")
    .nth(1)
    .getAttribute('placeholder');
  expect(xInputPlaceholder).toBe('x');
});

test('Render values in x, y, z inputs as starting values if they are specified in the value attribute', async ({
  page,
}) => {
  const vectorInputValue = page.getByTestId('vector-input-value');

  await expect(vectorInputValue).toBeVisible();

  const xInput = vectorInputValue.locator('input').nth(0);
  const yInput = vectorInputValue.locator('input').nth(1);
  const zInput = vectorInputValue.locator('input').nth(2);

  expect(await xInput.inputValue()).toBe('1');
  expect(await yInput.inputValue()).toBe('2');
  expect(await zInput.inputValue()).toBe('3');
});

test('When step is specified, on arrow up, confirm input incremented to the correct value', async ({
  page,
}) => {
  const vectorInputStepTest = page.getByTestId('vector-input-step-test');

  await expect(vectorInputStepTest).toBeVisible();

  // Starting x value is ''
  const xInput = vectorInputStepTest.locator('input').nth(0);
  expect(await xInput.inputValue()).toBe('');

  // x input step increments up 0.01
  await xInput.focus();
  await xInput.press('ArrowUp');
  expect(await xInput.inputValue()).toBe('0.01');

  // x input step decrements down .01
  await xInput.focus();
  await xInput.press('ArrowDown');
  expect(await xInput.inputValue()).toBe('0');

  // y step tests 0.01
  const yInput = vectorInputStepTest.locator('input').nth(1);
  expect(await yInput.inputValue()).toBe('');

  await yInput.focus();
  await yInput.press('ArrowUp');
  expect(await yInput.inputValue()).toBe('0.01');

  await yInput.focus();
  await yInput.press('ArrowDown');
  expect(await yInput.inputValue()).toBe('0');

  // z step tests 0.01
  const zInput = vectorInputStepTest.locator('input').nth(2);
  expect(await zInput.inputValue()).toBe('');

  await zInput.focus();
  await zInput.press('ArrowUp');
  expect(await zInput.inputValue()).toBe('0.01');

  await zInput.focus();
  await zInput.press('ArrowDown');
  expect(await zInput.inputValue()).toBe('0');
});

test('When dimensions specified as 3, render 3 inputs with x, y, z placeholders', async ({
  page,
}) => {
  const vectorInputDimensions3 = page.getByTestId('vector-input-dimensions-3');

  await expect(vectorInputDimensions3).toBeVisible();

  const dimensionCount = await vectorInputDimensions3.locator('input').count();
  expect(dimensionCount).toBe(3);

  const xInput = vectorInputDimensions3.locator('input').nth(0);
  await expect(xInput).toBeVisible();

  const yInput = vectorInputDimensions3.locator('input').nth(1);
  await expect(yInput).toBeVisible();

  const zInput = vectorInputDimensions3.locator('input').nth(2);
  await expect(zInput).toBeVisible();

  // Placeholders are x, y, z
  const xPlaceholderValue = await vectorInputDimensions3
    .locator('input')
    .nth(0)
    .getAttribute('placeholder');
  expect(xPlaceholderValue).toBe('x');
  const yPlaceholderValue = await vectorInputDimensions3
    .locator('input')
    .nth(1)
    .getAttribute('placeholder');
  expect(yPlaceholderValue).toBe('y');
  const zPlaceholderValue = await vectorInputDimensions3
    .locator('input')
    .nth(2)
    .getAttribute('placeholder');
  expect(zPlaceholderValue).toBe('z');
});

test('When dimensions specified as 4, render 4 inputs with x, y, z, w placeholders', async ({
  page,
}) => {
  const vectorInputDimensions4 = page.getByTestId('vector-input-dimensions-4');
  await expect(vectorInputDimensions4).toBeVisible();

  const dimensionCount = await vectorInputDimensions4.locator('input').count();
  expect(dimensionCount).toBe(4);

  const xInput = vectorInputDimensions4.locator('input').nth(0);
  await expect(xInput).toBeVisible();

  const yInput = vectorInputDimensions4.locator('input').nth(1);
  await expect(yInput).toBeVisible();

  const zInput = vectorInputDimensions4.locator('input').nth(2);
  await expect(zInput).toBeVisible();

  const wInput = vectorInputDimensions4.locator('input').nth(3);
  await expect(wInput).toBeVisible();

  // Placeholders are x, y, z, and w
  const xPlaceholderValue = await vectorInputDimensions4
    .locator('input')
    .nth(0)
    .getAttribute('placeholder');
  expect(xPlaceholderValue).toBe('x');
  const yPlaceholderValue = await vectorInputDimensions4
    .locator('input')
    .nth(1)
    .getAttribute('placeholder');
  expect(yPlaceholderValue).toBe('y');
  const zPlaceholderValue = await vectorInputDimensions4
    .locator('input')
    .nth(2)
    .getAttribute('placeholder');
  expect(zPlaceholderValue).toBe('z');
  const wPlaceholderValue = await vectorInputDimensions4
    .locator('input')
    .nth(3)
    .getAttribute('placeholder');
  expect(wPlaceholderValue).toBe('w');
});
