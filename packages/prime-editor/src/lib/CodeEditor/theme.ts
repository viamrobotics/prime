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

// A changed word is its line's tint with a share of the bright color mixed in, so it reads as
// the same hue, stronger.
const changedWordFill = (kind: 'success' | 'danger') =>
	`color-mix(in srgb, var(--color-${kind}-bright) 14%, var(--color-${kind}-light))`;

const DIFF_SIGN_WIDTH = '2ch';
const DIFF_LINE_INDENT = `calc(var(--spacing) * 2 + ${DIFF_SIGN_WIDTH})`;

const surfaceTheme = EditorView.theme({
	'&': {
		color: 'var(--color-default)',
		backgroundColor: 'var(--color-gray-1)',
		fontFamily: 'var(--font-roboto-mono)',
		fontSize: 'var(--text-xs)',
		lineHeight: 'var(--text-xs--line-height)',
		border: '1px solid var(--color-gray-3)',
		borderRadius: 'var(--radius-sm)',
		// The gutter and the scroller are square, so they are clipped to the rounded corners.
		overflow: 'hidden'
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

	'&.cm-merge-b .cm-changedLine, .cm-inlineChangedLine': {
		backgroundColor: 'var(--color-success-light)'
	},
	'&.cm-merge-a .cm-changedLine, .cm-deletedChunk': {
		backgroundColor: 'var(--color-danger-light)'
	},
	// Naming `.cm-content` matches the specificity of the merge view's own underline gradient.
	'&.cm-merge-b .cm-content .cm-changedText': {
		background: changedWordFill('success')
	},
	[[
		'&.cm-merge-a .cm-content .cm-changedText',
		'.cm-content .cm-deletedChunk .cm-deletedText',
		'&.cm-merge-b .cm-deletedText'
	].join(', ')]: { background: changedWordFill('danger') },

	// Every line of a diff leaves room for the sign, so changed and unchanged code stay aligned.
	'&.cm-merge-a .cm-line, &.cm-merge-b .cm-line, .cm-deletedChunk': {
		paddingLeft: DIFF_LINE_INDENT
	},
	[[
		'&.cm-merge-a .cm-changedLine::before',
		'&.cm-merge-b .cm-changedLine::before',
		'.cm-deletedChunk .cm-deletedLine::before'
	].join(', ')]: {
		display: 'inline-block',
		width: DIFF_SIGN_WIDTH,
		marginLeft: `calc(${DIFF_SIGN_WIDTH} * -1)`
	},
	'&.cm-merge-b .cm-changedLine::before': {
		content: '"+"',
		color: 'var(--color-success-dark)'
	},
	'&.cm-merge-a .cm-changedLine::before, .cm-deletedChunk .cm-deletedLine::before': {
		content: '"-"',
		color: 'var(--color-danger-dark)'
	},

	'.cm-mergeView': { border: 'none' },
	'.cm-content .cm-collapsedLines': {
		color: 'var(--color-subtle-1)',
		background: 'var(--color-gray-2)',
		padding: 'var(--spacing) calc(var(--spacing) * 2)'
	},
	'.cm-collapsedLines:before, .cm-collapsedLines:after': { content: 'none' }
});

/**
 * The editor's look and its syntax highlighting. Every color reads a `--color-code-*` or surface
 * token, so the editor matches `CodeSnippet` and follows dark mode.
 */
export const codeEditorTheme: Extension = [surfaceTheme, syntaxHighlighting(highlightStyle)];
