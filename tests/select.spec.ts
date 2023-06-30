import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/select-test.html');
});

test('Given an options attribute, on select the options should be visible and clicking an option should update the input', async ({
  page,
}) => {
  const select = page.getByTestId('basic-select');
  await expect(select).toBeVisible();

  // don't expect the options to be rendered until a click on input
  const optionsContainer = select.locator('.options-container').first();
  await expect(optionsContainer).not.toBeVisible();

  // click on the input
  const input = select.locator('input').first();
  await input.focus();
  await expect(optionsContainer).toBeVisible();

  // within the optionsContainer there should be 3 different options
  expect(await optionsContainer.locator('label').all()).toHaveLength(3);

  await expect(optionsContainer).toHaveText(/one/u);
  await expect(optionsContainer).toHaveText(/two/u);
  await expect(optionsContainer).toHaveText(/three/u);

  // selecting a value should emit an input event + render that as the input
  const oneSelected = waitForCustomEvent(select, 'input');
  await optionsContainer.locator('label').first().click();
  await expect(oneSelected.detail()).resolves.toEqual({ value: 'one' });
});

test('Clicking on the select component renders options', async ({ page }) => {
  const select = page.getByTestId('basic-select');
  // dont expect the options to be rendered until a click on input
  const optionsContainer = select.locator('.options-container').first();
  await expect(optionsContainer).not.toBeVisible();

  await select.click();
  await expect(optionsContainer).toBeVisible();
});

test('Given a select with a placeholder, that should be visible in the input', async ({
  page,
}) => {
  const select = page.getByTestId('basic-select');
  await expect(select).toBeVisible();

  await expect(select.locator('input').first()).toHaveAttribute(
    'placeholder',
    'All'
  );
});

test('Setting withbutton to true, with a button text and icon, the text and icon should be rendered as a final element', async ({
  page,
}) => {
  const select = page.getByTestId('select-with-button');
  await expect(select).toBeVisible();

  await select.locator('input').first().focus();

  const button = select.locator('v-select-button');
  await expect(button).toBeVisible();
  await expect(button).toHaveText('Add new option');
  await expect(button.locator('v-icon > i')).toHaveClass(/icon-add/u);
});

test('If a select component has disabled=True the element should be disabled', async ({
  page,
}) => {
  const select = page.getByTestId('select-disabled');
  const input = select.locator('input').first();
  await input.focus();
  await input.type('new option');
  // options do not load and the actual one isn't visible
  await expect(select.locator('.options-container').first()).not.toBeVisible();
  expect(await input.inputValue()).toEqual('');
});

test('If the select component has readonly value, then it should be readonly', async ({
  page,
}) => {
  const select = page.getByTestId('select-readonly');
  const input = select.locator('input').first();
  await input.focus();
  await input.type('new option');
  // options do not load and the actual one isn't visible
  await expect(select.locator('.options-container').first()).not.toBeVisible();
  expect(await input.inputValue()).toEqual('');
});

test('If the select has attribute exact, the user can only type a value from the dropdown', async ({
  page,
}) => {
  const select = page.getByTestId('select-exact');
  const input = select.locator('input').first();

  await input.focus();
  await input.type('not an option');

  await page.keyboard.press('Enter');

  expect(await input.inputValue()).toEqual('');

  // now type a valid option
  await input.type('one');
  await page.keyboard.press('Enter');
  expect(await input.inputValue()).toEqual('one');
});

test('No state but tooltip applied should render info icon with tooltip text', async ({
  page,
}) => {
  const select = page.getByTestId('select-default-tooltip');
  const tooltip = select.locator('label > div > v-tooltip').first();
  await expect(tooltip.locator('.icon-info-outline')).toBeVisible();

  // text is not visible
  await expect(tooltip.getByText('default tip').first()).not.toBeVisible();
  // make
  await tooltip.hover();
  await expect(tooltip.getByText('default tip').first()).toBeVisible();
});

test('Given info state and tooltip value, there should be an info tooltip next to the select label', async ({
  page,
}) => {
  const select = page.getByTestId('select-info-tooltip');
  const tooltip = select.locator('label > div > v-tooltip').first();
  await expect(tooltip.locator('.icon-info-outline')).toBeVisible();

  // text is not visible
  await expect(tooltip.getByText('info tip').first()).not.toBeVisible();
  // make
  await tooltip.hover();
  await expect(tooltip.getByText('info tip').first()).toBeVisible();
});

test('Given warn state and tooltip value, there should be a warn tooltip next to the select label', async ({
  page,
}) => {
  const select = page.getByTestId('select-warn-tooltip');
  const tooltip = select.locator('label > div > v-tooltip').first();
  await expect(tooltip.locator('.text-warning-bright')).toBeVisible();

  // text is not visible
  await expect(tooltip.getByText('warn tip').first()).not.toBeVisible();
  // make
  await tooltip.hover();
  await expect(tooltip.getByText('warn tip').first()).toBeVisible();
});

