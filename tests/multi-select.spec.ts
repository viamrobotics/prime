import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/multi-select-test.html');
});

// @TODO fix flakey selectors and re-enable tests
test.skip('Given a default multiselect, shows options, labels, sets pills and fires events correctly after selecting and clearing options', async ({
  page,
}) => {
  const multiselect = page.getByTestId('basic-multiselect');
  await expect(multiselect).toBeVisible();

  // label is visible
  await expect(page.getByText('Default Multi-select').first()).toBeVisible();

  // placeholder is visible
  await expect(multiselect.locator('input').first()).toHaveAttribute(
    'placeholder',
    'Emotions'
  );

  // dont expect the options to be rendered until a click on input
  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).not.toBeVisible();

  await multiselect.click();
  await expect(optionsContainer).toBeVisible();

  expect(await optionsContainer.locator('label').all()).toHaveLength(3);

  await expect(optionsContainer).toHaveText(/happy/);
  await expect(optionsContainer).toHaveText(/sad/);
  await expect(optionsContainer).toHaveText(/angry/);

  const event = waitForCustomEvent(page, 'input');
  // click on the first option
  await optionsContainer.locator('label', { hasText: 'happy' }).click();

  // make sure that an event is fired
  await expect(event.detail()).resolves.toMatchObject({ value: 'happy' });

  // check that the textbox is checked
  await expect(
    optionsContainer
      .locator('label', { hasText: 'happy' })
      .first()
      .locator('input')
  ).toBeChecked();

  // click second option
  await optionsContainer.locator('label', { hasText: 'sad' }).click();
  await expect(
    optionsContainer
      .locator('label', { hasText: 'sad' })
      .first()
      .locator('input')
  ).toBeChecked();

  // close the dropdown
  await page.keyboard.press('Escape');

  // press clear all
  const clearAllEvent = waitForCustomEvent(page, 'clear-all-click');

  await multiselect.click();
  await expect(optionsContainer).toBeVisible();
  await optionsContainer.locator('button', { hasText: 'Clear all' }).click();
  await page.keyboard.press('Escape');
  await clearAllEvent.detail();

  expect(await multiselect.locator('v-pill').all()).toHaveLength(0);
});

test('Given a multi-select with values, they are rendered as pills', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-values');
  await expect(multiselect).toBeVisible();
  expect(await multiselect.locator('v-pill').all()).toHaveLength(2);

  await expect(
    multiselect.locator('v-pill', { hasText: 'happy' }).first()
  ).toBeVisible();
  await expect(
    multiselect.locator('v-pill', { hasText: 'sad' }).first()
  ).toBeVisible();

  await multiselect.click();
  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  await expect(
    optionsContainer
      .locator('label', { hasText: 'happy' })
      .first()
      .locator('input')
  ).toBeChecked();
  await expect(
    optionsContainer
      .locator('label', { hasText: 'sad' })
      .first()
      .locator('input')
  ).toBeChecked();

  await page.keyboard.press('Escape');

  // check that the pills are visible
  expect(await multiselect.locator('v-pill').all()).toHaveLength(2);

  // delete a pill
  const pillToDelete = multiselect.locator('v-pill').first();
  await expect(pillToDelete).toBeVisible();
  const button = pillToDelete.getByRole('button').first();
  await expect(button).toBeVisible();
  await button.click();
  expect(await multiselect.locator('v-pill').all()).toHaveLength(1);
});

test('Given a multi-select with button, there is a button at the bottom', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-with-button');
  await expect(multiselect).toBeVisible();
  await multiselect.click();
  await expect(multiselect.locator('v-select-button').first()).toBeVisible();
  await expect(multiselect.locator('v-select-button').first()).toHaveText(
    /TAKE PHOTO/
  );
  const icon = multiselect
    .locator('v-select-button')
    .first()
    .locator('v-icon')
    .first();
  await expect(icon.locator('i')).toHaveClass(/icon-camera/);

  const buttonClickEvent = waitForCustomEvent(page, 'button-click');
  await multiselect.locator('v-select-button').first().click();
  await buttonClickEvent.detail();
});

test('Given a multi-select with a header, there is a header in the options list', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-header');
  await expect(multiselect).toBeVisible();
  await multiselect.click();
  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(
    optionsContainer.locator('span', { hasText: 'Emotions' })
  ).toBeVisible();
});

test('Given a disabled multi-select, the element is not editable', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-disabled');
  await expect(multiselect).toBeVisible();

  await multiselect.click();
  await expect(
    multiselect.locator('.options-container').first()
  ).not.toBeVisible();
  await expect(multiselect.locator('input').first()).toBeDisabled();
});

test('Given a readonly multi-select, the element is not editable', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-readonly');
  await expect(multiselect).toBeVisible();
  await multiselect.click();
  await expect(
    multiselect.locator('.options-container').first()
  ).not.toBeVisible();
  // only exists if readonly is true
  await expect(multiselect.locator('input').first()).toHaveAttribute(
    'readonly',
    ''
  );
});

test('Given a clearable=false state, the multi-select does not have the clear all option', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-not-clearable');
  await expect(multiselect).toBeVisible();
  await multiselect.click();
  await expect(multiselect.locator('.options-container').first()).toBeVisible();
  await expect(
    multiselect
      .locator('.options-container')
      .first()
      .locator('button', { hasText: 'Clear all' })
  ).not.toBeVisible();
});

