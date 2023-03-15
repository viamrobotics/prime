import { test, expect } from '@playwright/test';
import { hexToRGB, waitForCustomEventTimeout, waitForCustomEventWithParam, getCustomEventParam } from './lib/helper.ts'

test.beforeEach(async ({ page }) => {
  await page.goto('/button-test.html');
});

test('Renders label attribute as text within the button', async ({ page }) => {
});

test('Renders a button in the style of the primary variant if no variant is specified', async ({ page }) => {
})

test('Renders a button in the style of the primary variant if variant is specified as primary', async ({ page }) => {
})

test('Renders a button in the style of inverse primary if the variant is specified as inverse primary', async ({ page }) => {
})

test('Renders a button in the style of success if the variant is specified as success', async ({ page }) => {
})

test('Renders a button in the style of danger if the variant is specified as danger', async ({ page }) => {
})

test('Renders a button in the style of outline danger if the variant is specified as outline danger', async ({ page }) => {
})

test('Renders a button as disabled if ', async ({ page }) => {
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
