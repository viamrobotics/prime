import { test, expect } from '@playwright/test';

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
    await expect(page.getByTestId("Disabled:false").locator("div")).not.toBeDisabled()
    // Readonly:default
    await expect(testDefault).toBeVisible()
    await expect(testDefault.getByRole('button')).toBeVisible()
    // Readonly:true
    await expect(page.getByTestId("Readonly:true")).toBeVisible()
    await expect(page.getByTestId("Readonly:true").locator("div")).toHaveAttribute("aria-readonly","true")
    // Readonly:false
    await expect(page.getByTestId("Readonly:false")).toBeVisible()
    await expect(page.getByTestId("Readonly:false").getByRole('button')).toBeVisible()
    await expect(page.getByTestId("Readonly:false")).not.toBeDisabled()
    // Click:default
    const handleRet = page.waitForFunction('handleRemove')
    testDefault.click()
    await handleRet
    // Click:disabled
    
    // Click:readonly
    // Key Down:default
    await expect(testDefault)
    // Key Down:disabled
    // Key Down:readonly
    


});