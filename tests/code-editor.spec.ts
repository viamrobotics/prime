import { test, expect } from '@playwright/test';

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

test('Renders a golang editor that is valid', async ({page}) => {
    await page.goto('/code-editor-test.html');
    const editor = page.getByTestId('code-editor-golang-valid')
    await expect(editor).toHaveCount(1)
    await expect(editor).toHaveAttribute('language', 'go')
    await expect(editor).toHaveAttribute('value', "func (s *Custom) help(x int)")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveCount(1)
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'go')
})

test('Renders a golang editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-golang-invalid')
    await expect(editor).toHaveCount(1)
    await expect(editor).toHaveAttribute('language', 'go')
    await expect(editor).toHaveAttribute('value', "def help(x int)")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveCount(1)
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'go')
})

test('Renders a shell editor that is valid', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-shell-valid')
    await expect(editor).toHaveCount(1)
    await expect(editor).toHaveAttribute('language', 'shell')
    await expect(editor).toHaveAttribute('value', "echo test")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveCount(1)
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'shell')
})

test('Renders a shell editor that is invalid', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-shell-invalid')
    await expect(editor).toHaveCount(1)
    await expect(editor).toHaveAttribute('language', 'shell')
    await expect(editor).toHaveAttribute('value', "help me!!")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveCount(1)
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'shell')
})

test('Renders the default vs-code theme if none is provided', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-json-valid')
    await expect(editor).toHaveCount(1)
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveCount(1)
    await expect(monacoEditor).toHaveClass(/vs/)
})

test('Renders the vs theme if set on the vs-code-editor element', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-vs')
    await expect(editor).toHaveCount(1)
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveCount(1)
    await expect(monacoEditor).toHaveClass(/vs/)
})

test('Renders the vs-dark theme if set on the vs-code-editor element', async ({page}) => {
    // TODO: Fix the issue if there are many editors in a row then it makes all of them vs dark
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-vs-dark')
    await expect(editor).toHaveCount(1)
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveCount(1)
    await expect(monacoEditor).toHaveClass(/vs-dark/)
})

test('If a readonly attribute is not set, the editor should be editable', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const validJSONEditor = page.getByTestId('code-editor-json-valid')
    const originalString = '{"component": "JSON"}'

    await expect(validJSONEditor).toHaveCount(1)

    const textarea = validJSONEditor.locator('textarea')
    await expect(textarea).toHaveCount(1)

    // clears the input -- this was the only way to do it without hanging
    for (let i = 0; i < originalString.length; i++) {
        await textarea.clear()
    }
    await textarea.fill('{"remote": "test"}')
    await expect(validJSONEditor.locator('.message', {hasText: 'Cannot edit in read-only editor'})).toHaveCount(0)

    expect(await textarea.inputValue()).toEqual('{"remote": "test"}')
    // check that the value in the div has the new string
    await expect(validJSONEditor).toContainText('{"remote": "test"}')
    await expect(validJSONEditor).not.toContainText(originalString)
})

test('If a readonly attribute is set, then the editor should be not editable', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-readonly')
    await expect(editor).toHaveCount(1)
    // get the textarea input
    const textarea = editor.locator('textarea')
    await expect(textarea).toHaveCount(1)

    await textarea.type('hello')
    await expect(editor.locator('.message', {hasText: 'Cannot edit in read-only editor'})).toHaveCount(1)

    // expect the text on the editor to not actually change
    await textarea.fill('hello')
    await expect(editor).not.toContainText(/hello/)

})

test('Render a minimap if the minimap attribute is set to true', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-minimap')
    await expect(editor).toHaveCount(1)
    const width = parseInt(await editor.locator('.minimap-decorations-layer').getAttribute('width') ?? '0')
    expect(width).toBeGreaterThan(0)
})

test('If a minimap attribute is not set, the it should not render one', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-json-valid')
    await expect(editor).toHaveCount(1)
    const width = parseInt(await editor.locator('.minimap-decorations-layer').getAttribute('width') ?? '0')
    expect(width).toEqual(0)
})

test('Render a diff code editor if there is a previous attribute and variant diff', async ({page}) => {
    await page.goto('/code-editor-test.html')
    const editor = page.getByTestId('code-editor-diff')
    await expect(editor).toHaveCount(1)
    const diffEditor = editor.locator('.monaco-diff-editor')
    await expect(diffEditor).toHaveClass(/side-by-side/)
    await expect(diffEditor).toHaveCount(1)

    // default renders in JSON
    await expect(editor.locator('.editor.original')).toHaveAttribute('data-mode-id', 'json')
    await expect(editor.locator('.editor.modified')).toHaveAttribute('data-mode-id', 'json')

    // modified should have the "current state" -- the difference is an extra row so just check for that
    await expect(editor.locator('.editor.modified')).toContainText('test5')
    await expect(editor.locator('.editor.original')).not.toContainText('test5')

})