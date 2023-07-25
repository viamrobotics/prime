import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/playground/tooltip-test.html');
});

// TO DO: Fix this tooltip hover test
test.skip('Confirms tooltip text is visible upon hover', async ({ page }) => {
  const tooltip = page.getByRole('tooltip', { name: 'This is the hover test' });
  await expect(tooltip).not.toBeVisible();
  const wordToHover = page.getByText('Hover Test');
  await wordToHover.hover();
  await expect(tooltip).toBeVisible();
});

test('Confirms tooltip text is above text to hover if location attribute is specified as "top"', async ({
  page,
}) => {
  const text = page.locator('p:near(:text("This is the top test"))');
  const tooltip = page.getByRole('tooltip', { name: 'This is the top test' });
  const wordToHover = page.getByText('Top Test').first();

  const textLocation = await text.evaluate((element) =>
    element.getBoundingClientRect()
  );
  await wordToHover.hover();
  const tooltipLocation = await tooltip.evaluate((element) =>
    element.getBoundingClientRect()
  );

  expect(tooltipLocation.y).toBeLessThan(textLocation.y);
});

test('Confirms tooltip text is below text to hover if location attribute is specified as "bottom"', async ({
  page,
}) => {
  const text = page.locator('p:near(:text("This is the bottom test"))');
  const tooltip = page.getByRole('tooltip', {
    name: 'This is the bottom test',
  });
  const wordToHover = page.getByText('Bottom Test').first();

  const textLocation = await text.evaluate((element) =>
    element.getBoundingClientRect()
  );
  await wordToHover.hover();
  const tooltipLocation = await tooltip.evaluate((element) =>
    element.getBoundingClientRect()
  );

  expect(tooltipLocation.y).toBeGreaterThan(textLocation.y);
});

test('Confirms tooltip text is right of text to hover if location attribute is specified as "right"', async ({
  page,
}) => {
  const text = page.locator('p:near(:text("This is the right test"))');
  const tooltip = page.getByRole('tooltip', { name: 'This is the right test' });
  const wordToHover = page.getByText('Right Test').first();

  const textLocation = await text.evaluate((element) =>
    element.getBoundingClientRect()
  );
  await wordToHover.hover();
  const tooltipLocation = await tooltip.evaluate((element) =>
    element.getBoundingClientRect()
  );

  expect(tooltipLocation.x).toBeGreaterThan(textLocation.x);
});

test('Confirms tooltip text is left of text to hover if location attribute is specified as "left"', async ({
  page,
}) => {
  const text = page.locator('p:near(:text("This is the left test"))');
  const tooltip = page.getByRole('tooltip', { name: 'This is the left test' });
  const wordToHover = page.getByText('Left Test').first();

  const textLocation = await text.evaluate((element) =>
    element.getBoundingClientRect()
  );
  await wordToHover.hover();
  const tooltipLocation = await tooltip.evaluate((element) =>
    element.getBoundingClientRect()
  );

  expect(tooltipLocation.x).toBeLessThan(textLocation.x);
});

test('Confirms tooltip text is above text to hover if no location attribute is specified', async ({
  page,
}) => {
  const text = page.locator('p:near(:text("This text should display above"))');
  const tooltip = page.getByRole('tooltip', {
    name: 'This text should display above',
  });
  const wordToHover = page.getByText('Def Test').first();

  const textLocation = await text.evaluate((element) =>
    element.getBoundingClientRect()
  );
  await wordToHover.hover();
  const tooltipLocation = await tooltip.evaluate((element) =>
    element.getBoundingClientRect()
  );

  expect(tooltipLocation.y).toBeLessThan(textLocation.y);
});
