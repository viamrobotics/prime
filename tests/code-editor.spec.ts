import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/code-editor-test.html')
})

test('Renders JSON code editor correctly', async ({ page }) => {
  const validJSONEditor = page.getByTestId('code-editor-json-valid')
  await expect(validJSONEditor).toHaveAttribute('language', 'json')
  await expect(validJSONEditor).toHaveAttribute('value', '{"component": "JSON"}')
  const monacoContainer = validJSONEditor.locator('div').first()
  await expect(monacoContainer).toHaveAttribute('data-mode-id', 'json')
  const componentSpan = monacoContainer.getByText('component') // refers to key
  await expect(componentSpan).toHaveClass(/mtk4/)
  const jsonSPAN = monacoContainer.getByText('JSON')
  await expect(jsonSPAN).toHaveClass(/mtk5/)
});

// Value: JSON invalid

test('Renders JSON code editor that is invalid', async ({page}) => {
    const validJSONEditor = page.getByTestId('code-editor-json-invalid')
    await expect(validJSONEditor).toHaveAttribute('language', 'json')
    await expect(validJSONEditor).toHaveAttribute('value', '{"component"}')
    const monacoContainer = validJSONEditor.locator('div').first()
    await expect(monacoContainer).toHaveAttribute('data-mode-id', 'json')
});

// valid javascript

test('Renders Javascript code editor that is valid', async ({page}) => {
    const validJavascriptEditor = page.getByTestId('code-editor-javascript-valid')
    await expect(validJavascriptEditor).toHaveAttribute('language', 'javascript')
    await expect(validJavascriptEditor).toHaveAttribute('value', "function getComponents(){" + "\n\n" + "}")
    const validJSONContainer = validJavascriptEditor.locator('div').first()
    await expect(validJSONContainer).toHaveAttribute('data-mode-id', 'javascript')
    await expect(validJSONContainer.getByText('function')).toHaveClass(/mtk8/) // valid
})

// invalid javascript

test('Renders Javascript code editor that is invalid', async ({page}) => {
    const invalidJavascriptEditor = page.getByTestId('code-editor-javascript-invalid')
    await expect(invalidJavascriptEditor).toHaveAttribute('language', 'javascript')
    await expect(invalidJavascriptEditor).toHaveAttribute('value', "def madeIt()")
    const invalidEditor = invalidJavascriptEditor.locator('div').first()
    await expect(invalidEditor).toHaveAttribute('data-mode-id', 'javascript')
})

// valid typescript

test('Renders typescript code editor that is valid', async ({page}) => {
    const validTypescriptEditor = page.getByTestId('code-editor-typescript-valid')
    await expect(validTypescriptEditor).toHaveAttribute('language', 'typescript')
    await expect(validTypescriptEditor).toHaveAttribute('value', "function get(value: string) {" + "\n\n" + "}")
    const validEditor = validTypescriptEditor.locator('div').first()
    await expect(validEditor).toHaveAttribute('data-mode-id', 'typescript')
    await expect(validTypescriptEditor.getByText('function')).toHaveClass(/mtk8/) // valid
})

// invalid typescript
test('Renders typescript code editor that is invalid', async ({page}) => {
    const invalidTypescriptEditor = page.getByTestId('code-editor-typescript-invalid')
    await expect(invalidTypescriptEditor).toHaveAttribute('language', 'typescript')
    await expect(invalidTypescriptEditor).toHaveAttribute('value', "def help()")
    const invalidEditor = invalidTypescriptEditor.locator('div').first()
    await expect(invalidEditor).toHaveAttribute('data-mode-id','typescript')
    await expect(invalidEditor.getByText('def help')).toHaveClass(/mtk1/)
})

// valid python 
test('Renders python editor that is valid', async ({page}) => {
    const validPythonEditor = page.getByTestId('code-editor-python-valid')
    await expect(validPythonEditor).toHaveAttribute('language', 'python')
    await expect(validPythonEditor).toHaveAttribute('value', "def help()")
    const validEditor = validPythonEditor.locator('div').first()
    await expect(validEditor).toHaveAttribute('data-mode-id', 'python')
    await expect(validEditor.getByText('def')).toHaveClass(/mtk8/) // valid python syntax
    await expect(validEditor.getByText('help')).toHaveClass(/mtk8/)
})

// invalid python 
test('Renders python editor that is invalid', async ({page}) => {
    const invalidPythonEditor = page.getByTestId('code-editor-python-invalid')
    await expect(invalidPythonEditor).toHaveAttribute('language', 'python')
    await expect(invalidPythonEditor).toHaveAttribute('value', "const x = () => {}")
    const invalidEditor = invalidPythonEditor.locator('div').first()
    await expect(invalidEditor).toHaveAttribute('data-mode-id', 'python')
})

