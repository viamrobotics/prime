import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/collapse-test.html');
});

test('Confirms main title displays in collapse element if title attribute has been specified', async ({ page }) => {
  const collapse = page.getByTestId('collapse-default')
  await expect(collapse).toBeVisible()
  
  const collapseTitleText = 'Robots...'
  const collapseTitle = collapse.getByText(collapseTitleText)
  await expect(collapseTitle).toBeVisible()
  await expect(collapseTitle).toHaveText(collapseTitleText)
});

test('Collapse renders title slot text', async ({ page }) => {
  const collapse = page.getByTestId('collapse-default')
  
  const titleSlotText = '(title)'
  const titleSlot = collapse.getByText(titleSlotText)
  await expect(titleSlot).toBeVisible()
  await expect(titleSlot).toHaveText(titleSlotText)
});

test('Collapse renders header slot text', async ({ page }) => {
  const collapse = page.getByTestId('collapse-default')
  
  const headerSlotText = '(header)'
  const headerSlot = collapse.getByText(headerSlotText)
  await expect(headerSlot).toBeVisible()
  await expect(headerSlot).toHaveText(headerSlotText)
});

test('Collapse renders open with chevron in closed position if open attribute specified as true', async ({ page }) => {
  const openCollapse = page.getByTestId('collapse-open')
  await expect(openCollapse).toBeVisible()

  await expect(openCollapse).toHaveJSProperty('open','true')
  await expect(openCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(openCollapse.locator('i')).toBeVisible()
  await expect(openCollapse.locator('v-icon')).toHaveClass(/rotate-180/)
});

test('Collapse renders closed with chevron in closed position if open attribute specified as false', async ({ page }) => {
  // no "open" property, default display closed
  const collapse = page.getByTestId('collapse-default')
  await expect(collapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(collapse.locator('i')).toBeVisible()
  await expect(collapse.locator('v-icon')).toHaveClass(/rotate-0/)

  // "open" property "false" has been applied
  const closedCollapse = page.getByTestId('collapse-closed')
  await expect(closedCollapse).toBeVisible()
  await expect(closedCollapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(closedCollapse.locator('i')).toBeVisible()
  await expect(closedCollapse.locator('v-icon')).toHaveClass(/rotate-0/)
});

test('If collapse is in closed position, confirm it opens after click and vice versa', async ({ page }) => {
  const collapse = page.getByTestId('collapse-default')
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
});

test('Confirms collapse with breadcrumbs and badge displays properly', async ({ page }) => {
  const bbCollapse = page.getByTestId('collapse-breadcrumbs-badge')
  await expect(bbCollapse).toBeVisible()
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
