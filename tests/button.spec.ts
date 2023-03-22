import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/button-test.html');
});

test('Renders label attribute as text within the button', async ({ page }) => {
  const labelButton = page.getByTestId('label');
  await expect(labelButton.locator('button')).toBeVisible();
  await expect(labelButton.locator('button')).toContainText('Label');
});

test('Renders a button in the style of the primary variant if no variant is specified', async ({
  page,
}) => {
  const defaultButton = page.getByTestId('default-primary');
  await expect(defaultButton.locator('button')).toBeVisible();
  await expect(defaultButton.locator('button')).toHaveClass(/bg-white/);
  await expect(defaultButton.locator('button')).toHaveClass(/border-gray-9/);
});

test('Renders a button in the style of the primary variant if variant is specified as primary', async ({
  page,
}) => {
  const primaryButton = page.getByTestId('primary');
  await expect(primaryButton.locator('button')).toBeVisible();
  await expect(primaryButton.locator('button')).toHaveClass(/bg-white/);
  await expect(primaryButton.locator('button')).toHaveClass(/border-gray-9/);
});

test('Renders a button in the style of inverse primary if the variant is specified as inverse primary', async ({
  page,
}) => {
  const inversePrimaryButton = page.getByTestId('inverse-primary');
  await expect(inversePrimaryButton.locator('button')).toBeVisible();
  await expect(inversePrimaryButton.locator('button')).toHaveClass(/bg-gray-9/);
  await expect(inversePrimaryButton.locator('button')).toHaveClass(
    /border-gray-9/
  );
  await expect(inversePrimaryButton.locator('button')).toHaveClass(
    /text-white/
  );
});

test('Renders a button in the style of success if the variant is specified as success', async ({
  page,
}) => {
  const successButton = page.getByTestId('success');
  await expect(successButton.locator('button')).toBeVisible();
  await expect(successButton.locator('button')).toHaveClass(/bg-success-fg/);
  await expect(successButton.locator('button')).toHaveClass(
    /border-success-fg/
  );
  await expect(successButton.locator('button')).toHaveClass(/text-white/);
});

test('Renders a button in the style of danger if the variant is specified as danger', async ({
  page,
}) => {
  const dangerButton = page.getByTestId('danger');
  await expect(dangerButton.locator('button').first()).toBeVisible();
  await expect(dangerButton.locator('button').first()).toHaveClass(
    /bg-danger-fg/
  );
  await expect(dangerButton.locator('button').first()).toHaveClass(
    /border-danger-fg/
  );
  await expect(dangerButton.locator('button').first()).toHaveClass(
    /text-white/
  );
});

test('Renders a button in the style of outline danger if the variant is specified as outline danger', async ({
  page,
}) => {
  const outlineDangerButton = page.getByTestId('outline-danger');
  await expect(outlineDangerButton.locator('button')).toBeVisible();
  await expect(outlineDangerButton.locator('button')).toHaveClass(
    /bg-danger-bg/
  );
  await expect(outlineDangerButton.locator('button')).toHaveClass(
    /border-danger-bg/
  );
  await expect(outlineDangerButton.locator('button')).toHaveClass(
    /text-danger-fg/
  );
});

test('Renders a button as disabled if the button has a disabled attribute of true', async ({
  page,
}) => {
  const disabledButton = page.getByRole('button', { name: 'Disabled Label' });
  await expect(disabledButton).toBeVisible();
  await expect(disabledButton).toBeDisabled();
});

test('Renders a tooltip over the button if a tooltip attribute is specified', async ({
  page,
}) => {
  const tooltipButton = page.getByRole('button', { name: 'Tooltip Label' });
  const tooltip = page.getByRole('tooltip', {
    name: 'This is the message for the tooltip',
  });
  await expect(tooltipButton).toBeVisible();
  await expect(tooltip).not.toBeVisible();
  await tooltipButton.hover();
  await expect(tooltip).toBeVisible();
});

test('Renders an icon within the button/next to the label if an icon attribute is specified', async ({
  page,
}) => {
  const iconWithinButton = page.getByRole('button', {
    name: 'Icon Within Button Label',
  });
  await expect(iconWithinButton).toBeVisible();
  await expect(iconWithinButton).toContainText('Label');
  await expect(iconWithinButton.locator('i')).toHaveClass(/icon-refresh/);
  await expect(iconWithinButton).toHaveClass(/border-gray-9/);
});

test('Renders the button as an icon if an icon attribute is specified and the button variant is icon', async ({
  page,
}) => {
  const iconAsButton = page.getByRole('button', { name: 'Icon As Button' });
  await expect(iconAsButton).toBeVisible();
  await expect(iconAsButton).not.toContainText('Icon As Button');
  await expect(iconAsButton.locator('i')).toHaveClass(/icon-refresh/);
  await expect(iconAsButton).not.toHaveClass(/border-gray-9/);
});

test('Tests that the button is clickable if not disabled', async ({ page }) => {
  const clickMeButton = page.getByRole('button', { name: 'Click Me' });
  await clickMeButton.isEnabled();
  await clickMeButton.click();
});
