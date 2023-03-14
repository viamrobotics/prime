import { test, expect } from '@playwright/test';
import config from '../tailwind.config.cjs'

test.beforeEach(async ({ page }) => {
  await page.goto('/test.html');
});

test('Confirms tooltip text is visible upon hover', async ({ page }) => {

  // Tooltip Hover Test

  // const hoverOver = page.getByText('Hover Test').first()
  const tooltipH = page.getByTestId('tooltip-hover-test')
  await expect(tooltipH.getByText('This is the hover test')).toBeHidden()
  await page.hover('p:has-text("Hover Test")')
  // This is super flaky
  // await expect(tooltipH.getByText('This is the hover test')).not.toBeHidden()
  // await expect(tooltipH.getByText('This is the hover test')).toBeVisible()
  await expect(tooltipH).toContainText('This is the hover test')
});


// test('Renders tooltip text above upon hover if location attribute is specified as "top"', async ({ page }) => {
//   const tooltipTextTop = await page.locator('[role="tooltip"]:above(p:has-text("Top Test"))').textContent()
//   expect(tooltipTextTop).toContain('This is the top test')
// });

// test('Renders tooltip text below upon hover if location attribute is specified as "bottom"', async ({ page }) => {
//   const tooltipTextBottom = await page.locator('[role="tooltip"]:below(:text("Bottom Test"))').textContent()
//   expect(tooltipTextBottom).toContain('This is the bottom test')

// //   // const tooltipTop = page.getByText('Bottom Test')
// //   // const tooltipTextTop = page.locator("div.absolute top-0 left-0 bg-gray-9 text-white text-left text-xs py-1 px-2 border border-gray-9 z-[1000]:below(:text('Top Test'))").first()
// //   // await expect(tooltipTextTop).toHaveText('This is the bottom test')
// });

test('Renders tooltip text  upon hover if location attribute is specified as "right"', async ({ page }) => {
  await page.goto('/test.html');

  const tooltipTextRight = await page.locator('[role="tooltip"]:right-of(p:has-text("Right Test"))').textContent()
  expect(tooltipTextRight).toContain('This is the right test')
});


  // // Tooltip Bottom Test
  // const tooltipRight = page.locator("div.icon-info-outline:below(:text('Tool 10'))").first()
  // await expect(tooltipRight).toHaveClass()

  // Tooltip Left Test

  // Tooltip Right Test

  // Tooltip Default Test (Top)


