import { test, expect } from '@playwright/test';
import config from '../tailwind.config.cjs'

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
});

test('Confirms tooltip text is visible upon hover', async ({ page }) => {
  await page.goto('/test.html');

  // Tooltip Hover Test
  const tooltipH = page.getByText('Hover Test')
  const tooltipHoverText = page.getByRole('tooltip', { name: 'This is the hover test'})
  await tooltipH.hover()
  await expect(tooltipHoverText).toBeVisible()
  await expect(tooltipHoverText).toHaveText('This is the hover test')
});

test('Renders tooltip text above upon hover if location attribute is specified as "top"', async ({ page }) => {
  await page.goto('/test.html');

  const tooltipTop = page.getByText('Top Test')
  const tooltipTextTop = page.locator("div.absolute top-0 left-0 bg-gray-9 text-white text-left text-xs py-1 px-2 border border-gray-9 z-[1000]:above(:text('Top Test'))").first()
  await expect(tooltipTextTop).toHaveText('This is the top test')
});

test('Renders tooltip text below upon hover if location attribute is specified as "bottom"', async ({ page }) => {
  await page.goto('/test.html');

  const tooltipTop = page.getByText('Bottom Test')
  const tooltipTextTop = page.locator("div.absolute top-0 left-0 bg-gray-9 text-white text-left text-xs py-1 px-2 border border-gray-9 z-[1000]:below(:text('Top Test'))").first()
  await expect(tooltipTextTop).toHaveText('This is the bottom test')
});



  // // Tooltip Bottom Test
  // const tooltipRight = page.locator("div.icon-info-outline:below(:text('Tool 10'))").first()
  // await expect(tooltipRight).toHaveClass()

  // Tooltip Left Test

  // Tooltip Right Test

  // Tooltip Default Test (Top)


