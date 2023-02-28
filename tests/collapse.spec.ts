import { test, expect } from '@playwright/test';

test('Collapse E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // All collapse elements should be visible
  const collapse = page.getByTestId('collapse-default')
  await expect(collapse).toBeVisible()

  const openCollapse = page.getByTestId('collapse-open')
  await expect(openCollapse).toBeVisible()

  const closedCollapse = page.getByTestId('collapse-closed')
  await expect(closedCollapse).toBeVisible()

  const bbCollapse = page.getByTestId('collapse-breadcrumbs-badge')
  await expect(bbCollapse).toBeVisible()

  // Main title should display
  const collapseTitleText = 'Robots...'
  const collapseTitle = collapse.getByText(collapseTitleText)
  await expect(collapseTitle).toBeVisible()
  await expect(collapseTitle).toHaveText(collapseTitleText)

  // Slot:title should display
  const titleSlotText = '(title)'
  const titleSlot = collapse.getByText(titleSlotText)
  await expect(titleSlot).toBeVisible()
  await expect(titleSlot).toHaveText(titleSlotText)

  // Slot:header should display
  const headerSlotText = '(header)'
  const headerSlot = collapse.getByText(headerSlotText)
  await expect(headerSlot).toBeVisible()
  await expect(headerSlot).toHaveText(headerSlotText)

  // Open collapse (by "open" property) should display chevron up
  await expect(openCollapse).toHaveJSProperty('open','true')
  await expect(openCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(openCollapse.locator('i')).toBeVisible()
  await expect(openCollapse.locator('v-icon')).toHaveClass(/rotate-180/)

  // Closed collapse should display chevron down

  // no "open" property, default display closed
  await expect(collapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(collapse.locator('i')).toBeVisible()
  await expect(collapse.locator('v-icon')).toHaveClass(/rotate-0/)

  // "open" property "false" has been applied
  await expect(closedCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(closedCollapse.locator('i')).toBeVisible()
  await expect(closedCollapse.locator('v-icon')).toHaveClass(/rotate-0/)

  // If closed, after click, collapse should open (and display child)
  const expandText = '...are pretty cool!'
  const expand = collapse.getByText(expandText)

  await expect(collapse).toHaveJSProperty('open', 'false')
  await expect(expand).toBeHidden()
  await collapse.click()
  await expect(expand).toBeVisible()
  await expect(expand).toHaveText(expandText)
  await expect(collapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(collapse.locator('i')).toBeVisible()
  await expect(collapse.locator('v-icon')).toHaveClass(/rotate-180/)

  // If open, after click, collapse should close (and hide child)
  await expect(expand).toBeVisible()
  await collapse.click()
  await expect(expand).toBeHidden()
  await expect(collapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(collapse.locator('i')).toBeVisible()
  await expect(collapse.locator('v-icon')).toHaveClass(/rotate-0/)

  // Collapse with breadcrumbs and badge should display properly
  const bbTitleText = "A word on bread"
  await expect(bbCollapse.getByText(bbTitleText)).toBeVisible()
  await expect(bbCollapse.getByText(bbTitleText)).toHaveText(bbTitleText)
  // Breadcrumbs should display
  await expect(bbCollapse.getByText('sourdough')).toBeVisible()
  await expect(bbCollapse.getByText('ciabatta')).toBeVisible()
  // Badge should display
  await expect(bbCollapse.getByText('FRESH')).toBeVisible()
  const bbExpandText = "How do you tell how good bread is without tasting it? Not the smell, not the look, but the sound of the crust. Listen. Symphony of crackle."
  await expect(bbCollapse.getByText(bbExpandText)).toBeHidden()
});
