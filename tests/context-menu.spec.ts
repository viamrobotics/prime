import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/context-menu-test.html');
});

test('Renders labels, dividers, and icons', async ({ page }) => {
  const contextMenu = page.getByTestId('context-menu-default');
  await expect(contextMenu).toBeVisible();
  await expect(contextMenu.getByText('label 1')).toBeVisible();
  await expect(contextMenu.getByRole('separator')).toBeVisible();
  await expect(contextMenu.getByText('label 2')).toBeVisible();

  // renders with icon
  await expect(contextMenu.getByText('label 3')).toBeVisible();
  await expect(
    contextMenu.getByRole('menuitem', { name: 'label 3' }).locator('i')
  ).toBeVisible();
  await expect(
    contextMenu.locator('i.icon-trash:left-of(:text("label 3"))').first()
  ).toBeVisible();
});

test('Renders style variants', async ({ page }) => {
  const contextMenu = page.getByTestId('context-menu-default');

  // default is primary styling
  await expect(contextMenu.getByText('label 1')).toHaveClass(/text-default/u);

  await expect(
    contextMenu.getByRole('menuitem', { name: 'label 3' }).locator('v-icon')
  ).toHaveClass(/text-gray-6/u);
  await expect(contextMenu.getByText('label 3')).toHaveClass(/text-default/u);

  // variant=primary
  await expect(contextMenu.getByText('label 2')).toHaveClass(/text-default/u);

  // variant=danger
  await expect(
    contextMenu.getByRole('menuitem', { name: 'danger' }).locator('v-icon')
  ).toHaveClass(/text-danger-dark/u);
  await expect(contextMenu.getByText('danger')).toHaveClass(
    /text-danger-dark/u
  );
});

test('Dispatches select events', async ({ page }) => {
  const contextMenu = page.getByTestId('context-menu-default');

  // on click text label
  const oneSelected = waitForCustomEvent(page, 'select');
  await contextMenu.getByRole('menuitem', { name: 'label 1' }).click();
  await expect(oneSelected.detail()).resolves.toEqual({ value: 'label 1' });

  // on click icon
  const threeSelected = waitForCustomEvent(page, 'select');
  await contextMenu
    .getByRole('menuitem', { name: 'label 3' })
    .locator('v-icon')
    .click();
  await expect(threeSelected.detail()).resolves.toEqual({ value: 'label 3' });

  // on focus and enter key press
  await contextMenu.getByRole('menuitem', { name: 'label 2' }).focus();
  const twoSelected = waitForCustomEvent(page, 'select');
  await contextMenu.getByRole('menuitem', { name: 'label 2' }).press('Enter');
  await expect(twoSelected.detail()).resolves.toEqual({ value: 'label 2' });
});
