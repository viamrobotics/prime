import { test, expect, Page } from '@playwright/test';
import {waitForCustomEvent, waitForCustomEventTimeout} from './lib/helper.ts'



test('Pills render and interact as expected', async ({ page }) => {
    await page.goto('/test.html');

    const testDefault = page.getByTestId("pill-default")
    const testReadOnly = page.getByTestId('pill-readonly-true')
    const testDisabled = page.getByTestId("pill-disabled-true")

    // Value
    await expect(page.getByTestId("pill-value")).toBeVisible()
    await expect(page.getByTestId("pill-value")).toContainText("one")
    // removable-default
    await expect(testDefault).toBeVisible()
    await expect(testDefault.getByRole('button')).toBeVisible()
    // removable-true
    await expect(page.getByTestId("pill-removable-true")).toBeVisible()
    await expect(page.getByTestId("pill-removable-true").getByRole('button')).toBeVisible()
    // removable-false
    await expect(page.getByTestId("pill-removable-false")).toBeVisible()
    await expect(page.getByTestId("pill-removable-false").getByRole('button')).toHaveCount(0)
    // disabled-default
    await expect(testDefault).toBeVisible()
    // disabled-true
    await expect(page.getByTestId("pill-disabled-true").locator("div")).toHaveAttribute("aria-disabled","true")
    // disabled-false
    await expect(page.getByTestId("pill-disabled-false")).toBeVisible()
    await expect(page.getByTestId("pill-disabled-false").locator("div")).not.toHaveAttribute("aria-readonly","true")
    // readonly-default
    await expect(testDefault).toBeVisible()
    await expect(testDefault.getByRole('button')).toBeVisible()
    // readonly-true
    await expect(page.getByTestId("pill-readonly-true")).toBeVisible()
    await expect(page.getByTestId("pill-readonly-true").locator("div")).toHaveAttribute("aria-readonly","true")
    // readonly-false
    await expect(page.getByTestId("pill-readonly-false")).toBeVisible()
    await expect(page.getByTestId("pill-readonly-false").getByRole('button')).toBeVisible()
    await expect(page.getByTestId("pill-readonly-false")).not.toHaveAttribute("aria-readonly","true")
    // Click:default
    const clickDefault = waitForCustomEvent(page,'remove')
    await testDefault.getByRole('button').click()
    await expect(clickDefault).toBeTruthy()
    // Click:disabled
    const clickDisabled = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("pill-disabled-true").getByRole('button').press("Enter")
    await clickDisabled
    // // Click:readonly
    const clickReadOnly = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("pill-readonly-true").getByRole('button').press("Enter")
    await clickReadOnly
    // // Key Down:default
    const keyDownDefault = waitForCustomEvent(page,'remove')
    await testDefault.getByRole('button').press("Enter")
    await expect(keyDownDefault).toBeTruthy()
    // // Key Down:disabled
    const keyDownDisabled = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("pill-disabled-true").getByRole('button').press("Enter")
    await keyDownDisabled
    // // Key Down:readonly
    const keyDownReadOnly = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("pill-readonly-true").getByRole('button').press("Enter")
    await keyDownReadOnly
});