test('Given error state and tooltip value, there should be an error tooltip next to the select label', async ({
  page,
}) => {
  const select = page.getByTestId('select-error-tooltip');
  const tooltip = select.locator('label > div > v-tooltip').first();
  await expect(tooltip.locator('.text-danger-dark')).toBeVisible();

  // text is not visible
  await expect(tooltip.getByText('error tip').first()).not.toBeVisible();
  // make
  await tooltip.hover();
  await expect(tooltip.getByText('error tip').first()).toBeVisible();
});

test('When there is no sort on the dropdown, the options should be rendered in the order they are passed into the element', async ({
  page,
}) => {
  const select = page.getByTestId('basic-select');
  await expect(select).toBeVisible();

  const optionsContainer = select.locator('.options-container').first();

  // click on the input
  const input = select.locator('input').first();
  await input.focus();
  await expect(optionsContainer).toBeVisible();

  // within the optionsContainer there should be 3 different options
  expect(await optionsContainer.locator('label').all()).toHaveLength(3);
  await expect(optionsContainer.locator('label').first()).toHaveText('one');
  await expect(optionsContainer.locator('label').nth(1)).toHaveText('two');
  await expect(optionsContainer.locator('label').nth(2)).toHaveText('three');
});

test('When there is a reduce sort option, the elements should reduce on matching input', async ({
  page,
}) => {
  const select = page.getByTestId('select-reduce');
  const input = select.locator('input').first();
  await input.focus();
  const optionsContainer = select.locator('.options-container').first();
  expect(await optionsContainer.locator('label').all()).toHaveLength(3);

  await input.type('one');

  expect(await optionsContainer.locator('label').all()).toHaveLength(2);
  await expect(optionsContainer.locator('label').first()).toHaveText('one');
  await expect(optionsContainer.locator('label').last()).toHaveText(
    'one chicken'
  );
});

test('On pressing enter over an option, that option should be selected, change and input events emitted', async ({
  page,
}) => {
  const select = page.getByTestId('basic-select');
  await expect(select).toBeVisible();

  const optionsContainer = select.locator('.options-container').first();
  const valueChanged = waitForCustomEvent(select, 'change');
  const inputEvent = waitForCustomEvent(select, 'input');

  // click on the input
  const input = select.locator('input').first();
  await input.focus();
  await expect(optionsContainer).toBeVisible();

  expect(await input.inputValue()).toEqual('');
  // press down over an option
  await page.keyboard.press('ArrowDown');

  // press enter
  await page.keyboard.press('Enter');

  // both input and change events should be emitted
  await expect(valueChanged.detail()).resolves.toEqual({ value: 'two' });
  await expect(inputEvent.detail()).resolves.toEqual({ value: 'two' });

  // show the selected value in the input
  expect(await input.inputValue()).toEqual('two');
});

test('When a dropdown is open, confirm the first result is in focus such that a user can press enter and select that first item', async ({
  page,
}) => {
  const select = page.getByTestId('default-select-first');
  await expect(select).toBeVisible();

  const optionsContainer = select.locator('.options-container').first();

  // click on the input
  const input = select.locator('input').first();
  await input.focus();
  await expect(optionsContainer).toBeVisible();

  expect(await input.inputValue()).toEqual('');
  // confirm first option background is gray
  await expect(
    page
      .getByTestId('default-select-first')
      .locator('v-dropdown')
      .getByText('First Option')
  ).toHaveClass(/bg-light/u);

  // press enter
  await page.keyboard.press('Enter');

  // show the selcted value in the input
  expect(await input.inputValue()).toEqual('First Option');
});

test('Heading is displayed when a string a entered for heading field', async ({
  page,
}) => {
  const select = page.getByTestId('select-with-heading');
  await expect(select).toBeVisible();

  // click on the dropdown arrow
  await select.getByRole('button', { name: 'Open dropdown' }).click();

  // make sure the heading is visible
  await expect(select.getByText('heading title')).toHaveClass(/text-default/u);
});

test('Dispatches change event when option is selected', async ({ page }) => {
  const select = page.getByTestId('default-select-first');
  await expect(select).toBeVisible();
  const optionsContainer = select.locator('.options-container').first();

  await select.click();
  await expect(optionsContainer).toBeVisible();

  // select an option
  const valueChanged = waitForCustomEvent(select, 'change');
  await select.getByText('Second Option').click();

  await expect(valueChanged.detail()).resolves.toEqual({
    value: 'Second Option',
  });
});
