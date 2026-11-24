<!--
@component
A code editor built on CodeMirror 6, with syntax highlighting, search, folding, and a diff view.
Bind the document with `bind:value`. Setting `original` compares `value` against it in a diff
view, unified by default or side by side with `diff="split"`. Every editor needs a name, from
`aria-label` or `aria-labelledby`. With `collapseUnchanged`, Ctrl+Shift+] (Cmd+Option+] on macOS)
expands the folded run of unchanged lines next to the cursor.

```svelte
<CodeEditor bind:value={config} language="json" aria-label="Robot config" />
<CodeEditor bind:value={config} original={savedConfig} diff="split" aria-label="Robot config" />
```
-->

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes } from 'svelte/elements';

	import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import {
		bracketMatching,
		codeFolding,
		foldGutter,
		foldKeymap,
		indentOnInput,
		syntaxHighlighting
	} from '@codemirror/language';
	import {
		MergeView,
		getOriginalDoc,
		originalDocChangeEffect,
		unifiedMergeView
	} from '@codemirror/merge';
	import { highlightSelectionMatches, search, searchKeymap } from '@codemirror/search';
	import {
		Annotation,
		ChangeSet,
		Compartment,
		EditorState,
		type Extension,
		type StateEffect
	} from '@codemirror/state';
	import {
		EditorView,
		drawSelection,
		highlightActiveLine,
		highlightActiveLineGutter,
		keymap,
		lineNumbers as lineNumberGutter,
		placeholder as emptyDocPlaceholder,
		type ViewUpdate
	} from '@codemirror/view';
	import { classHighlighter } from '@lezer/highlight';
	import { untrack } from 'svelte';

	import type { CodeEditorDiff, CodeEditorLanguage } from './code-editor.ts';

	import {
		ORIGINAL_SIDE_SUFFIX,
		isAriaAttribute,
		nameContentAttributes,
		originalNameContentAttributes,
		otherAriaContentAttributes
	} from './aria-attributes.ts';
	import { expandUnchanged } from './expand-unchanged.ts';
	import { languageSupport } from './languages.ts';
	import { codeEditorTheme } from './theme.ts';

	type Editability = 'editable' | 'readonly' | 'disabled';

	/**
	 * Every `aria-*` attribute goes to the editing surface, the element with the `textbox` role.
	 * Every other attribute goes to the editor's outer element.
	 */
	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/**
		 * The document. Bind it with `bind:value`, or with a function binding to veto or transform
		 * an edit.
		 */
		value?: string;
		/** The grammar that highlights and indents the document. Omit it for plain text. */
		language?: CodeEditorLanguage;
		/** Blocks edits. The document stays focusable, selectable, and copyable. */
		readonly?: boolean;
		/**
		 * Turns the editor off. The document cannot be edited, focused, or selected, and the
		 * editing surface is marked `aria-disabled`. It wins over `readonly`.
		 */
		disabled?: boolean;
		/** Text shown while the document is empty. */
		placeholder?: string;
		/** Shows the gutter, which holds the line numbers and the fold markers. */
		lineNumbers?: boolean;
		/** Wraps long lines instead of scrolling them horizontally. */
		wrapLines?: boolean;
		/** The text `value` is compared against. Setting it opens the diff view. */
		original?: string;
		/** The diff view's layout while `original` is set. */
		diff?: CodeEditorDiff;
		// `@codemirror/merge`'s option name, kept because no native or standard name exists.
		/**
		 * Folds each long run of unchanged lines in the diff view into one row that expands on
		 * click. Changing it rebuilds the editor.
		 */
		collapseUnchanged?: boolean;
		/** The accessible name of the editing surface. A split diff names the original side `<name>, original`. */
		'aria-label'?: string;
		/**
		 * The ids of the elements that name the editing surface. A split diff adds a hidden
		 * `original` label after them on the original side.
		 */
		'aria-labelledby'?: string;
		/** Marks the document invalid, and paints the error border. */
		'aria-invalid'?: HTMLAttributes<HTMLDivElement>['aria-invalid'];
	}

	type AccessibleName = { 'aria-label': string } | { 'aria-labelledby': string };

	let {
		value = $bindable(),
		language,
		readonly = false,
		disabled = false,
		placeholder,
		lineNumbers = true,
		wrapLines = false,
		original,
		diff = 'unified',
		collapseUnchanged = false,
		...rest
	}: Props & AccessibleName = $props();

	const languageCompartment = new Compartment();
	const editabilityCompartment = new Compartment();
	const originalEditabilityCompartment = new Compartment();
	const placeholderCompartment = new Compartment();
	const lineNumbersCompartment = new Compartment();
	const wrapLinesCompartment = new Compartment();
	const nameCompartment = new Compartment();
	const originalNameCompartment = new Compartment();
	const ariaCompartment = new Compartment();
	const unifiedDiffCompartment = new Compartment();

	// Unchanged lines kept visible around each change, and the shortest run worth folding.
	const COLLAPSED_CONTEXT = { margin: 3, minSize: 4 };

	// Marks a doc change that came from `value` or `original`, so it is never written back to `value`.
	const outsideWrite = Annotation.define<boolean>();

	let editor = $state.raw<EditorView>();
	let originalEditor = $state.raw<EditorView>();
	let unifiedOriginal: string | undefined;

	const originalLabelId = $props.id();

	const isSplit = $derived(original !== undefined && diff === 'split');

	const languageExtension = $derived<Extension>(language ? languageSupport(language) : []);
	const lineNumbersExtension = $derived<Extension>(
		lineNumbers ? [lineNumberGutter(), highlightActiveLineGutter(), foldGutter()] : []
	);
	const editability = $derived(editabilityOf(disabled, readonly));
	const originalEditability = $derived(editabilityOf(disabled, true));
	const placeholderExtension = $derived<Extension>(
		placeholder ? emptyDocPlaceholder(placeholder) : []
	);
	const wrapLinesExtension = $derived<Extension>(wrapLines ? EditorView.lineWrapping : []);
	const nameExtension = $derived(nameContentAttributes(rest));
	const originalNameExtension = $derived(originalNameContentAttributes(rest, originalLabelId));
	const ariaExtension = $derived(otherAriaContentAttributes(rest));
	const elementAttributes = $derived<HTMLAttributes<HTMLDivElement>>(
		Object.fromEntries(Object.entries(rest).filter(([name]) => !isAriaAttribute(name)))
	);
	const collapsedContext = $derived(collapseUnchanged ? COLLAPSED_CONTEXT : undefined);

	function editabilityOf(isDisabled: boolean, isReadonly: boolean): Editability {
		if (isDisabled) return 'disabled';
		return isReadonly ? 'readonly' : 'editable';
	}

	function editabilityExtension(editability: Editability): Extension {
		const isEditable = editability === 'editable';
		return [
			EditorState.readOnly.of(!isEditable),
			EditorView.editable.of(isEditable),
			editability === 'disabled'
				? EditorView.contentAttributes.of({ 'aria-disabled': 'true' })
				: [],
			// A non-editable content element drops out of the tab order. Keep it focusable.
			editability === 'readonly' ? EditorView.contentAttributes.of({ tabindex: '0' }) : []
		];
	}

	function unifiedDiffExtension(text: string | undefined): Extension {
		if (text === undefined) return [];
		return unifiedMergeView({
			original: text,
			mergeControls: false,
			gutter: false,
			...(collapsedContext && { collapseUnchanged: collapsedContext })
		});
	}

	function replaceDoc(view: EditorView, text: string) {
		if (view.state.doc.toString() === text) return;
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: text },
			annotations: outsideWrite.of(true)
		});
	}

	function writeValue(update: ViewUpdate) {
		if (!update.docChanged) return;
		if (update.transactions.some((transaction) => transaction.annotation(outsideWrite))) return;
		value = update.state.doc.toString();
		// A function binding can veto or transform the write without changing `value`, so no effect
		// re-runs. Read it back once the update finishes and put the doc in line.
		queueMicrotask(() => {
			if (editor === update.view) replaceDoc(update.view, value ?? '');
		});
	}

	function sharedExtensions(): Extension {
		return [
			history(),
			keymap.of([
				...closeBracketsKeymap,
				...defaultKeymap,
				...searchKeymap,
				...historyKeymap,
				{ key: 'Ctrl-Shift-]', mac: 'Cmd-Alt-]', run: expandUnchanged },
				...foldKeymap
			]),
			search(),
			highlightSelectionMatches(),
			codeFolding(),
			drawSelection(),
			bracketMatching(),
			closeBrackets(),
			indentOnInput(),
			highlightActiveLine(),
			syntaxHighlighting(classHighlighter),
			codeEditorTheme,
			languageCompartment.of(languageExtension),
			lineNumbersCompartment.of(lineNumbersExtension),
			wrapLinesCompartment.of(wrapLinesExtension)
		];
	}

	function valueEditorExtensions(): Extension {
		return [
			editabilityCompartment.of(editabilityExtension(editability)),
			placeholderCompartment.of(placeholderExtension),
			nameCompartment.of(nameExtension),
			ariaCompartment.of(ariaExtension),
			EditorView.updateListener.of(writeValue)
		];
	}

	// Both attachments read `collapsedContext` tracked, so a change to it rebuilds the editor. The
	// merge view cannot change it on a live editor.
	const attachEditor: Attachment<HTMLElement> = (node) => {
		void collapsedContext;
		const view = untrack(() => {
			unifiedOriginal = original;
			return new EditorView({
				parent: node,
				state: EditorState.create({
					doc: value ?? '',
					extensions: [
						sharedExtensions(),
						valueEditorExtensions(),
						unifiedDiffCompartment.of(unifiedDiffExtension(original))
					]
				})
			});
		});
		editor = view;
		return () => {
			editor = undefined;
			view.destroy();
		};
	};

	const attachSplitEditors: Attachment<HTMLElement> = (node) => {
		const collapsed = collapsedContext;
		const mergeView = untrack(
			() =>
				new MergeView({
					parent: node,
					gutter: false,
					...(collapsed && { collapseUnchanged: collapsed }),
					a: {
						doc: original,
						extensions: [
							sharedExtensions(),
							originalEditabilityCompartment.of(editabilityExtension(originalEditability)),
							originalNameCompartment.of(originalNameExtension)
						]
					},
					b: { doc: value ?? '', extensions: [sharedExtensions(), valueEditorExtensions()] }
				})
		);
		originalEditor = mergeView.a;
		editor = mergeView.b;
		return () => {
			editor = undefined;
			originalEditor = undefined;
			mergeView.destroy();
		};
	};

	function reconfigure(views: (EditorView | undefined)[], effect: StateEffect<unknown>) {
		for (const view of views) view?.dispatch({ effects: effect });
	}

	$effect(() => {
		reconfigure([editor, originalEditor], languageCompartment.reconfigure(languageExtension));
	});

	$effect(() => {
		reconfigure([editor, originalEditor], lineNumbersCompartment.reconfigure(lineNumbersExtension));
	});

	$effect(() => {
		reconfigure([editor, originalEditor], wrapLinesCompartment.reconfigure(wrapLinesExtension));
	});

	$effect(() => {
		reconfigure([editor], editabilityCompartment.reconfigure(editabilityExtension(editability)));
	});

	$effect(() => {
		reconfigure(
			[originalEditor],
			originalEditabilityCompartment.reconfigure(editabilityExtension(originalEditability))
		);
	});

	$effect(() => {
		reconfigure([editor], placeholderCompartment.reconfigure(placeholderExtension));
	});

	$effect(() => {
		reconfigure([editor], nameCompartment.reconfigure(nameExtension));
	});

	$effect(() => {
		reconfigure([originalEditor], originalNameCompartment.reconfigure(originalNameExtension));
	});

	$effect(() => {
		reconfigure([editor], ariaCompartment.reconfigure(ariaExtension));
	});

	$effect(() => {
		const text = value ?? '';
		if (editor) replaceDoc(editor, text);
	});

	$effect(() => {
		const text = original;
		if (originalEditor && text !== undefined) replaceDoc(originalEditor, text);
	});

	$effect(() => {
		const text = original;
		if (!editor || isSplit || text === unifiedOriginal) return;
		if (text === undefined || unifiedOriginal === undefined) {
			editor.dispatch({ effects: unifiedDiffCompartment.reconfigure(unifiedDiffExtension(text)) });
		} else {
			// The merge view's fields keep their first value across a reconfigure, so a new
			// `original` goes in as a change to the original doc instead.
			const previous = getOriginalDoc(editor.state);
			const changes = ChangeSet.of({ from: 0, to: previous.length, insert: text }, previous.length);
			editor.dispatch({ effects: originalDocChangeEffect(editor.state, changes) });
		}
		unifiedOriginal = text;
	});
</script>

<div {...elementAttributes} {@attach isSplit ? attachSplitEditors : attachEditor}></div>
{#if isSplit && rest['aria-labelledby'] != null}
	<span id={originalLabelId} class="sr-only">{ORIGINAL_SIDE_SUFFIX}</span>
{/if}
