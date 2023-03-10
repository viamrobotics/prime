import { test, expect } from '@playwright/test';
import { hexToRGB, waitForCustomEventTimeout, waitForCustomEventWithParam } from './lib/helper.ts'

test.beforeEach(async ({ page }) => {
  await page.goto('/switch-test.html');
});

test('Renders appropriately according to value attribute', async ({ page }) => {
  // No value attribute applied, default off
  const switchDefault = page.getByTestId('switch-default')
  await expect(switchDefault).toBeVisible()
  await expect(switchDefault.getByRole('switch')).not.toBeChecked()
  await expect(switchDefault.locator('input')).toHaveValue('off')

  // value='off' applied
  const switchOff = page.getByTestId('switch-off')
  await expect(switchOff).toBeVisible()
  await expect(switchOff.getByRole('switch')).not.toBeChecked()
  await expect(switchOff.locator('input')).toHaveValue('off')
  await expect(switchOff.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('gray-6'))

  // value='on' applied
  const switchOn = page.getByTestId('switch-on')
  await expect(switchOn).toBeVisible()
  await expect(switchOn.getByRole('switch')).toBeChecked()
  await expect(switchOn.locator('input')).toHaveValue('on')
  await expect(switchOn.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('success-fg'))
});

test('Responds to click from on to off', async ({ page }) => {
  const isInputEventEmitted = waitForCustomEventWithParam(page,'input', 'value')
  const switchOn = page.getByTestId('switch-on')
  await switchOn.locator('label').click()
  await expect(switchOn.locator('input')).toHaveValue('off')
  await expect(isInputEventEmitted).toBeTruthy()
  await expect(await page.evaluate('window.input')).toBe('off') // test emitted value from input event
})

test('Responds to click from off to on', async ({ page }) => {
  const isInputEventEmitted = waitForCustomEventWithParam(page,'input', 'value')
  const switchOff = page.getByTestId('switch-off')
  await switchOff.locator('label').click()
  await expect(switchOff.locator('input')).toHaveValue('on')
  await expect(isInputEventEmitted).toBeTruthy()
  await expect(await page.evaluate('window.input')).toBe('on') // test emitted value from input event
})

test('Responds to keydown "enter" from on to off', async ({ page }) => {
  const isInputEventEmitted = waitForCustomEventWithParam(page,'input', 'value')
  const switchOn = page.getByTestId('switch-on')
  await switchOn.locator('label').press('Enter')
  await expect(switchOn.locator('input')).toHaveValue('off')
  await expect(isInputEventEmitted).toBeTruthy()
  await expect(await page.evaluate('window.input')).toBe('off') // test emitted value from input event
})

test('Responds to keydown "enter" from off to on', async ({ page }) => {
  const isInputEventEmitted = waitForCustomEventWithParam(page,'input', 'value')
  const switchOff = page.getByTestId('switch-off')
  await switchOff.locator('label').press('Enter')
  await expect(switchOff.locator('input')).toHaveValue('on')
  await expect(isInputEventEmitted).toBeTruthy()
  await expect(await page.evaluate('window.input')).toBe('on') // test emitted value from input event
})

test('Renders label on top of switch by default', async ({ page }) => {
  const switchWithLabel = page.getByTestId('switch-default')
  await expect(switchWithLabel.getByText('default')).toBeVisible()
  const topLabelText = await switchWithLabel.locator(':above(button)').first().textContent()
  expect(topLabelText).toMatch(/default/i)
})

test('Renders label on top of switch given labelposition: top', async ({ page }) => {
  const switchLabelTop = page.getByTestId('switch-label-top')
  await expect(switchLabelTop).toBeVisible()
  await expect(switchLabelTop.getByText('top')).toBeVisible()
  const topLabelText = await switchLabelTop.locator(':above(button)').first().textContent()
  expect(topLabelText).toMatch(/top/i)
})

test('Renders label on left side of switch given labelposition: left', async ({ page }) => {
  const switchLabelLeft = page.getByTestId('switch-label-left')
  await expect(switchLabelLeft).toBeVisible()
  await expect(switchLabelLeft.getByText('left')).toBeVisible()
  const leftLabelText = await switchLabelLeft.locator(':left-of(button)').first().textContent()
  expect(leftLabelText).toMatch(/left/i)
})