test('Given a tooltip and state=info, the select should show an info icon with a tooltip', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-info-tooltip');
  await expect(multiselect).toBeVisible();
  await expect(multiselect.locator('v-tooltip').first()).toBeVisible();
  await expect(
    multiselect.locator('v-tooltip').first().locator('div').first()
  ).toHaveClass(/icon-info-outline/);
  await multiselect.locator('v-tooltip').first().hover();
  await expect(multiselect.getByText(/info tip/)).toBeVisible();
});

test('Given a tooltip and state=warn the select should show a warn icon with tooltip', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-warn-tooltip');
  await expect(multiselect).toBeVisible();
  await expect(multiselect.locator('v-tooltip').first()).toBeVisible();
  await expect(
    multiselect.locator('v-tooltip').first().locator('div').first()
  ).toHaveClass(/text-warning-bright/);
  await multiselect.locator('v-tooltip').first().hover();
  await expect(multiselect.getByText(/warn tip/)).toBeVisible();
});

test('Given a tooltip and state=error the select should show a error icon with tooltip', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-error-tooltip');
  await expect(multiselect).toBeVisible();
  await expect(multiselect.locator('v-tooltip').first()).toBeVisible();
  await expect(
    multiselect.locator('v-tooltip').first().locator('div').first()
  ).toHaveClass(/text-danger-dark/);
  await multiselect.locator('v-tooltip').first().hover();
  await expect(multiselect.getByText(/error tip/)).toBeVisible();
});

test('Setting showpill=false should stop pills being rendered', async ({
  page,
}) => {
  const multiselect = page.getByTestId('multiselect-showpill');
  await expect(multiselect).toBeVisible();

  await multiselect.click();

  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  await expect(
    optionsContainer
      .locator('label', { hasText: 'happy' })
      .first()
      .locator('input')
  ).toBeChecked();
  await expect(
    optionsContainer
      .locator('label', { hasText: 'sad' })
      .first()
      .locator('input')
  ).toBeChecked();

  // checked options not showing as pills
  expect(await multiselect.locator('v-pill').all()).toHaveLength(0);
});

test('Test sort options for container', async ({ page }) => {
  // Default sort fuzzy matches but
  let multiselect = page.getByTestId('basic-multiselect');
  await expect(multiselect).toBeVisible();

  let input = multiselect.locator('input').first();

  await input.focus();

  let optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  await expect(optionsContainer.locator('label').first()).toHaveText('happy');
  await expect(optionsContainer.locator('label').nth(1)).toHaveText('sad');
  await expect(optionsContainer.locator('label').last()).toHaveText('angry');

  const searchEvent = waitForCustomEvent(page, 'search');
  await input.type('s');
  await expect(searchEvent.detail()).resolves.toEqual({ term: 's' });

  await expect(optionsContainer.locator('label').first()).toHaveText('sad');
  await expect(optionsContainer.locator('label').nth(1)).toHaveText('happy');
  await expect(optionsContainer.locator('label').last()).toHaveText('angry');

  // turning sorting off

  multiselect = page.getByTestId('multiselect-sort-off');
  await expect(multiselect).toBeVisible();

  input = multiselect.locator('input').first();
  await input.focus();

  optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  await expect(optionsContainer.locator('label').first()).toHaveText('happy');
  await expect(optionsContainer.locator('label').nth(1)).toHaveText('sad');
  await expect(optionsContainer.locator('label').last()).toHaveText('angry');

  await input.type('sa');

  await expect(optionsContainer.locator('label').first()).toHaveText('happy');
  await expect(optionsContainer.locator('label').nth(1)).toHaveText('sad');
  await expect(optionsContainer.locator('label').last()).toHaveText('angry');

  // reduce sort search

  multiselect = page.getByTestId('multiselect-reduce');
  await expect(multiselect).toBeVisible();

  input = multiselect.locator('input').first();
  await input.focus();

  optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  expect(await optionsContainer.locator('label').all()).toHaveLength(3);

  await input.type('sa');
  expect(await optionsContainer.locator('label').all()).toHaveLength(1);
});

test.skip('opening and closing dropdown fires events', async ({ page }) => {
  const multiselect = page.getByTestId('basic-multiselect');
  await expect(multiselect).toBeVisible();

  const openEvent = waitForCustomEvent(page, 'open');
  await multiselect.click();

  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();
  await openEvent.detail();

  const closeEvent = waitForCustomEvent(page, 'close');
  const closeDropdown = multiselect.getByRole('button').first();
  await expect(closeDropdown).toBeVisible();
  await closeDropdown.click();
  await expect(optionsContainer).not.toBeVisible();
  await closeEvent.detail();
});

test('When a dropdown is open, confirm the first result is in focus such that a user can press enter and select that first item', async ({
  page,
}) => {
  const multiselect = page.getByTestId('default-multiselect-first');
  await expect(multiselect).toBeVisible();

  await multiselect.click();

  const optionsContainer = multiselect.locator('.options-container').first();
  await expect(optionsContainer).toBeVisible();

  // confirm first option background is gray
  await expect(
    page
      .getByTestId('default-multiselect-first')
      .locator('v-dropdown')
      .getByText('First Option')
  ).toHaveClass(/bg-slate-200/);

  // press enter
  await page.keyboard.press('Enter');

  // confirm first option selected
  expect(await multiselect.locator('v-pill').all()).toHaveLength(1);
  await expect(
    optionsContainer
      .locator('label', { hasText: 'First Option' })
      .first()
      .locator('input')
  ).toBeChecked();
});