test('Renders a golang editor that is valid', async ({page}) => {
    const editor = page.getByTestId('code-editor-golang-valid')
    await expect(editor).toHaveAttribute('language', 'go')
    await expect(editor).toHaveAttribute('value', "func (s *Custom) help(x int)")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'go')
    await expect(editorContainer.getByText('func')).toHaveClass(/mtk8/) // valid 
})

test('Renders a golang editor that is invalid', async ({page}) => {
    const editor = page.getByTestId('code-editor-golang-invalid')
    await expect(editor).toHaveAttribute('language', 'go')
    await expect(editor).toHaveAttribute('value', "def help(x int)")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'go')
})

test('Renders a shell editor that is valid', async ({page}) => {
    const editor = page.getByTestId('code-editor-shell-valid')
    await expect(editor).toHaveAttribute('language', 'shell')
    await expect(editor).toHaveAttribute('value', "echo test")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'shell')
    await expect(editorContainer.getByText('echo')).toHaveClass(/mtk22/) // valid for shell
})

test('Renders a shell editor that is invalid', async ({page}) => {
    const editor = page.getByTestId('code-editor-shell-invalid')
    await expect(editor).toHaveAttribute('language', 'shell')
    await expect(editor).toHaveAttribute('value', "help me!!")
    const editorContainer = editor.locator('div').first()
    await expect(editorContainer).toHaveAttribute('data-mode-id', 'shell')
})

test('Renders the default vs-code theme if none is provided', async ({page}) => {
    const editor = page.getByTestId('code-editor-json-valid')
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveClass(/vs/)
})

test('Renders the vs theme if set on the vs-code-editor element', async ({page}) => {
    const editor = page.getByTestId('code-editor-vs')
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveClass(/vs/)
})

test('Renders the vs-dark theme if set on the vs-code-editor element', async ({page}) => {
    const editor = page.getByTestId('code-editor-vs-dark')
    const monacoEditor = editor.locator('.monaco-editor').first()
    await expect(monacoEditor).toHaveClass(/vs-dark/)
})

test('If a readonly attribute is not set, the editor should be editable', async ({page}) => {
    const validJSONEditor = page.getByTestId('code-editor-json-valid')
    const originalString = '{"component": "JSON"}'
    const textarea = validJSONEditor.locator('textarea')

    // clears the input -- this was the only way to do it without hanging
    for (let i = 0; i < originalString.length; i++) {
        await textarea.clear()
    }
    await textarea.fill('{"remote": "test"}')
    await expect(validJSONEditor.locator('.message', {hasText: 'Cannot edit in read-only editor'})).not.toBeVisible()

    expect(await textarea.inputValue()).toEqual('{"remote": "test"}')
    // check that the value in the div has the new string
    await expect(validJSONEditor).toContainText('{"remote": "test"}')
    await expect(validJSONEditor).not.toContainText(originalString)
})

test('If a readonly attribute is set, then the editor should be not editable', async ({page}) => {
    const editor = page.getByTestId('code-editor-readonly')
    // get the textarea input
    const textarea = editor.locator('textarea')

    await textarea.type('hello')
    await expect(editor.locator('.message', {hasText: 'Cannot edit in read-only editor'})).toBeVisible()

    // expect the text on the editor to not actually change
    await textarea.fill('hello')
    await expect(editor).not.toContainText(/hello/)

})

test('Render a minimap if the minimap attribute is set to true', async ({page}) => {
    const editor = page.getByTestId('code-editor-minimap')
    const width = parseInt(await editor.locator('.minimap-decorations-layer').getAttribute('width') ?? '0')
    expect(width).toBeGreaterThan(0)
})

test('If a minimap attribute is not set, the it should not render one', async ({page}) => {
    const editor = page.getByTestId('code-editor-json-valid')
    const width = parseInt(await editor.locator('.minimap-decorations-layer').getAttribute('width') ?? '0')
    expect(width).toEqual(0)
})

test('Render a diff code editor if there is a previous attribute and variant diff', async ({page}) => {
    const editor = page.getByTestId('code-editor-diff')
    const diffEditor = editor.locator('.monaco-diff-editor')
    await expect(diffEditor).toHaveClass(/side-by-side/)
    await expect(diffEditor).toBeVisible()

    // default renders in JSON
    await expect(editor.locator('.editor.original')).toHaveAttribute('data-mode-id', 'json')
    await expect(editor.locator('.editor.modified')).toHaveAttribute('data-mode-id', 'json')

    // modified should have the "current state" -- the difference is an extra row so just check for that
    await expect(editor.locator('.editor.modified')).toContainText('test5')
    await expect(editor.locator('.editor.original')).not.toContainText('test5')

})