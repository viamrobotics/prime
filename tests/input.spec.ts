import { test, expect } from '@playwright/test';
import { hexToRGB, getCustomEventParam, waitForCustomEventWithParam } from './lib/helper.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/input-test.html');
});

test('Given type text, renders text input', async ({ page }) => {
  const inputText = await page.getByTestId('input-text')
  await expect(inputText).toBeVisible()
  await expect(inputText.locator('input').first()).toHaveAttribute('type', 'text')
});

test('Given no type, renders text input', async ({ page }) => {
  const inputDefault = await page.getByTestId('input-default')
  await expect(inputDefault).toBeVisible()
  await expect(inputDefault.locator('input').first()).toHaveAttribute('type', 'text')
});

test('Given value attribute, initializes with given value as input value', async ({ page }) => {
  const inputText = await page.getByTestId('input-text')
  await expect(inputText).toBeVisible()
  await expect(inputText.locator('input').first()).toHaveValue('value')
});

test('Displays "*" next to the label if required', async ({ page }) => {
  const inputRequired = await page.getByTestId('input-required')
  await expect(inputRequired).toBeVisible()
  await expect(inputRequired.locator('input[required]').first()).toBeVisible()
  const asterisk = await inputRequired.getByText(">:)").evaluate((e1) => {     
    return {
      'content': window.getComputedStyle(e1,':after').getPropertyValue('content'),
      'color': window.getComputedStyle(e1, ':after').color,
    }
  })
  expect(asterisk.content).toContain("*")
  expect(asterisk.color).toBe(hexToRGB('danger-fg'))
});

test('Displays label on top of input by default', async ({ page }) => {
  const inputDefault = await page.getByTestId('input-default')
  await expect(inputDefault.getByText('default')).toBeVisible()
  await expect(await inputDefault.locator("input:below(:text('default'))").first()).toBeVisible()
});

test('Displays label on top of input with labelposition top', async ({ page }) => {
  const inputLabelTop = await page.getByTestId('input-label-top')
  await expect(inputLabelTop.getByText(':D')).toBeVisible()
  await expect(await inputLabelTop.locator("input:below(:text(':D'))").first()).toBeVisible()
});

test('Displays label to left of input with labelposition left', async ({ page }) => {
  const inputLabelLeft = await page.getByTestId('input-label-left')
  await expect(inputLabelLeft.getByText('D:')).toBeVisible()
  await expect(await inputLabelLeft.locator("input:right-of(:text('D:'))").first()).toBeVisible()
});

// test('Given type number, renders ??? something', async ({ page }) => {
// });

// Number

// GIVEN a "type" attribute of "number" has been applied to a v-input element
// AND a "step" attribute is specified
// WHEN the element is rendered
// THEN it should render as a number input
// AND the input should increment/decrement by the specified step value

// CHECK THIS ONE TOO
test('Given type number, initializes with given value as number', async ({ page }) => {
  const inputNumber = await page.getByTestId('input-number')
  await expect(inputNumber).toBeVisible()
  await expect(inputNumber.locator('input').first()).toHaveValue('3.14159')
});

// Number: Value

// GIVEN a "type" attribute of "number" has been applied to a v-input element
// AND a "value" attribute with a number of your choosing has been applied
// WHEN the element is rendered
// THEN it should render as a number input
// AND the starting value of the input should reflect the value attribute

test('Given type number and no step value, defaults step to 1', async ({ page }) => {
  const inputNumber = await page.getByTestId('input-number')
  await expect(inputNumber).toBeVisible()
  await expect(inputNumber.locator('input').first()).toHaveJSProperty('step', '1')
});

// test given step value, max and min?

test('Displays placeholder', async ({ page }) => {
  const inputPlaceholder = await page.getByTestId('input-placeholder')
  await expect(inputPlaceholder).toBeVisible()
  await expect(inputPlaceholder.locator('input').first()).toHaveAttribute('placeholder', 'waka waka')
});

test('Given type date, renders date input', async ({ page }) => {
  const inputDate = await page.getByTestId('input-date')
  await expect(inputDate).toBeVisible()
  await expect(inputDate.locator('input').first()).toHaveAttribute('type', 'date')
});

