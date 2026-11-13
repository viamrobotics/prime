<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
	import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
	import { bracketMatching, indentOnInput, syntaxHighlighting } from '@codemirror/language';
	import {
		MergeView,
		getOriginalDoc,
		originalDocChangeEffect,
		unifiedMergeView
	} from '@codemirror/merge';
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
		type ViewUpdate
	} from '@codemirror/view';
	import { classHighlighter } from '@lezer/highlight';
	import { untrack } from 'svelte';

	import type { CodeEditorDiff, CodeEditorLanguage } from './code-editor.ts';

	import { languageSupport } from './languages.ts';
	import { codeEditorTheme } from './theme.ts';

	interface Props {
		/**
		 * The document. Bind it with `bind:value`, or with a function binding to veto or transform
		 * an edit.
		 */
		value?: string;
		/** The grammar that highlights and indents the document. Omit it for plain text. */
		language?: CodeEditorLanguage;
		/** Blocks edits. The document stays focusable, selectable, and copyable. */
		readonly?: boolean;
		/** Shows the line-number gutter. */
		lineNumbers?: boolean;
		/** Wraps long lines instead of scrolling them horizontally. */
		wrapLines?: boolean;
		/** The text `value` is compared against. Setting it opens the diff view. */
		original?: string;
		/** The diff view's layout while `original` is set. */
		diff?: CodeEditorDiff;
		/** The accessible name of the editing surface. */
		'aria-label'?: string;
		/** The id of the element that names the editing surface. */
		'aria-labelledby'?: string;
		/** Classes for the editor's outer element. */
		class?: string;
	}

	let {
		value = $bindable(''),
		language,
		readonly = false,
		lineNumbers = true,
		wrapLines = false,
		original,
		diff = 'unified',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		class: className
	}: Props = $props();

	const languageCompartment = new Compartment();
	const readonlyCompartment = new Compartment();
	const lineNumbersCompartment = new Compartment();
	const wrapLinesCompartment = new Compartment();
	const nameCompartment = new Compartment();
	const unifiedDiffCompartment = new Compartment();

	// Marks a doc change that came from `value` or `original`, so it is never written back to `value`.
	const outsideWrite = Annotation.define<boolean>();

	let editor = $state.raw<EditorView>();
	let originalEditor = $state.raw<EditorView>();
	let unifiedOriginal: string | undefined;

	const isSplit = $derived(original !== undefined && diff === 'split');

	const languageExtension = $derived<Extension>(language ? languageSupport(language) : []);
	const lineNumbersExtension = $derived<Extension>(
		lineNumbers ? [lineNumberGutter(), highlightActiveLineGutter()] : []
	);
	const wrapLinesExtension = $derived<Extension>(wrapLines ? EditorView.lineWrapping : []);
	const nameExtension = $derived(
		EditorView.contentAttributes.of({
			...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel }),
			...(ariaLabelledby === undefined ? {} : { 'aria-labelledby': ariaLabelledby })
		})
	);

	function readonlyExtension(isReadonly: boolean): Extension {
		return [
			EditorState.readOnly.of(isReadonly),
			EditorView.editable.of(!isReadonly),
			// A non-editable content element drops out of the tab order. Keep it focusable.
			isReadonly ? EditorView.contentAttributes.of({ tabindex: '0' }) : []
		];
	}

	function unifiedDiffExtension(text: string | undefined): Extension {
		return text === undefined ? [] : unifiedMergeView({ original: text, mergeControls: false });
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
			if (editor === update.view) replaceDoc(update.view, value);
		});
	}

	function sharedExtensions(): Extension {
		return [
			history(),
			keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
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

	function editableExtensions(): Extension {
		return [
			readonlyCompartment.of(readonlyExtension(readonly)),
			nameCompartment.of(nameExtension),
			EditorView.updateListener.of(writeValue)
		];
	}

	const attachEditor: Attachment<HTMLElement> = (node) => {
		const view = untrack(() => {
			unifiedOriginal = original;
			return new EditorView({
				parent: node,
				state: EditorState.create({
					doc: value,
					extensions: [
						sharedExtensions(),
						editableExtensions(),
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
		const mergeView = untrack(
			() =>
				new MergeView({
					parent: node,
					a: {
						doc: original,
						extensions: [
							sharedExtensions(),
							readonlyExtension(true),
							nameCompartment.of(nameExtension)
						]
					},
					b: { doc: value, extensions: [sharedExtensions(), editableExtensions()] }
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
		reconfigure([editor], readonlyCompartment.reconfigure(readonlyExtension(readonly)));
	});

	$effect(() => {
		reconfigure([editor, originalEditor], nameCompartment.reconfigure(nameExtension));
	});

	$effect(() => {
		const text = value;
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

<div class={className} {@attach isSplit ? attachSplitEditors : attachEditor}></div>
