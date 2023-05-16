import { test, expect } from '@playwright/test';
import { hexToRGB, waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/switch-test.html');
});

test('Renders appropriately according to value attribute', async ({ page }) => {
  // No value attribute applied, default off
  const switchDefault = page.getByTestId('switch-default');
  await expect(switchDefault).toBeVisible();
  await expect(switchDefault.getByRole('switch')).not.toBeChecked();
  await expect(switchDefault.locator('input')).toHaveValue('off');

  // value='off' applied
  const switchOff = page.getByTestId('switch-off');
  await expect(switchOff).toBeVisible();
  await expect(switchOff.getByRole('switch')).not.toBeChecked();
  await expect(switchOff.locator('input')).toHaveValue('off');
  await expect(switchOff.getByRole('switch').locator('div').first()).toHaveCSS(
    'background-color',
    hexToRGB('colors', 'gray-6')
  );

  // value='on' applied
  const switchOn = page.getByTestId('switch-on');
  await expect(switchOn).toBeVisible();
  await expect(switchOn.getByRole('switch')).toBeChecked();
  await expect(switchOn.locator('input')).toHaveValue('on');
  await expect(switchOn.getByRole('switch').locator('div').first()).toHaveCSS(
    'background-color',
    hexToRGB('colors', 'success-dark')
  );
});

test('Responds to click from on to off', async ({ page }) => {
  const inputEvent = waitForCustomEvent(page, 'input');
  const switchOn = page.getByTestId('switch-on');

  await switchOn.locator('label').click();
  await expect(switchOn.locator('input')).toHaveValue('off');
  await expect(inputEvent.detail()).resolves.toEqual({ value: false });
});

test('Responds to click from off to on', async ({ page }) => {
  const inputEvent = waitForCustomEvent(page, 'input');
  const switchOff = page.getByTestId('switch-off');
  await switchOff.locator('label').click();
  await expect(switchOff.locator('input')).toHaveValue('on');
  await expect(inputEvent.detail()).resolves.toEqual({ value: true });
});

test('Responds to keydown "enter" from on to off', async ({ page }) => {
  const inputEvent = waitForCustomEvent(page, 'input');
  const switchOn = page.getByTestId('switch-on');
  await switchOn.locator('label').press('Enter');
  await expect(switchOn.locator('input')).toHaveValue('off');
  await expect(inputEvent.detail()).resolves.toEqual({ value: false });
});

test('Responds to keydown "enter" from off to on', async ({ page }) => {
  const inputEvent = waitForCustomEvent(page, 'input');
  const switchOff = page.getByTestId('switch-off');
  await switchOff.locator('label').press('Enter');
  await expect(switchOff.locator('input')).toHaveValue('on');
  await expect(inputEvent.detail()).resolves.toEqual({ value: true });
});

test('Renders label on top of switch', async ({ page }) => {
  const switchWithLabel = page.getByTestId('switch-default');
  await expect(switchWithLabel.getByText('default')).toBeVisible();
  const topLabelText = await switchWithLabel
    .locator(':above(button)')
    .first()
    .textContent();
  expect(topLabelText).toMatch(/default/iu);
});

test('Renders as disabled', async ({ page }) => {
  const switchDisabledOff = page.getByTestId('switch-disabled-off');
  await expect(switchDisabledOff).toBeVisible();
  await expect(switchDisabledOff.getByRole('switch')).toBeDisabled();
  await expect(switchDisabledOff.locator('input')).toBeDisabled();
  await expect(switchDisabledOff.getByText('disabled')).toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(switchDisabledOff.getByText('off')).toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(
    switchDisabledOff.getByRole('switch').locator('div').first()
  ).toHaveCSS('background-color', hexToRGB('colors', 'gray-4'));

  const switchDisabledOn = page.getByTestId('switch-disabled-on');
  await expect(switchDisabledOn).toBeVisible();
  await expect(switchDisabledOn.locator('input')).toHaveValue('on');
  await expect(switchDisabledOn.getByRole('switch')).toBeDisabled();
  await expect(switchDisabledOn.locator('input')).toBeDisabled();
  await expect(switchDisabledOn.getByText('disabled')).toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(switchDisabledOn.getByText('on')).toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(
    switchDisabledOn.getByRole('switch').locator('div').first()
  ).toHaveCSS('background-color', hexToRGB('colors', 'gray-4'));
});

test('Precludes value change if disabled', async ({ page }) => {
  const switchDisabledOff = page.getByTestId('switch-disabled-off');
  const inputEvent = waitForCustomEvent(page, 'input');
  await switchDisabledOff.locator('label').click({ force: true });
  await expect(switchDisabledOff.locator('input')).toHaveValue('off');
  await expect(inputEvent.didNotOccur()).resolves.toBe(true);
});

test('Renders as read only', async ({ page }) => {
  const switchReadOnlyOff = page.getByTestId('switch-readonly-off');
  await expect(switchReadOnlyOff).toBeVisible();
  await expect(switchReadOnlyOff.locator('input')).not.toBeEditable();
  await expect(switchReadOnlyOff.getByText('read only')).not.toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(switchReadOnlyOff.getByText('off')).not.toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(
    switchReadOnlyOff.getByRole('switch').locator('div').first()
  ).toHaveCSS('background-color', hexToRGB('colors', 'gray-4'));

  const switchReadOnlyOn = page.getByTestId('switch-readonly-on');
  await expect(switchReadOnlyOn).toBeVisible();
  await expect(switchReadOnlyOn.locator('input')).toHaveValue('on');
  await expect(switchReadOnlyOn.locator('input')).not.toBeEditable();
  await expect(switchReadOnlyOn.getByText('read only')).not.toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(switchReadOnlyOn.getByText('on', { exact: true })).not.toHaveCSS(
    'color',
    hexToRGB('textColor', 'disabled')
  );
  await expect(
    switchReadOnlyOn.getByRole('switch').locator('div').first()
  ).toHaveCSS('background-color', hexToRGB('colors', 'gray-4'));
});

test('Precludes value change if read only', async ({ page }) => {
  const switchReadOnlyOff = page.getByTestId('switch-readonly-off');
  const inputEvent = waitForCustomEvent(page, 'input');
  await switchReadOnlyOff.locator('label').click({ force: true });
  await expect(switchReadOnlyOff.locator('input')).toHaveValue('off');
  await expect(inputEvent.didNotOccur()).resolves.toBe(true);
});

test('Displays tooltip in correct position given tooltip attribute', async ({
  page,
}) => {
  const switchTooltipDefault = page.getByTestId('switch-default');
  await expect(switchTooltipDefault).toBeVisible();
  await expect(switchTooltipDefault.locator('v-tooltip')).toBeVisible();
  await expect(
    switchTooltipDefault.locator('v-tooltip:above(button)').first()
  ).toBeVisible();
  await expect(
    switchTooltipDefault.locator('v-tooltip:right-of(:text("Default"))').first()
  ).toBeVisible();
});

test('If variant is annotated, displays annotations on right side of switch', async ({
  page,
}) => {
  const switchAnnotated = page.getByTestId('switch-annotated');
  await expect(switchAnnotated).toBeVisible();
  await expect(switchAnnotated.getByText('Off')).toBeVisible();
  await expect(
    switchAnnotated.locator('span:left-of(:text("Off"))').first()
  ).toBeVisible();
  await switchAnnotated.locator('label').click();
  await expect(switchAnnotated.getByText('On')).toBeVisible();
  await expect(
    switchAnnotated.locator('span:left-of(:text("On"))').first()
  ).toBeVisible();
});
