import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { tags } from '@lezer/highlight';

const highlightStyle = HighlightStyle.define([
	{
		tag: [tags.comment, tags.lineComment, tags.blockComment, tags.docComment, tags.meta],
		color: 'var(--color-code-comment)'
	},
	{
		tag: [tags.keyword, tags.modifier, tags.operatorKeyword, tags.controlKeyword],
		color: 'var(--color-code-keyword)'
	},
	{
		tag: [tags.typeName, tags.className, tags.namespace, tags.standard(tags.name)],
		color: 'var(--color-code-type)'
	},
	{
		tag: [
			tags.function(tags.variableName),
			tags.function(tags.propertyName),
			tags.macroName,
			tags.annotation
		],
		color: 'var(--color-code-function)'
	},
	{
		tag: [tags.string, tags.special(tags.string), tags.regexp, tags.url, tags.character],
		color: 'var(--color-code-string)'
	},
	{
		tag: [tags.number, tags.integer, tags.float, tags.constant(tags.name)],
		color: 'var(--color-code-number)'
	},
	{ tag: tags.bool, color: 'var(--color-code-boolean)' },
	{ tag: tags.null, color: 'var(--color-code-null)' },
	{
		tag: [tags.propertyName, tags.attributeName, tags.tagName, tags.definition(tags.propertyName)],
		color: 'var(--color-code-property-keys)'
	}
]);

const surfaceTheme = EditorView.theme({
	'&': {
		color: 'var(--color-default)',
		backgroundColor: 'var(--color-gray-1)',
		fontFamily: 'var(--font-roboto-mono)',
		fontSize: 'var(--text-xs)',
		lineHeight: 'var(--text-xs--line-height)',
		border: '1px solid var(--color-gray-3)',
		borderRadius: 'var(--radius-sm)'
	},
	'&:has(.cm-content[aria-invalid="true"])': { borderColor: 'var(--color-danger-dark)' },
	'&:has(.cm-content[aria-disabled="true"])': {
		color: 'var(--color-disabled-dark)',
		backgroundColor: 'var(--color-disabled-light)',
		borderColor: 'transparent',
		cursor: 'not-allowed'
	},
	'.cm-content[aria-disabled="true"]': { userSelect: 'none' },
	'.cm-placeholder': { color: 'var(--color-subtle-2)' },
	'&.cm-focused': {
		outline: '2px solid var(--color-link)',
		outlineOffset: '2px'
	},
	'.cm-scroller': { fontFamily: 'inherit' },
	'.cm-content': {
		caretColor: 'var(--color-default)',
		padding: 'calc(var(--spacing) * 2) 0'
	},
	'.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--color-default)' },
	'.cm-line': { padding: '0 calc(var(--spacing) * 2)' },
	'.cm-gutters': {
		color: 'var(--color-code-line-number)',
		backgroundColor: 'var(--color-gray-1)',
		border: 'none'
	},
	'.cm-activeLine': { backgroundColor: 'var(--color-gray-2)' },
	'.cm-activeLineGutter': {
		backgroundColor: 'var(--color-gray-2)',
		color: 'var(--color-default)'
	},
	'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection':
		{ backgroundColor: 'var(--color-info-medium)' },
	'.cm-selectionMatch': { backgroundColor: 'var(--color-info-light)' },
	'.cm-foldGutter .cm-gutterElement': { cursor: 'pointer' },
	'.cm-foldPlaceholder': {
		color: 'var(--color-subtle-1)',
		backgroundColor: 'var(--color-gray-2)',
		border: 'none'
	},

	'.cm-panels': {
		color: 'var(--color-default)',
		backgroundColor: 'var(--color-gray-1)'
	},
	'.cm-panels.cm-panels-top': { borderBottom: '1px solid var(--color-gray-3)' },
	'.cm-panels.cm-panels-bottom': { borderTop: '1px solid var(--color-gray-3)' },
	'.cm-textfield': {
		color: 'var(--color-default)',
		backgroundColor: 'var(--color-white)',
		border: '1px solid var(--color-gray-3)',
		borderRadius: 'var(--radius-sm)',
		fontSize: 'inherit'
	},
	'.cm-button': {
		color: 'var(--color-default)',
		backgroundColor: 'var(--color-white)',
		backgroundImage: 'none',
		border: '1px solid var(--color-gray-3)',
		borderRadius: 'var(--radius-sm)',
		fontSize: 'inherit'
	},
	'.cm-textfield:focus-visible, .cm-button:focus-visible, .cm-panel button[name="close"]:focus-visible':
		{ outline: '2px solid var(--color-link)', outlineOffset: '2px' },
	'.cm-panel button[name="close"]': { color: 'var(--color-default)', cursor: 'pointer' },
	'.cm-searchMatch': { backgroundColor: 'var(--color-warning-light)' },
	'.cm-searchMatch.cm-searchMatch-selected': {
		backgroundColor: 'var(--color-warning-medium)',
		outline: '1px solid var(--color-warning-bright)'
	},

	'.cm-insertedLine, .cm-inlineChangedLine, &.cm-merge-b .cm-changedLine': {
		backgroundColor: 'var(--color-success-light)'
	},
	'.cm-deletedLine, .cm-deletedChunk, &.cm-merge-a .cm-changedLine': {
		backgroundColor: 'var(--color-danger-light)'
	},
	'.cm-deletedLine': { textDecoration: 'line-through' },
	'&.cm-merge-b .cm-changedText': {
		background: 'var(--color-success-medium)',
		textDecoration: 'underline'
	},
	'&.cm-merge-a .cm-changedText, .cm-deletedText': {
		background: 'var(--color-danger-medium)',
		textDecoration: 'line-through'
	},
	'&.cm-merge-b .cm-changedLineGutter': { background: 'var(--color-success-dark)' },
	'&.cm-merge-a .cm-changedLineGutter, .cm-deletedLineGutter': {
		background: 'var(--color-danger-dark)'
	},
	'.cm-inlineChangedLineGutter': { background: 'var(--color-success-dark)' },
	'.cm-deletedChunk': { paddingLeft: 'calc(var(--spacing) * 2)' },
	'.cm-mergeView': { border: 'none' },
	'.cm-collapsedLines': {
		color: 'var(--color-subtle-1)',
		backgroundColor: 'var(--color-gray-2)'
	}
});

/**
 * The editor's look and its syntax highlighting. Every color reads a `--color-code-*` or surface
 * token, so the editor matches `CodeSnippet` and follows dark mode.
 */
export const codeEditorTheme: Extension = [surfaceTheme, syntaxHighlighting(highlightStyle)];