test('Renders as disabled', async ({ page }) => {
  const switchDisabledOff = page.getByTestId('switch-disabled-off')
  await expect(switchDisabledOff).toBeVisible()
  await expect(switchDisabledOff.getByRole('switch')).toBeDisabled()
  await expect(switchDisabledOff.locator('input')).toBeDisabled()
  await expect(switchDisabledOff.getByText('disabled')).toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchDisabledOff.getByText('off')).toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchDisabledOff.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('gray-4'))

  const switchDisabledOn = page.getByTestId('switch-disabled-on')
  await expect(switchDisabledOn).toBeVisible()
  await expect(switchDisabledOn.locator('input')).toHaveValue('on')
  await expect(switchDisabledOn.getByRole('switch')).toBeDisabled()
  await expect(switchDisabledOn.locator('input')).toBeDisabled()
  await expect(switchDisabledOn.getByText('disabled')).toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchDisabledOn.getByText('on')).toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchDisabledOn.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('gray-4'))
})

test('Precludes value change if disabled', async ({ page }) => {
  const switchDisabledOff = page.getByTestId('switch-disabled-off')
  const isInputEventEmitted = waitForCustomEventTimeout(page,'input')
  await switchDisabledOff.locator('label').click({ force: true })
  await expect(switchDisabledOff.locator('input')).toHaveValue('off')
  await isInputEventEmitted
})


test('Renders as read only', async ({ page }) => {
  const switchReadOnlyOff = page.getByTestId('switch-readonly-off')
  await expect(switchReadOnlyOff).toBeVisible()
  await expect(switchReadOnlyOff.locator('input')).not.toBeEditable()
  await expect(switchReadOnlyOff.getByText('read only')).not.toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchReadOnlyOff.getByText('off')).not.toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchReadOnlyOff.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('gray-4'))

  const switchReadOnlyOn = page.getByTestId('switch-readonly-on')
  await expect(switchReadOnlyOn).toBeVisible()
  await expect(switchReadOnlyOn.locator('input')).toHaveValue('on')
  await expect(switchReadOnlyOn.locator('input')).not.toBeEditable()
  await expect(switchReadOnlyOn.getByText('read only')).not.toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchReadOnlyOn.getByText('on', { exact: true })).not.toHaveCSS('color', hexToRGB('text-disabled'))
  await expect(switchReadOnlyOn.getByRole('switch').locator('div').first()).toHaveCSS("background-color", hexToRGB('gray-4'))
})

test('Precludes value change if read only', async ({ page }) => {
  const switchReadOnlyOff = page.getByTestId('switch-readonly-off')
  const isInputEventEmitted = waitForCustomEventTimeout(page,'input')
  await switchReadOnlyOff.locator('label').click({ force: true })
  await expect(switchReadOnlyOff.locator('input')).toHaveValue('off')
  await isInputEventEmitted
})

test('Displays tooltip in correct position given tooltip attribute', async ({ page }) => {
  const switchTooltipDefault = page.getByTestId('switch-default')
  await expect(switchTooltipDefault).toBeVisible()
  await expect(switchTooltipDefault.locator('v-tooltip')).toBeVisible()
  await expect(switchTooltipDefault.locator('v-tooltip:above(button)').first()).toBeVisible()
  await expect(switchTooltipDefault.locator('v-tooltip:right-of(:text("Default"))').first()).toBeVisible()

  const switchTooltipLeft = page.getByTestId('switch-label-left')
  await expect(switchTooltipLeft).toBeVisible()
  await expect(switchTooltipLeft.locator('v-tooltip')).toBeVisible()
  await expect(switchTooltipLeft.locator('v-tooltip:left-of(button)').first()).toBeVisible()
  await expect(switchTooltipLeft.locator('v-tooltip:right-of(:text("Left"))').first()).toBeVisible()
})

test('If variant is annotated, displays annotations on right side of switch', async ({ page }) => {
  const switchAnnotated = page.getByTestId('switch-annotated')
  await expect(switchAnnotated).toBeVisible()
  await expect(switchAnnotated.getByText('Off')).toBeVisible()
  await expect(switchAnnotated.locator('span:left-of(:text("Off"))').first()).toBeVisible()
  await switchAnnotated.locator('label').click()
  await expect(switchAnnotated.getByText('On')).toBeVisible()
  await expect(switchAnnotated.locator('span:left-of(:text("On"))').first()).toBeVisible()
})
