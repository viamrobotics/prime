import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/code-snippet-test.html');
});

test('Renders JSON code snippet correctly', async ({ page }) => {
  const validJSONEditor = page.getByTestId('code-snippet-render');
  await expect(validJSONEditor).toHaveAttribute('language', 'json');
  await expect(validJSONEditor).toHaveAttribute(
    'value',
    '{"component": "JSON"}'
  );
});

test('Renders the default vs-code theme if none is provided', async ({
  page,
}) => {
  const snippet = page.getByTestId('code-snippet-dafault');
  await expect(snippet).toHaveClass(/vs/);
});
