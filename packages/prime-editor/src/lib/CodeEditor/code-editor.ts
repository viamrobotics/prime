/** A grammar `CodeEditor` highlights and indents the document with. */
export type CodeEditorLanguage = 'go' | 'javascript' | 'json' | 'python' | 'sql' | 'typescript';

/**
 * The diff view's layout. `unified` interleaves the deleted and inserted lines in one editor,
 * `split` puts `original` beside `value`.
 */
export type CodeEditorDiff = 'unified' | 'split';
