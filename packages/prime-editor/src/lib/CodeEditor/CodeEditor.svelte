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
		placeholder as placeholderExtension,
		type ViewUpdate
	} from '@codemirror/view';
	import { classHighlighter } from '@lezer/highlight';
	import { untrack } from 'svelte';

	import type { CodeEditorDiff, CodeEditorLanguage } from './code-editor.ts';

	import { languageSupport } from './languages.ts';
	import { codeEditorTheme } from './theme.ts';

	/**
	 * Every `aria-*` attribute goes to the editing surface, the element with the `textbox` role.
	 * Every other attribute goes to the editor's outer element.
	 */
	type Editability = 'editable' | 'readonly' | 'disabled';

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
		/**
		 * Folds each long run of unchanged lines in the diff view into one row that expands on
		 * click. Changing it rebuilds the editor.
		 */
		collapseUnchanged?: boolean;
		/** The accessible name of the editing surface. A split diff gives it to both sides. */
		'aria-label'?: string;
		/** The id of the element that names the editing surface. A split diff gives it to both sides. */
		'aria-labelledby'?: string;
		/** Marks the document invalid, and paints the error border. */
		'aria-invalid'?: HTMLAttributes<HTMLDivElement>['aria-invalid'];
	}

	let {
		value = $bindable(''),
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
	}: Props = $props();

	const languageCompartment = new Compartment();
	const editabilityCompartment = new Compartment();
	const originalEditabilityCompartment = new Compartment();
	const placeholderCompartment = new Compartment();
	const lineNumbersCompartment = new Compartment();
	const wrapLinesCompartment = new Compartment();
	const nameCompartment = new Compartment();
	const ariaCompartment = new Compartment();
	const unifiedDiffCompartment = new Compartment();

	const ARIA_PREFIX = 'aria-';
	const NAME_ATTRIBUTES = ['aria-label', 'aria-labelledby'];

	// Unchanged lines kept visible around each change, and the shortest run worth folding.
	const COLLAPSED_CONTEXT = { margin: 3, minSize: 4 };

	// Marks a doc change that came from `value` or `original`, so it is never written back to `value`.
	const outsideWrite = Annotation.define<boolean>();

	let editor = $state.raw<EditorView>();
	let originalEditor = $state.raw<EditorView>();
	let unifiedOriginal: string | undefined;

	const isSplit = $derived(original !== undefined && diff === 'split');

	const languageExtension = $derived<Extension>(language ? languageSupport(language) : []);
	const lineNumbersExtension = $derived<Extension>(
		lineNumbers ? [lineNumberGutter(), highlightActiveLineGutter(), foldGutter()] : []
	);
	const editability = $derived(editabilityOf(disabled, readonly));
	const originalEditability = $derived(editabilityOf(disabled, true));
	const placeholderText = $derived<Extension>(placeholder ? placeholderExtension(placeholder) : []);
	const wrapLinesExtension = $derived<Extension>(wrapLines ? EditorView.lineWrapping : []);
	const nameExtension = $derived(ariaContentAttributes(isNameAttribute));
	const ariaExtension = $derived(ariaContentAttributes((name) => !isNameAttribute(name)));
	const elementAttributes = $derived<HTMLAttributes<HTMLDivElement>>(
		Object.fromEntries(Object.entries(rest).filter(([name]) => !name.startsWith(ARIA_PREFIX)))
	);
	const collapsedContext = $derived(collapseUnchanged ? COLLAPSED_CONTEXT : undefined);

	function isNameAttribute(name: string) {
		return NAME_ATTRIBUTES.includes(name);
	}

	function ariaContentAttributes(isIncluded: (name: string) => boolean): Extension {
		const attributes = Object.entries(rest)
			.filter(([name, value]) => name.startsWith(ARIA_PREFIX) && isIncluded(name) && value != null)
			.map(([name, value]) => [name, String(value)]);
		return EditorView.contentAttributes.of(Object.fromEntries(attributes));
	}

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
			if (editor === update.view) replaceDoc(update.view, value);
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

	function editableExtensions(): Extension {
		return [
			editabilityCompartment.of(editabilityExtension(editability)),
			placeholderCompartment.of(placeholderText),
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
		const collapsed = collapsedContext;
		const mergeView = untrack(
			() =>
				new MergeView({
					parent: node,
					...(collapsed && { collapseUnchanged: collapsed }),
					a: {
						doc: original,
						extensions: [
							sharedExtensions(),
							originalEditabilityCompartment.of(editabilityExtension(originalEditability)),
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
		reconfigure([editor], editabilityCompartment.reconfigure(editabilityExtension(editability)));
	});

	$effect(() => {
		reconfigure(
			[originalEditor],
			originalEditabilityCompartment.reconfigure(editabilityExtension(originalEditability))
		);
	});

	$effect(() => {
		reconfigure([editor], placeholderCompartment.reconfigure(placeholderText));
	});

	$effect(() => {
		reconfigure([editor, originalEditor], nameCompartment.reconfigure(nameExtension));
	});

	$effect(() => {
		reconfigure([editor], ariaCompartment.reconfigure(ariaExtension));
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

<div {...elementAttributes} {@attach isSplit ? attachSplitEditors : attachEditor}></div>
