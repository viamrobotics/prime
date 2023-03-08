import { test, expect } from '@playwright/test';

// Value: JSON

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "json" has been applied to the v-code-editor-element
// WHEN the element is rendered
// THEN the code editor should render the "value" attribute value in the code-editor with JSON language syntax highlighting

test('Renders JSON code editor correctly', async ({ page }) => {
  await page.goto('/code-editor-test.html');
  const validJSONEditor = page.getByTestId('code-editor-json-valid')
  await expect(validJSONEditor).toHaveCount(1)
  await expect(validJSONEditor).toHaveAttribute('language', 'json')
  await expect(validJSONEditor).toHaveAttribute('value', '{"component": "JSON"}')
  const monacoContainer = validJSONEditor.locator('div').first()
  await expect(monacoContainer).toHaveCount(1);
  await expect(monacoContainer).toHaveAttribute('data-mode-id', 'json')

  // TODO: Add language syntax -- should we be checking that the keys and the values are in the 

});

// Value: JSON invalid

test('Renders JSON code editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const validJSONEditor = page.getByTestId('code-editor-json-invalid')
    await expect(validJSONEditor).toHaveCount(1)
    await expect(validJSONEditor).toHaveAttribute('language', 'json')
    await expect(validJSONEditor).toHaveAttribute('value', '{"component"}')
    const monacoContainer = validJSONEditor.locator('div').first()
    await expect(monacoContainer).toHaveCount(1);
    await expect(monacoContainer).toHaveAttribute('data-mode-id', 'json')
});

// valid javascript

test('Renders Javascript code editor that is valid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const validJavascriptEditor = page.getByTestId('code-editor-javascript-valid')
    await expect(validJavascriptEditor).toHaveCount(1)
    await expect(validJavascriptEditor).toHaveAttribute('language', 'javascript')
    await expect(validJavascriptEditor).toHaveAttribute('value', "function getComponents(){" + "\n\n" + "}")
    const validJSONContainer = validJavascriptEditor.locator('div').first()
    await expect(validJSONContainer).toHaveCount(1); 
    await expect(validJSONContainer).toHaveAttribute('data-mode-id', 'javascript')
})

// invalid javascript

test('Renders Javascript code editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const invalidJavascriptEditor = page.getByTestId('code-editor-javascript-invalid')
    await expect(invalidJavascriptEditor).toHaveCount(1)
    await expect(invalidJavascriptEditor).toHaveAttribute('language', 'javascript')
    await expect(invalidJavascriptEditor).toHaveAttribute('value', "def madeIt()")
    const invalidEditor = invalidJavascriptEditor.locator('div').first()
    await expect(invalidEditor).toHaveCount(1)
    await expect(invalidEditor).toHaveAttribute('data-mode-id', 'javascript')
})

// valid typescript

test('Renders typescript code editor that is valid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const validTypescriptEditor = page.getByTestId('code-editor-typescript-valid')
    await expect(validTypescriptEditor).toHaveCount(1)
    await expect(validTypescriptEditor).toHaveAttribute('language', 'typescript')
    await expect(validTypescriptEditor).toHaveAttribute('value', "function get(value: string) {" + "\n\n" + "}")
    const validEditor = validTypescriptEditor.locator('div').first()
    await expect(validEditor).toHaveCount(1)
    await expect(validEditor).toHaveAttribute('data-mode-id', 'typescript')
})

// invalid typescript
test('Renders typescript code editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const invalidTypescriptEditor = page.getByTestId('code-editor-typescript-invalid')
    await expect(invalidTypescriptEditor).toHaveCount(1)
    await expect(invalidTypescriptEditor).toHaveAttribute('language', 'typescript')
    await expect(invalidTypescriptEditor).toHaveAttribute('value', "def help()")
    const invalidEditor = invalidTypescriptEditor.locator('div').first()
    await expect(invalidEditor).toHaveCount(1)
    await expect(invalidEditor).toHaveAttribute('data-mode-id','typescript')
})

