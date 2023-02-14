import { test, expect, Page } from '@playwright/test';
import {waitForCustomEvent, waitForCustomEventTimeout} from './lib/helper.ts'



test('Pills render and interact as expected', async ({ page }) => {
    await page.goto('/test.html');

    const testDefault = page.getByTestId("default")
    const testReadOnly = page.getByTestId('Readonly:true')
    const testDisabled = page.getByTestId("Disabled:true")

    // Value
    await expect(page.getByTestId("Value")).toBeVisible()
    await expect(page.getByTestId("Value")).toContainText("one")
    // Removable:default
    await expect(testDefault).toBeVisible()
    await expect(testDefault.getByRole('button')).toBeVisible()
    // Removable:true
    await expect(page.getByTestId("Removable:true")).toBeVisible()
    await expect(page.getByTestId("Removable:true").getByRole('button')).toBeVisible()
    // Removable:false
    await expect(page.getByTestId("Removable:false")).toBeVisible()
    await expect(page.getByTestId("Removable:false").getByRole('button')).toHaveCount(0)
    // Disabled:default
    await expect(testDefault).toBeVisible()
    // Disabled:true
    await expect(page.getByTestId("Disabled:true").locator("div")).toHaveAttribute("aria-disabled","true")
    // Disabled:false
    await expect(page.getByTestId("Disabled:false")).toBeVisible()
    await expect(page.getByTestId("Disabled:false").locator("div")).not.toHaveAttribute("aria-readonly","true")
    // Readonly:default
    await expect(testDefault).toBeVisible()
    await expect(testDefault.getByRole('button')).toBeVisible()
    // Readonly:true
    await expect(page.getByTestId("Readonly:true")).toBeVisible()
    await expect(page.getByTestId("Readonly:true").locator("div")).toHaveAttribute("aria-readonly","true")
    // Readonly:false
    await expect(page.getByTestId("Readonly:false")).toBeVisible()
    await expect(page.getByTestId("Readonly:false").getByRole('button')).toBeVisible()
    await expect(page.getByTestId("Readonly:false")).not.toHaveAttribute("aria-readonly","true")
    // Click:default
    const clickDefault = waitForCustomEvent(page,'remove')
    await testDefault.getByRole('button').click()
    await expect(clickDefault).toBeTruthy()
    // Click:disabled
    const clickDisabled = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("Disabled:true").getByRole('button').press("Enter")
    await clickDisabled
    // // Click:readonly
    const clickReadOnly = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("Readonly:true").getByRole('button').press("Enter")
    await clickReadOnly
    // // Key Down:default
    const keyDownDefault = waitForCustomEvent(page,'remove')
    await testDefault.getByRole('button').press("Enter")
    await expect(keyDownDefault).toBeTruthy()
    // // Key Down:disabled
    const keyDownDisabled = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("Disabled:true").getByRole('button').press("Enter")
    await keyDownDisabled
    // // Key Down:readonly
    const keyDownReadOnly = waitForCustomEventTimeout(page, 'remove')
    await page.getByTestId("Readonly:true").getByRole('button').press("Enter")
    await keyDownReadOnly
});
