import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/tooltip-test.html');
});

test('Confirms tooltip text is visible upon hover', async ({ page }) => {
  const tooltip = page.getByRole('tooltip', { name: 'This is the hover test'})
  await expect(tooltip).not.toBeVisible()
  const wordToHover = page.getByText('Hover Test').first()
  await wordToHover.hover();
  await expect(tooltip).toBeVisible()
});

test('Confirms tooltip text is above text to hover if location attribute is specified as "top"', async ({ page }) => {
  const textLocatedBelow = await page.locator('p:near(:text("This is the top test"))').textContent()
  expect(textLocatedBelow).toBe('Top Test')
  const tooltip = page.getByRole('tooltip', { name: 'This is the hover test'})
  await expect(tooltip).toHaveClass(/rotate/)
});

test('Confirms tooltip text is below text to hover if location attribute is specified as "bottom"', async ({ page }) => {
  const textLocatedAbove = await page.locator('p:near(:text("This is the bottom test"))').textContent()
  expect(textLocatedAbove).toBe('Bottom Test')
  const tooltip = page.getByRole('tooltip', { name: 'This is the bottom test'})
});

test('Confirms tooltip text is right of text to hover if location attribute is specified as "right"', async ({ page }) => {
  const textLocatedLeft = await page.locator('p:near(:text("This is the right test"))').textContent()
  expect(textLocatedLeft).toBe('Right Test')
  const tooltip = page.getByRole('tooltip', { name: 'This is the right test'})
});

test('Confirms tooltip text is left of text to hover if location attribute is specified as "left"', async ({ page }) => {
  const textLocatedRight = await page.locator('p:near(:text("This is the left test"))').textContent()
  expect(textLocatedRight).toBe('Left Test')
  const tooltip = page.getByRole('tooltip', { name: 'This is the left test'})
});

test('Confirms tooltip text is above text to hover if no location attribute is specified', async ({ page }) => {
  const textLocatedRight = await page.locator('p:near(:text("This text should display above"))').textContent()
  expect(textLocatedRight).toBe('Def Test')
  const tooltip = page.getByRole('tooltip', { name: 'This text should display above'})
});


