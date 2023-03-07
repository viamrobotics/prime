import { test, expect } from '@playwright/test';
import { waitForCustomEvent, waitForCustomEventTimeout } from './lib/helper.ts'


test('Radio E2E Test', async ({ page }) => {
  await page.goto('/test.html');

  // Confirm All Options Render Correctly As Buttons
  const radio = page.getByTestId("radio-selected-test")
  await expect(radio).toBeVisible()

  const opt1 = page.getByRole('button', { name: 'Opt 1' })
  const opt2 = page.getByRole('button', { name: 'Opt 2' })
  const opt3 = page.getByRole('button', { name: 'Opt 3' })

  await expect(opt1).toBeVisible()
  await expect(opt2).toBeVisible()
  await expect(opt3).toBeVisible()

  await expect(opt1).toHaveText('Opt 1')
  await expect(opt2).toHaveText('Opt 2')
  await expect(opt3).toHaveText('Opt 3')

  // Confirm Selected Value - Opt 3
  await expect(opt1).toHaveClass(/bg-white/)
  await expect(opt2).toHaveClass(/bg-white/)
  await expect(opt3).toHaveClass(/bg-black/)

  // Confirm Click Changes Selected to Opt 2
  const opt2Selected = waitForCustomEvent(page,'input')
  await opt2.click()
  await expect(opt2Selected).toBeTruthy()

  await expect(opt1).toHaveClass(/bg-white/)
  await expect(opt2).toHaveClass(/bg-black/)
  await expect(opt3).toHaveClass(/bg-white/)

  // Check that Keydown Changes Value 
  const radioKeydown = page.getByTestId("radio-keydown-test")
  await expect(radioKeydown).toBeVisible()

  const opt4 = page.getByRole('button', { name: 'Opt 4' })
  const opt5 = page.getByRole('button', { name: 'Opt 5' })
  const opt6 = page.getByRole('button', { name: 'Opt 6' })

  await expect(opt4).toBeVisible()
  await expect(opt5).toBeVisible()
  await expect(opt6).toBeVisible()

  await expect(opt4).toHaveClass(/bg-white/)
  await expect(opt5).toHaveClass(/bg-black/)
  await expect(opt6).toHaveClass(/bg-white/)

  // Focus on Opt 6 - Keydown Test
  const opt6Selected = waitForCustomEvent(page,'input')
  await opt6.focus()
  // Hit Enter
  await page.keyboard.press('Enter')

  await expect(opt4).toHaveClass(/bg-white/)
  await expect(opt5).toHaveClass(/bg-white/)
  await expect(opt6).toHaveClass(/bg-black/)

  // Label Default
  // Label Top
  // Label Left

  // Tooltip Default
  const tooltipDef = page.getByTestId("radio-tooltip-def-test").locator('v-tooltip div').first()
  await expect(tooltipDef).toHaveClass(/icon-info-outline/)

  // Tooltip Warn
  const tooltipWarn = page.getByTestId("radio-tooltip-warn-test").locator('v-tooltip div').first()
  await expect(tooltipWarn).toHaveClass(/icon-error-outline text-orange-400/)

  // Tooltip Error
  const tooltipError = page.getByTestId("radio-tooltip-error-test").locator('v-tooltip div').first()
  await expect(tooltipError).toHaveClass(/icon-error-outline text-red-600/)

  // Tooltip Info
  const tooltipInfo = page.getByTestId("radio-tooltip-info-test").locator('v-tooltip div').first()
  await expect(tooltipInfo).toHaveClass(/icon-info-outline/)

  // Tooltip Left
  // Tooltip Hover

  // Readonly, Click
  const readonly2 = page.getByRole('button', { name: 'Readonly 2' })
  await expect(readonly2).toBeVisible()

  const readonly2Selected = waitForCustomEventTimeout(page,'input')
  await readonly2.press('Enter')
  await readonly2Selected
  
  // Readonly Keydown
  const readonly5 = page.getByRole('button', { name: 'Readonly 5' })
  await expect(readonly5).toBeVisible()

  const readonly5Selected = waitForCustomEventTimeout(page,'input')
  await readonly5.press('Enter')
  await readonly5Selected
















//   // Check Tabs Buttons Are Visible
//   await expect(selectedTestTabs).toBeVisible()

//   await expect(tab1).toBeVisible()
//   await expect(tab2).toBeVisible()
//   await expect(tab3).toBeVisible()

//   // Check Tab Buttons Have Correct Text
//   await expect(tab1).toHaveText('Tab 1')
//   await expect(tab2).toHaveText('Tab 2')
//   await expect(tab3).toHaveText('Tab 3')

//   // Check Selected Attribute is Correct (Tab 2)
//   await expect(selectedTestTabs).toHaveAttribute("selected", "Tab 2")

//   // Check Selected Tab Has Correct Background Color of White (Tab 2)
//   await expect(tab1).not.toHaveClass(/bg-white/)
//   await expect(tab2).toHaveClass(/bg-white/)
//   await expect(tab3).not.toHaveClass(/bg-white/)


//   // Click on Tab 3 
//   // Check That New Selected Tab is Correct (Tab 3)
//   const tab3Selected = waitForCustomEvent(page,'input')
//   await tab3.click()
//   await expect(tab3Selected).toBeTruthy()


//   // Check That New Selected Tab Has Correct Background Color of White (Tab 3)
//   await expect(tab1).not.toHaveClass(/bg-white/)
//   await expect(tab2).not.toHaveClass(/bg-white/)
//   await expect(tab3).toHaveClass(/bg-white/)

//   // Focus, Keydown Test
//   // Check That Selected Tab to Start Is Tab Z

//   const keyEnterTestTabs = page.getByTestId("tabs-key-enter-test")
//   await expect(keyEnterTestTabs).toHaveAttribute("selected", "Tab Z")

//   const tabX = page.getByRole('button', { name: 'Tab X' })
//   const tabY = page.getByRole('button', { name: 'Tab Y' })
//   const tabZ = page.getByRole('button', { name: 'Tab Z' })

//   await expect(tabX).not.toHaveClass(/bg-white/)
//   await expect(tabY).not.toHaveClass(/bg-white/)
//   await expect(tabZ).toHaveClass(/bg-white/)

//   // Focus on Tab Y
//   const tabYSelected = waitForCustomEvent(page,'input')
//   await tabY.focus()
//   // Hit Enter
//   await page.keyboard.press('Enter')
  
//   // Check That New Selected Tab is Tab Y
//   await expect(tabYSelected).toBeTruthy()

//   await expect(tabX).not.toHaveClass(/bg-white/)
//   await expect(tabY).toHaveClass(/bg-white/)
//   await expect(tabZ).not.toHaveClass(/bg-white/)
});

