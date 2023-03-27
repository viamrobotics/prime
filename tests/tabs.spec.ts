import { test, expect } from '@playwright/test';
import { waitForCustomEvent } from './lib/helper.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/tabs-test.html');
});

test('Renders a list of values specified by the tabs attribute as tabs', async ({
  page,
}) => {
  // Confirm All Tabs Render Correctly
  const selectedTestTabs = page.getByTestId('tabs-selected-test');

  const tab1 = page.getByRole('button', { name: 'Tab 1' });
  const tab2 = page.getByRole('button', { name: 'Tab 2' });
  const tab3 = page.getByRole('button', { name: 'Tab 3' });

  // Check Tabs Buttons Are Visible
  await expect(selectedTestTabs).toBeVisible();

  await expect(tab1).toBeVisible();
  await expect(tab2).toBeVisible();
  await expect(tab3).toBeVisible();

  // Check Tab Buttons Have Correct Text
  await expect(tab1).toHaveText('Tab 1');
  await expect(tab2).toHaveText('Tab 2');
  await expect(tab3).toHaveText('Tab 3');
});

test('Confirms selected value is correct if selected attribute is specified', async ({
  page,
}) => {
  const selectedTestTabs = page.getByTestId('tabs-selected-test');

  const tab1 = page.getByRole('button', { name: 'Tab 1' });
  const tab2 = page.getByRole('button', { name: 'Tab 2' });
  const tab3 = page.getByRole('button', { name: 'Tab 3' });

  // Check Selected Attribute is Correct (Tab 2)
  await expect(selectedTestTabs).toHaveAttribute('selected', 'Tab 2');

  // Check Selected Tab Has Correct Background Color of White (Tab 2)
  await expect(tab1).not.toHaveClass(/bg-white/);
  await expect(tab2).toHaveClass(/bg-white/);
  await expect(tab3).not.toHaveClass(/bg-white/);
});

test('Confirms that selected tab updates upon click', async ({ page }) => {
  const selectedTestTabs = page.getByTestId('tabs-selected-test');

  const tab1 = page.getByRole('button', { name: 'Tab 1' });
  const tab2 = page.getByRole('button', { name: 'Tab 2' });
  const tab3 = page.getByRole('button', { name: 'Tab 3' });

  // Check Selected Attribute is Correct (Tab 2)
  await expect(selectedTestTabs).toHaveAttribute('selected', 'Tab 2');

  // Check Selected Tab Has Correct Background Color of White (Tab 2)
  await expect(tab1).not.toHaveClass(/bg-white/);
  await expect(tab2).toHaveClass(/bg-white/);
  await expect(tab3).not.toHaveClass(/bg-white/);

  // Click on Tab 3
  // Check That New Selected Tab is Correct (Tab 3)
  const tab3Selected = waitForCustomEvent(page, 'input');
  await tab3.click();
  await tab3Selected.detail();

  // Check That New Selected Tab Has Correct Background Color of White (Tab 3)
  await expect(tab1).not.toHaveClass(/bg-white/);
  await expect(tab2).not.toHaveClass(/bg-white/);
  await expect(tab3).toHaveClass(/bg-white/);
});

test('Confirms that on focus keydown, tab selection updates', async ({
  page,
}) => {
  // Focus, Keydown Test
  // Check That Selected Tab to Start Is Tab Z
  const keyEnterTestTabs = page.getByTestId('tabs-key-enter-test');
  await expect(keyEnterTestTabs).toHaveAttribute('selected', 'Tab Z');

  const tabX = page.getByRole('button', { name: 'Tab X' });
  const tabY = page.getByRole('button', { name: 'Tab Y' });
  const tabZ = page.getByRole('button', { name: 'Tab Z' });

  await expect(tabX).not.toHaveClass(/bg-white/);
  await expect(tabY).not.toHaveClass(/bg-white/);
  await expect(tabZ).toHaveClass(/bg-white/);

  // Focus on Tab Y
  const tabYSelected = waitForCustomEvent(page, 'input');
  await tabY.focus();
  // Hit Enter
  await page.keyboard.press('Enter');

  // Check That New Selected Tab is Tab Y
  await tabYSelected.detail();

  await expect(tabX).not.toHaveClass(/bg-white/);
  await expect(tabY).toHaveClass(/bg-white/);
  await expect(tabZ).not.toHaveClass(/bg-white/);
});
