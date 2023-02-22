import { test, expect } from '@playwright/test';

test('Collapse E2E Tests', async ({ page }) => {
  await page.goto('/test.html');

  // Title
  const collapseTitle = page.getByText('Robots...')

  await expect(collapseTitle).toBeVisible()
  await expect(collapseTitle).toHaveText('Robots...')

  // Slot: title
  const collapseTitleSlot = page.getByText('...(title)...')
  await expect(collapseTitleSlot).toBeVisible()
  await expect(collapseTitleSlot).toHaveText('...(title)...')

  // Header: open
  // expect(collapseTitle.getAttribute("title")).toBeTruthy

  // Header: open

  // GIVEN a "open" attribute has been applied to the v-collapse element
  // AND the "open" attribute value is true WHEN the element is rendered
  // THEN the collapse should render the header with the  chevron pointing down

  // Header: closed

  // GIVEN a "open" attribute has not been applied to the  v-collapse element
  // OR a "open" attribute has been applied to the v-collapse element
  // AND the "open" attribute value is falseWHEN the element is rendered
  // THEN the collapse should render the header with the chevron pointing down
  const collapse = page.getByTestId('collapse')
  await expect(collapse.locator('i')).toHaveClass(/icon-chevron-down/)
  await expect(collapse.locator('i')).toBeVisible()
  await expect(collapse.locator('v-icon')).toHaveClass(/rotate-0/)

  // await expect(chevronDown.getAttribute('class')).toBe(/rotate-0/)

  // await expect(chevronDown).toHaveClass(/rotate-0/)

  // Slot: header

  // GIVEN a child element is included in the v-collapseAND the child element has a "slot"AND the "slot" attribute value is "header"WHEN the element is renderedTHEN the collapse should render the child element  before the chevron in the collapse header

  // Click: open

  // GIVEN the v-collapse is closedWHEN the v-collapse header is clickedTHEN the collapse should open

  // Click: close

  // GIVEN the v-collapse is openWHEN the v-collapse header is clickedTHEN the collapse should close

  // Children

  // GIVEN a child element is included in the v-collapseAND the child element does not have a "slot" attributeOR the "slot" attribute value is not "title"OR the "slot" attribute value is not "header"WHEN the element is renderedAND the collapse is openTHEN the collapse should render the child element  under the collapse header

});
