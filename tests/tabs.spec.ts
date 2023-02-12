import { test, expect } from '@playwright/test';

test('Tabs E2E Test', async ({ page }) => {
  await page.goto('/test.html');

  // Confirm All Tabs Render Correctly
  const tab1 = page.getByRole('button', { name: 'Tab 1' })
  const tab2 = page.getByRole('button', { name: 'Tab 2' })
  const tab3 = page.getByRole('button', { name: 'Tab 3' })

  // Check Tabs Buttons Are Visible
  await expect(tab1).toBeVisible()
  await expect(tab2).toBeVisible()
  await expect(tab3).toBeVisible()

  // Check Tab Buttons Have Correct Text
  await expect(tab1).toHaveText('Tab 1')
  await expect(tab2).toHaveText('Tab 2')
  await expect(tab3).toHaveText('Tab 3')


  // Check Selected Tab Has Correct Background Color of White (Tab 2)
  await expect(tab1).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tab2).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tab3).not.toHaveCSS("background-color", "rgb(255, 255, 255)")

  // Click on Tab 3 
  await tab3.click()

  // Check That New Selected Tab Has Correct Background Color of White (Tab 3)
  await expect(tab1).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tab2).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tab3).toHaveCSS("background-color", "rgb(255, 255, 255)")

  // Check That If No Selected Value, Default Selected Is First Value (Tab A)
  // Currently, there is no default behavior.
  // const tabA = page.getByRole('button', { name: 'Tab A' })
  // const tabB = page.getByRole('button', { name: 'Tab B' })
  // const tabC = page.getByRole('button', { name: 'Tab C' })

  // await expect(tabA).toHaveCSS("background-color", "rgb(255, 255, 255)")
  // await expect(tabB).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  // await expect(tabC).not.toHaveCSS("background-color", "rgb(255, 255, 255)")

  // Focus, Keydown Test
  // Check That Selected Tab to Start Is Tab Z

  const tabX = page.getByRole('button', { name: 'Tab X' })
  const tabY = page.getByRole('button', { name: 'Tab Y' })
  const tabZ = page.getByRole('button', { name: 'Tab Z' })

  await expect(tabX).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tabY).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tabZ).toHaveCSS("background-color", "rgb(255, 255, 255)")

  // Focus on Tab Y
  await tabY.focus()
  // Hit Enter
  await page.keyboard.press('Enter')
  
  // Check That New Selected Tab is Tab Y
  await expect(tabX).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tabY).toHaveCSS("background-color", "rgb(255, 255, 255)")
  await expect(tabZ).not.toHaveCSS("background-color", "rgb(255, 255, 255)")
});