test('Given type time, renders time input', async ({ page }) => {
  const inputTime = await page.getByTestId('input-time')
  await expect(inputTime).toBeVisible()
  await expect(inputTime.locator('input').first()).toHaveAttribute('type', 'time')
});

test('Given type datetime-local, renders datetime-local input', async ({ page }) => {
  const inputDatetime = await page.getByTestId('input-datetimelocal')
  await expect(inputDatetime).toBeVisible()
  await expect(inputDatetime.locator('input').first()).toHaveAttribute('type', 'datetime-local')
});

test('Given type email, renders email input', async ({ page }) => {
  const inputEmail = await page.getByTestId('input-email')
  await expect(inputEmail).toBeVisible()
  await expect(inputEmail.locator('input').first()).toHaveAttribute('type', 'email')
});

test('Renders without label if not given a label', async ({ page }) => {
  const inputText = await page.getByTestId('input-text')
  await expect(await inputText.locator(':above(input)').first().textContent()).toBe(" ")
});

test('Given attribute tooltip with no state, render info icon above the input', async ({ page }) => {
  const inputTooltip = page.getByTestId("input-tooltip-default")
  await expect(inputTooltip.locator('v-tooltip > div').first()).toHaveClass(/icon-info-outline/)
});

test('Given attribute tooltip with info state, render info icon above the input', async ({ page }) => {
  const inputInfoTooltip = page.getByTestId("input-tooltip-info")
  await expect(inputInfoTooltip.locator('v-tooltip > div').first()).toHaveClass(/icon-info-outline/)
});

test('Given attribute tooltip with warn state, render warn icon above the input', async ({ page }) => {
  const inputWarnTooltip = page.getByTestId("input-tooltip-warn")
  await expect(inputWarnTooltip.locator('v-tooltip > div').first()).toHaveClass(/icon-error-outline text-warning-fg/)
});

test('Given attribute tooltip with error state, render error icon above the input', async ({ page }) => {
  const inputErrorTooltip = page.getByTestId("input-tooltip-error")
  await expect(inputErrorTooltip.locator('v-tooltip > div').first()).toHaveClass(/icon-error-outline text-danger-fg/)
});

test('Given a readonly attribute, renders readonly input', async ({ page }) => {
  const inputReadonly = page.getByTestId("input-readonly")
  await expect(inputReadonly).toBeVisible()
  await expect(inputReadonly.locator('input').first()).toHaveAttribute('readonly', '')
  await expect(inputReadonly.locator('input').first()).toHaveValue('teehee')
});

test('Given a disabled attribute, renders disabled input', async ({ page }) => {
  const inputDisabled = page.getByTestId("input-disabled")
  await expect(inputDisabled).toBeVisible()
  await expect(inputDisabled.locator('input').first()).toBeDisabled()
  await expect(inputDisabled.locator('input').first()).toHaveClass(/bg-disabled-bg text-disabled-fg border-disabled-bg/)
});

test('Displays message below input box', async ({ page }) => {
  const inputMessage = page.getByTestId("input-message")
  await expect(inputMessage).toBeVisible()
  await expect(inputMessage.getByText('it\'s the cliiimb')).toBeVisible()
  await expect(inputMessage.locator('input:above(:text("it\'s the cliiimb"))')).toBeVisible()
});

test('With error state, displays message below input box in red', async ({ page }) => {
  const inputMessageError = page.getByTestId("input-message-error")
  await expect(inputMessageError.getByText('fell off the cliiimb')).toHaveClass(/text-red-600/)
  await expect(inputMessageError.locator('input:above(:text("fell off the cliiimb"))')).toBeVisible()
});

test('Fires input event with value on input', async ({ page }) => {
  const input = page.getByTestId("input-default").locator('input').first()
  const isInputEventEmitted = await waitForCustomEventWithParam(page, 'input', 'value')
  await input.fill("asdfJKL;123")
  expect(isInputEventEmitted).toBeTruthy()
  expect(await getCustomEventParam(page, 'input', 'value')).toBe("asdfJKL;123")
});