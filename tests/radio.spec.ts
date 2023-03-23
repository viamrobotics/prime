import { test, expect } from '@playwright/test';
import { waitForCustomEvent, waitForCustomEventTimeout } from './lib/helper.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/radio-test.html');
});

test('Renders options as radio buttons', async ({ page }) => {
  // Confirm All Options Render Correctly As Buttons
  const radio = page.getByTestId('radio-selected-test');
  await expect(radio).toBeVisible();

  const opt1 = page.getByRole('button', { name: 'Opt 1' });
  const opt2 = page.getByRole('button', { name: 'Opt 2' });
  const opt3 = page.getByRole('button', { name: 'Opt 3' });

  await expect(opt1).toBeVisible();
  await expect(opt2).toBeVisible();
  await expect(opt3).toBeVisible();

  await expect(opt1).toHaveText('Opt 1');
  await expect(opt2).toHaveText('Opt 2');
  await expect(opt3).toHaveText('Opt 3');
});

test('Confirms selected attribute value renders as selected radio button', async ({
  page,
}) => {
  const opt1 = page.getByRole('button', { name: 'Opt 1' });
  const opt2 = page.getByRole('button', { name: 'Opt 2' });
  const opt3 = page.getByRole('button', { name: 'Opt 3' });

  // Confirm Selected Value - Opt 3
  await expect(opt1).toHaveClass(/bg-white/);
  await expect(opt2).toHaveClass(/bg-white/);
  await expect(opt3).toHaveClass(/bg-gray-9/);
});

test('Confirms selected radio button updates on click', async ({ page }) => {
  const opt1 = page.getByRole('button', { name: 'Opt 1' });
  const opt2 = page.getByRole('button', { name: 'Opt 2' });
  const opt3 = page.getByRole('button', { name: 'Opt 3' });

  // Confirm Click Changes Selected to Opt 2
  const opt2Selected = waitForCustomEvent(page, 'input');
  await opt2.click();
  await expect(opt2Selected).toBeTruthy();

  await expect(opt1).toHaveClass(/bg-white/);
  await expect(opt2).toHaveClass(/bg-gray-9/);
  await expect(opt3).toHaveClass(/bg-white/);
});

test('Confirms selected radio button updates on keydown enter', async ({
  page,
}) => {
  // Check that Keydown Changes Value
  const radioKeydown = page.getByTestId('radio-keydown-test');
  await expect(radioKeydown).toBeVisible();

  const opt4 = page.getByRole('button', { name: 'Opt 4' });
  const opt5 = page.getByRole('button', { name: 'Opt 5' });
  const opt6 = page.getByRole('button', { name: 'Opt 6' });

  await expect(opt4).toBeVisible();
  await expect(opt5).toBeVisible();
  await expect(opt6).toBeVisible();

  await expect(opt4).toHaveClass(/bg-white/);
  await expect(opt5).toHaveClass(/bg-gray-9/);
  await expect(opt6).toHaveClass(/bg-white/);

  // Focus on Opt 6 - Keydown Test
  const opt6Selected = waitForCustomEvent(page, 'input');
  await opt6.focus();
  // Hit Enter
  await page.keyboard.press('Enter');
  await expect(opt6Selected).toBeTruthy();

  await expect(opt4).toHaveClass(/bg-white/);
  await expect(opt5).toHaveClass(/bg-white/);
  await expect(opt6).toHaveClass(/bg-gray-9/);
});

test('Confirms the radio element default behavior renders label to the top of the radio buttons', async ({
  page,
}) => {
  // Label Default (Render Label On Top Of Radio) (Checks that button with text "Def 1" is below label of "Def Position")
  const def1Button = await page
    .locator("button:below(:text('Def Position'))")
    .first()
    .textContent();
  expect(def1Button).toContain('Def 1');
});

test('Confirms if labelposition is set to top, label is rendered to the top of the radio buttons', async ({
  page,
}) => {
  // Label Top (Render Label On Top Of Radio) (Checks that button with text "Top 1" is below label of "Top Position")
  const top1Button = await page
    .locator("button:below(:text('Top Position'))")
    .first()
    .textContent();
  expect(top1Button).toContain('Top 1');
});

test('Confirms if labelposition is set to left, label is rendered to the left of the radio buttons', async ({
  page,
}) => {
  // Label Left (Check That Button Is Right Of Label)
  const left1Button = await page
    .locator("button:right-of(:text('Left Position'))")
    .first()
    .textContent();
  expect(left1Button).toContain('Left 1');
});

test('Default behavior for radio tooltips renders them as info icons', async ({
  page,
}) => {
  // Tooltip Default
  const tooltipDef = page
    .getByTestId('radio-tooltip-def-test')
    .locator('v-tooltip div')
    .first();
  await expect(tooltipDef).toHaveClass(/icon-info-outline/);
});

test('Radio tooltips are rendered as warn icon when state attribute is set to warn', async ({
  page,
}) => {
  // Tooltip Warn
  const tooltipWarn = page
    .getByTestId('radio-tooltip-warn-test')
    .locator('v-tooltip div')
    .first();
  await expect(tooltipWarn).toHaveClass(/icon-error-outline text-warning-fg/);
});

test('Radio tooltips are rendered as warn icon when state attribute is set to error', async ({
  page,
}) => {
  // Tooltip Error
  const tooltipError = page
    .getByTestId('radio-tooltip-error-test')
    .locator('v-tooltip div')
    .first();
  await expect(tooltipError).toHaveClass(/icon-error-outline text-danger-fg/);
});

test('Radio tooltips are rendered as info icon when state attribute is set to info', async ({
  page,
}) => {
  // Tooltip Info
  const tooltipInfo = page
    .getByTestId('radio-tooltip-info-test')
    .locator('v-tooltip div')
    .first();
  await expect(tooltipInfo).toHaveClass(/icon-info-outline/);
});

test('Radio tooltip is rendered to the left of the label when label position attribute is specified as left', async ({
  page,
}) => {
  // Tooltip Left
  const tooltipLeft = page
    .locator("div.icon-info-outline:left-of(:text('Tool 10'))")
    .first();
  await expect(tooltipLeft).toHaveClass(/icon-info-outline/);
});

test('Radio tooltip text is visable upon hover', async ({ page }) => {
  // Tooltip Hover
  const tooltipHover = page
    .getByTestId('radio-tooltip-hover-test')
    .locator('v-tooltip div')
    .first();
  const tooltipText = page.getByRole('tooltip', {
    name: 'This is the hover tooltip test',
  });
  await tooltipHover.hover();
  await expect(tooltipText).toBeVisible();
  await expect(tooltipText).toHaveText('This is the hover tooltip test');
});

test('Renders radio element in readonly state if readonly attribute is true', async ({
  page,
}) => {
  // Readonly, Click
  const readonly2 = page.getByRole('button', { name: 'Readonly 2' });
  await expect(readonly2).toBeVisible();

  const readonly2Selected = waitForCustomEventTimeout(page, 'input');
  await readonly2.press('Enter');
  await readonly2Selected;

  // Readonly Keydown
  const readonly5 = page.getByRole('button', { name: 'Readonly 5' });
  await expect(readonly5).toBeVisible();

  const readonly5Selected = waitForCustomEventTimeout(page, 'input');
  await readonly5.press('Enter');
  await readonly5Selected;
});
