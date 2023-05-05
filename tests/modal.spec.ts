import { test, expect } from '@playwright/test';

test('Renders appropriately according to open attribute', async ({ page }) => {
  await page.goto('/playground/modal-test.html');

  // No "open" attribute applied
  await expect(page.getByTestId('modal-default')).toBeHidden();

  // open="false" attribute applied
  await expect(page.getByTestId('modal-closed')).toBeHidden();

  // open="true" attribute applied
  const modalOpen = page.getByTestId('modal-open');
  await expect(modalOpen.locator('div').first()).toBeVisible(); // v-modal has 0-size, check first element with size
});

test('Renders title and message', async ({ page }) => {
  await page.goto('/playground/modal-test.html');

  // title renders on open modal
  const modalOpen = page.getByTestId('modal-open');
  await expect(modalOpen.getByText('Puff the Magic Dragon')).toBeVisible();

  // message renders on open modal
  await expect(
    modalOpen.getByText(
      'lived by the sea and frolicked in the autumn mist in a land called Honah Lee.'
    )
  ).toBeVisible();
});

test('Hides when overlay behind the modal is clicked', async ({ page }) => {
  await page.goto('/playground/modal-test.html');

  // Click Overlay
  await page.locator('#overlay').click({ force: true });
  await expect(page.getByTestId('modal-open')).toBeHidden();
});

test('Hides when overlay behind the modal is focused and "Enter" key is pressed', async ({
  page,
}) => {
  await page.goto('/playground/modal-test.html');

  // Keydown Overlay
  await page.locator('#overlay').press('Enter');
  await expect(page.getByTestId('modal-open')).toBeHidden();
});

test('Hides when "x" close icon is pressed', async ({ page }) => {
  await page.goto('/playground/modal-test.html');

  // Click close icon
  await page.getByRole('button', { name: 'x' }).click();
  await expect(page.getByTestId('modal-open')).toBeHidden();
});

test('Hides when "x" close icon is focused and "Enter" key is pressed', async ({
  page,
}) => {
  await page.goto('/playground/modal-test.html');

  // Keydown close icon
  await page.getByRole('button', { name: 'x' }).press('Enter');
  await expect(page.getByTestId('modal-open')).toBeHidden();
});

test('Renders child element in modal body', async ({ page }) => {
  await page.goto('/playground/modal-test.html');

  // Slot
  const modalOpen = page.getByTestId('modal-open');
  await expect(
    modalOpen.getByText(
      'Bring him strings and sealing wax and other fancy stuff'
    )
  ).toBeVisible();
});
