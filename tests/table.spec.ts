import { test, expect } from '@playwright/test';
import { delay, hexToRGB } from './lib/helper.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/table-test.html');
});

test('Renders headers with appropriate styling', async ({ page }) => {
  const tableAuto = page.getByTestId('table-auto')
  await expect(tableAuto).toBeVisible()
  await expect(tableAuto.locator('v-th').getByRole('checkbox')).toBeVisible()
  await expect(tableAuto.getByText('Name', { exact: true })).toBeVisible()
  await expect(tableAuto.getByText('Address')).toBeVisible()
  await expect(tableAuto.getByText('Overlylongunbrokenheader')).toBeVisible()
  await expect(tableAuto.getByText('Phone')).toBeVisible()

  const ths = await tableAuto.locator('th').all()
  for (let i = 0; i < ths.length; i++) {
    await expect(ths[i]).toHaveCSS('color', 'rgb(82, 82, 82)')
  }
  await expect(await tableAuto.locator('thead')).toHaveCSS('border-color', hexToRGB('black'))
});

test('Renders success row with appropriate styling', async ({ page }) => {
  const successRow = page.getByTestId('table-row-success')
  await expect(successRow).toBeVisible()
  await expect(successRow.getByText('Ms. Success')).toBeVisible()
  await expect(successRow.getByText('Antarctica')).toBeVisible()
  await expect(successRow.getByText('short2')).toBeVisible()
  await expect(successRow.getByText('333-333-3333')).toBeVisible()

  await expect(await successRow.locator('tr')).toHaveCSS('background-color', 'rgb(236, 253, 245)')
  await expect(await successRow.locator('tr')).toHaveCSS('border-color', 'rgb(209, 250, 229)')
  const tds = await successRow.locator('td').all()
  for (let i = 0; i < tds.length; i++) {
    await expect(tds[i]).toHaveCSS('color', 'rgb(4, 120, 87)')
  }
});

test('Renders disabled row with appropriate styling', async ({ page }) => {
  const disabledRow = page.getByTestId('table-row-disabled')
  await expect(disabledRow).toBeVisible()
  await expect(disabledRow.getByText('Mr. Disabled')).toBeVisible()
  await expect(disabledRow.getByText('1 Don\'t Touch Me')).toBeVisible()
  await expect(disabledRow.getByText('short3')).toBeVisible()
  await expect(disabledRow.getByText('444-444-4444')).toBeVisible()

  await expect(await disabledRow.locator('tr')).toHaveCSS('background-color', 'rgb(249, 250, 251)')
  await expect(await disabledRow.locator('tr')).toHaveCSS('border-color', 'rgb(229, 231, 235)')
  const tds = await disabledRow.locator('td').all()
  for (let i = 0; i < tds.length; i++) {
    await expect(tds[i]).toHaveCSS('color', 'rgb(107, 114, 128)')
  }
});

test('Renders error row with appropriate styling', async ({ page }) => {
  const errorRow = page.getByTestId('table-row-error')
  await expect(errorRow).toBeVisible()
  await expect(errorRow.getByText('Error')).toBeVisible()
  await expect(errorRow.getByText('Mars')).toBeVisible()
  await expect(errorRow.getByText('short4')).toBeVisible()
  await expect(errorRow.getByText('555-555-5555')).toBeVisible()

  await expect(await errorRow.locator('tr')).toHaveCSS('background-color', 'rgb(254, 242, 242)')
  await expect(await errorRow.locator('tr')).toHaveCSS('border-color', 'rgb(254, 226, 226)')
  const tds = await errorRow.locator('td').all()
  for (let i = 0; i < tds.length; i++) {
    await expect(tds[i]).toHaveCSS('color', 'rgb(239, 68, 68)')
  }
});

test('Renders auto row with appropriate styling', async ({ page }) => {
  const autoRow = page.getByTestId('table-row-auto')
  await expect(autoRow).toBeVisible()
  await expect(autoRow.getByText('Average Joe')).toBeVisible()
  await expect(autoRow.getByText('123 Sesame Street')).toBeVisible()
  await expect(autoRow.getByText('short1')).toBeVisible()
  await expect(autoRow.getByText('222-222-2222')).toBeVisible()

  // no background color
  await expect(await autoRow.locator('tr')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(await autoRow.locator('tr')).toHaveCSS('border-color', 'rgb(229, 231, 235)')
  const tds = await autoRow.locator('td').all()
  for (let i = 0; i < tds.length; i++) {
    await expect(tds[i]).toHaveCSS('color', 'rgb(0, 0, 0)')
  }
});

test('Uses fixed table layout when v-table attribute variant has value fixed', async ({ page }) => {
  const fixedTable = await page.getByTestId('table-fixed')
  await expect(fixedTable).toBeVisible()
  await expect(await fixedTable.locator('table').first()).toHaveCSS('table-layout', 'fixed')
});

test('Displays columns with widths set by cols attribute', async ({ page }) => {
  const widths = [5, 15, 20, 25, 35]

  const autoTable = await page.getByTestId('table-auto')
  await expect(autoTable.locator('table')).toBeVisible()
  const autoCols = await (await autoTable.locator('table')).first().locator('col').all()
  await expect(autoCols.length).toBe(widths.length)

  const autoTableBox = await autoTable.locator('table').first().boundingBox()
  // assess column width with th because col is not visible on all browsers
  const autoThs = await autoTable.locator('th').all()
  for (let i = 0; i < autoCols.length; i++) {
    let width = await autoThs[i].evaluate((e) => { return getComputedStyle(e).width })
    await expect(Number(width.substring(0, width.indexOf('px'))))
            .toBeCloseTo(widths[i] * autoTableBox.width / 100, 1)
  }

  const fixedTable = await page.getByTestId('table-fixed')
  await expect(fixedTable.locator('table')).toBeVisible()
  const fixedCols = await (await fixedTable.locator('table')).first().locator('col').all()
  await expect(fixedCols.length).toBe(widths.length)

  const fixedTableBox = await fixedTable.locator('table').first().boundingBox()
  // assess column width with th because col is not visible on all browsers
  const fixedThs = await fixedTable.locator('th').all()
  for (let i = 0; i < fixedCols.length; i++) {
    let width = await fixedThs[i].evaluate((e) => { return getComputedStyle(e).width })
    await expect(Number(width.substring(0, width.indexOf('px'))))
            .toBeCloseTo(widths[i] * fixedTableBox.width / 100, 1)
  }
});