// valid python 
test('Renders python editor that is valid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const validPythonEditor = page.getByTestId('code-editor-python-valid')
    await expect(validPythonEditor).toHaveCount(1)
    await expect(validPythonEditor).toHaveAttribute('language', 'python')
    await expect(validPythonEditor).toHaveAttribute('value', "def help()")
    const validEditor = validPythonEditor.locator('div').first()
    await expect(validEditor).toHaveCount(1)
    await expect(validEditor).toHaveAttribute('data-mode-id', 'python')
})

// invalid python 
test('Renders python editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const invalidPythonEditor = page.getByTestId('code-editor-python-invalid')
    await expect(invalidPythonEditor).toHaveCount(1)
    await expect(invalidPythonEditor).toHaveAttribute('language', 'python')
    await expect(invalidPythonEditor).toHaveAttribute('value', "const x = () => {}")
    const invalidEditor = invalidPythonEditor.locator('div').first()
    await expect(invalidEditor).toHaveCount(1)
    await expect(invalidEditor).toHaveAttribute('data-mode-id', 'python')
})

// Value: JavaScript invalid

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "javascript" has been applied to the v-code-editor-elementAND the "value" attribute is invalid JavaScriptWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with JavaScript language syntax highlightingAND the invalid portion of the "value" attribute value should be highlighted as an error

// Value: TypeScript

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "typescript" has been applied to the v-code-editor-elementWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with TypeScript language syntax highlighting

// Value: TypeScript invalid

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "typescript" has been applied to the v-code-editor-elementAND the "value" attribute is invalid TypeScriptWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with TypeScript language syntax highlightingAND the invalid portion of the "value" attribute value should be highlighted as an error

// Value: Python

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "python" has been applied to the v-code-editor-elementWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Python language syntax highlighting

// Value: Python invalid

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "python" has been applied to the v-code-editor-elementAND the "value" attribute is invalid PythonWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Python language syntax highlightingAND the invalid portion of the "value" attribute value should be highlighted as an error

// Value: Go

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "go" has been applied to the v-code-editor-elementWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Go language syntax highlighting

// Value: Go invalid

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "go" has been applied to the v-code-editor-elementAND the "value" attribute is invalid GoWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Go language syntax highlightingAND the invalid portion of the "value" attribute value should be highlighted as an error

// Value: Shell

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "shell" has been applied to the v-code-editor-elementWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Shell language syntax highlighting

// Value: Shell invalid

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "shell" has been applied to the v-code-editor-elementAND the "value" attribute is invalid ShellWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with Shell language syntax highlightingAND the invalid portion of the "value" attribute value should be highlighted as an error

// Value: invalid language

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute has been applied to the v-code-editor-element with an invalid language typeWHEN the element is renderedTHEN the code editor should render the "value" attribute value in the code-editor with no language syntax highlighting

// Theme: default

// GIVEN no "theme" attribute has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render with the default "vs" theme

// Theme: vs

// GIVEN a "theme" attribute of "vs" has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render with the "vs" theme

// Theme: vs-dark

// GIVEN a "theme" attribute of "vs-dark" has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render with the "vs-dark" theme

// Readonly

// GIVEN a "readonly" attribute of "true" has been applied to the v-code-editor elementWHEN the element is renderedTHEN the editor value should not be editableAND a info tooltip should render when attempting to edit the value

// Mini Map

// GIVEN a "minimap" attribute of "true" has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render a "mini map" of the value on the right side of the editor

// Schema

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "language" attribute of "json" has been applied to the v-code-editor-elementAND a "schema" attribute has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should use the custom schema for validation

// Variant: default

// GIVEN no "variant" attribute has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render as a standard editor

// Variant: diff

// GIVEN a "value" attribute has been applied to the v-code-editor elementAND a "variant" attribute of "diff" has been applied to the v-code-editor elementAND a "previous" attribute has been applied to the v-code-editor elementWHEN the element is renderedTHEN the code editor should render as a diff editorAND differences between the "value" and "previous" values should be highlighted