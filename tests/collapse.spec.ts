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

  // Slot:header should display
  const headerSlotText = '(header)'
  const headerSlot = page.getByText(headerSlotText)
  await expect(headerSlot).toBeVisible()
  await expect(headerSlot).toHaveText(headerSlotText)

  // If closed, after click, collapse should open (and display child)
  const expandText = '...are pretty cool!'
  const expand = collapse.getByText(expandText)

  await expect(collapse).toHaveJSProperty('open', 'false')
  await expect(expand).toBeHidden()
  await collapse.click()
  await expect(expand).toBeVisible()
  await expect(expand).toHaveText(expandText)
  await expect(openCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(openCollapse.locator('i')).toBeVisible()
  await expect(openCollapse.locator('v-icon')).toHaveClass(/rotate-180/)

  // If open, after click, collapse should close (and hide child)
  await expect(expand).toBeVisible()
  await collapse.click()
  await expect(expand).toBeHidden()
  await expect(closedCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(closedCollapse.locator('i')).toBeVisible()
  await expect(closedCollapse.locator('v-icon')).toHaveClass(/rotate-0/)
});
