import { test, expect, Page } from '@playwright/test';
import { waitForCustomEventWithParam } from './lib/helper.ts'

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
  // check color

  // value='on' applied
  const switchOn = page.getByTestId('switch-on')
  await expect(switchOn).toBeVisible()
  await expect(switchOn.getByRole('switch')).toBeChecked()
  await expect(switchOn.locator('input')).toHaveValue('on')
  // check color
});

test('Responds to click from on to off', async ({ page }) => {
  // clicks off
  const isInputEventEmitted = waitForCustomEventWithParam(page,'input', 'value')
  const switchOn = page.getByTestId('switch-on')
  await switchOn.locator('label').click()
  await expect(switchOn.locator('input')).toHaveValue('off')
  await expect(isInputEventEmitted).toBeTruthy()
  await expect(await page.evaluate('window.input')).toBe('off') // test emitted value from input event
})

test('Responds to click from off to on', async ({ page }) => {
  // clicks on
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
  // check text color
  await expect(switchWithLabel.getByText('Switch me!')).toBeVisible()
  const topLabelText = await switchWithLabel.locator(':above(button)').first().textContent()
  expect(topLabelText).toMatch(/Switch me!/i)
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
  const switchDisabled = page.getByTestId('switch-disabled')
  await expect(switchDisabled).toBeVisible()
  await expect(switchDisabled.getByRole('switch')).toBeDisabled()
  await expect(switchDisabled.locator('input')).toBeDisabled()
  // check text color
  // check background color
  // bug where it has readonly attribute? even when _just_ disabled
})

test('Renders as read only', async ({ page }) => {
  const switchReadOnly = page.getByTestId('switch-read-only')
  await expect(switchReadOnly).toBeVisible()
  await expect(switchReadOnly.locator('input')).not.toBeEditable()
  // check text color
  // check background color
})

// Tooltip: label

// GIVEN a tooltip attribute has been applied to a switch element
// AND a label attribute has been applied to a switch element
// WHEN the element is rendered
// THEN the label attribute value should render above the switch element
// AND an info icon should be rendered to the right of the label attribute value
// AND if the info icon is hovered
// THEN the tooltip attribute value should render above the info icon

// annotated?