import { test, expect } from '@playwright/test';
import config from '../tailwind.config.cjs'

test('Tooltip E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // Tooltip Hover Test
  const tooltipHover = page.getByText('Hover here - Hover Test')
  const tooltipText = page.getByRole('tooltip', { name: 'This is the hover test'})
  await tooltipHover.hover()
  await expect(tooltipText).toBeVisible()
  await expect(tooltipText).toHaveText('This is the hover test')

  // Tooltip Top Test
  const tooltipLeft = page.locator("div.icon-info-outline:above(:text('Tool 10'))").first()
  await expect(tooltipLeft).toHaveClass(/icon-info-outline/)

  // Tooltip Bottom Test
  const tooltipRight = page.locator("div.icon-info-outline:below(:text('Tool 10'))").first()
  await expect(tooltipRight).toHaveClass()

  // Tooltip Left Test

  // Tooltip Right Test

  // Tooltip Default Test (Top)


});
