import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import CodeEditor from '../CodeEditor.svelte';
import BoundCodeEditor from './fixtures/BoundCodeEditor.svelte';
import ControlledCodeEditor from './fixtures/ControlledCodeEditor.svelte';
import LabelledCodeEditor from './fixtures/LabelledCodeEditor.svelte';
import UnsetCodeEditor from './fixtures/UnsetCodeEditor.svelte';

type EditorProps = ComponentProps<typeof CodeEditor>;

const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const contents = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('.cm-content')
];
const count = (container: Element, selector: string) => container.querySelectorAll(selector).length;
const lines = (content: Element) => [...content.querySelectorAll<HTMLElement>(':scope > .cm-line')];
const docText = (content: Element) =>
	lines(content)
		.map((line) => line.textContent)
		.join('\n');
const token = (container: Element, text: string) =>
	[...container.querySelectorAll('.cm-line span')].find((span) => span.textContent === text);
const textboxNamed = (name: string) => page.getByRole('textbox', { name, exact: true });
const lineWithText = (content: Element, text: string) =>
	lines(content).find((line) => line.textContent === text);

const IS_MAC = navigator.platform.includes('Mac');
const MODIFIER = IS_MAC ? 'Meta' : 'Control';
const EXPAND_KEY = IS_MAC ? '{Meta>}{Alt>}]{/Alt}{/Meta}' : '{Control>}{Shift>}]{/Shift}{/Control}';
const LONG_ORIGINAL = Array.from({ length: 30 }, (_, index) => `line ${index}`).join('\n');
const LONG_VALUE = LONG_ORIGINAL.replace('line 0', 'line zero');
const SPLIT_PROPS = {
	value: 'a\nb',
	original: 'a\nB',
	diff: 'split',
	'aria-label': 'Program'
} as const;

async function typeAtLineEnd(line: HTMLElement, text: string) {
	await userEvent.click(line);
	await userEvent.keyboard('{End}');
	await userEvent.keyboard(text);
}

async function openSearch(container: Element) {
	const [content] = contents(container);
	await userEvent.click(lines(content)[1]);
	await userEvent.keyboard(`{${MODIFIER}>}f{/${MODIFIER}}`);
	await expect.poll(() => count(container, '.cm-search')).toBe(1);
}

describe('CodeEditor', () => {
	describe('value binding', () => {
		it('writes typed text to bind:value', async () => {
			const { container } = render(BoundCodeEditor, { props: { initial: 'hello' } });
			const [content] = contents(container);

			await typeAtLineEnd(lines(content)[0], ' world');

			expect(owner(container)).toBe('hello world');
			expect(docText(content)).toBe('hello world');
		});

		it('shows an outside write to value in the doc', async () => {
			const { container } = render(BoundCodeEditor, {
				props: { initial: 'before', replacement: 'after\nsecond line' }
			});
			const [content] = contents(container);

			await userEvent.click(page.getByRole('button', { name: 'Replace' }));

			await expect.poll(() => docText(content)).toBe('after\nsecond line');
		});

		it('does not write an outside change to value back through a function binding', async () => {
			const record = vi.fn<(next: string) => void>();
			const { container } = render(ControlledCodeEditor, {
				props: { initial: 'before', replacement: 'after', record }
			});
			const [content] = contents(container);

			await userEvent.click(page.getByRole('button', { name: 'Replace' }));

			await expect.poll(() => docText(content)).toBe('after');
			expect(record).not.toHaveBeenCalled();
		});

		it('puts the doc back when a function binding vetoes an edit', async () => {
			const record = vi.fn<(next: string) => void>();
			const { container } = render(ControlledCodeEditor, {
				props: { initial: 'hello', isAccepting: false, record }
			});
			const [content] = contents(container);

			await typeAtLineEnd(lines(content)[0], '!');

			expect(record).toHaveBeenCalledWith('hello!');
			await expect.poll(() => docText(content)).toBe('hello');
			expect(owner(container)).toBe('hello');
		});

		it('keeps the doc a function binding accepts', async () => {
			const record = vi.fn<(next: string) => void>();
			const { container } = render(ControlledCodeEditor, {
				props: { initial: 'hello', isAccepting: true, record }
			});
			const [content] = contents(container);

			await typeAtLineEnd(lines(content)[0], '!');

			expect(record.mock.calls.map(([next]) => next)).toEqual(['hello!']);
			expect(docText(content)).toBe('hello!');
			expect(owner(container)).toBe('hello!');
		});

		it('starts empty when the bound value is undefined and writes typed text to it', async () => {
			const { container } = render(UnsetCodeEditor);
			const [content] = contents(container);

			expect(docText(content)).toBe('');
			expect(owner(container)).toBe('unset');

			await typeAtLineEnd(lines(content)[0], 'hi');

			expect(owner(container)).toBe('hi');
			expect(docText(content)).toBe('hi');
		});
	});

	describe('reconfiguring a live editor', () => {
		it.each<{ prop: string; patch: Partial<EditorProps> }>([
			{ prop: 'language', patch: { language: 'json' } },
			{ prop: 'readonly', patch: { readonly: true } },
			{ prop: 'disabled', patch: { disabled: true } },
			{ prop: 'placeholder', patch: { placeholder: 'Paste a config' } },
			{ prop: 'lineNumbers', patch: { lineNumbers: false } },
			{ prop: 'wrapLines', patch: { wrapLines: true } },
			{ prop: 'aria-label', patch: { 'aria-label': 'Script' } },
			{ prop: 'aria-invalid', patch: { 'aria-invalid': true } },
			{ prop: 'original', patch: { original: 'a\nB' } }
		])('keeps the same editor element when $prop changes', async ({ patch }) => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: 'a\nb', 'aria-label': 'Robot config' }
			});
			const [content] = contents(container);

			await rerender(patch);

			expect(contents(container)[0]).toBe(content);
		});

		it('rebuilds the editor when the layout switches from unified to split', async () => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: 'a\nb', original: 'a\nB', 'aria-label': 'Robot config' }
			});
			const [content] = contents(container);

			await rerender({ diff: 'split' });

			await expect.poll(() => contents(container)).toHaveLength(2);
			expect(contents(container)).not.toContain(content);
		});

		it('rebuilds the editor when collapseUnchanged changes', async () => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: LONG_VALUE, original: LONG_ORIGINAL, 'aria-label': 'Robot config' }
			});
			const [content] = contents(container);

			await rerender({ collapseUnchanged: true });

			await expect.poll(() => contents(container)[0]).not.toBe(content);
		});
	});

	describe('language', () => {
		it('rehighlights the same text when language changes', async () => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: '[true]', language: 'json', 'aria-label': 'Robot config' }
			});

			await expect.poll(() => token(container, 'true')?.className).toContain('tok-bool');

			await rerender({ language: 'python' });

			await expect.poll(() => token(container, 'true')?.className).toContain('tok-variableName');
			expect(token(container, 'true')?.className).not.toContain('tok-bool');
		});
	});

	describe('readonly', () => {
		it('blocks typed input while readonly', async () => {
			const { container } = render(BoundCodeEditor, {
				props: { initial: 'locked', readonly: true }
			});
			const [content] = contents(container);

			await typeAtLineEnd(lines(content)[0], 'x');

			expect(docText(content)).toBe('locked');
			expect(owner(container)).toBe('locked');
		});

		it('accepts typed input once readonly is cleared', async () => {
			const { container, rerender } = render(BoundCodeEditor, {
				props: { initial: 'locked', readonly: true }
			});
			const [content] = contents(container);

			await rerender({ readonly: false });
			await typeAtLineEnd(lines(content)[0], 'x');

			expect(owner(container)).toBe('lockedx');
		});

		it('keeps a readonly editor in the tab order with tabindex 0', () => {
			const { container } = render(CodeEditor, {
				props: { value: 'locked', readonly: true, 'aria-label': 'Robot config' }
			});

			expect(contents(container)[0].getAttribute('tabindex')).toBe('0');
		});

		it('exposes aria-readonly on a readonly editor', () => {
			const { container } = render(CodeEditor, {
				props: { value: 'locked', readonly: true, 'aria-label': 'Robot config' }
			});

			expect(contents(container)[0].getAttribute('aria-readonly')).toBe('true');
		});
	});

	describe('disabled', () => {
		it.each([{ readonly: false }, { readonly: true }])(
			'marks the textbox aria-disabled and removes its tab stop with readonly $readonly',
			({ readonly }) => {
				const { container } = render(CodeEditor, {
					props: { value: 'off', disabled: true, readonly, 'aria-label': 'Robot config' }
				});
				const [content] = contents(container);

				expect(content.getAttribute('aria-disabled')).toBe('true');
				expect(content.getAttribute('tabindex')).toBeNull();
			}
		);

		it('takes no focus or input while disabled', async () => {
			const { container } = render(BoundCodeEditor, {
				props: { initial: 'off', disabled: true }
			});
			const [content] = contents(container);

			await typeAtLineEnd(lines(content)[0], '!');

			expect(content.ownerDocument.activeElement?.tagName).toBe('BODY');
			expect(owner(container)).toBe('off');
		});

		it('accepts input again and drops aria-disabled once disabled is cleared', async () => {
			const { container, rerender } = render(BoundCodeEditor, {
				props: { initial: 'off', disabled: true }
			});
			const [content] = contents(container);

			await rerender({ disabled: false });
			await typeAtLineEnd(lines(content)[0], '!');

			expect(content.getAttribute('aria-disabled')).toBeNull();
			expect(owner(container)).toBe('off!');
		});

		it.each([
			{ side: 'original', index: 0 },
			{ side: 'value', index: 1 }
		])('disables the $side side of a split diff', async ({ index }) => {
			const { container } = render(CodeEditor, { props: { ...SPLIT_PROPS, disabled: true } });

			await expect.poll(() => contents(container)).toHaveLength(2);
			const side = contents(container)[index];

			expect(side.getAttribute('aria-disabled')).toBe('true');
			expect(side.getAttribute('tabindex')).toBeNull();
		});
	});

	describe('placeholder', () => {
		const shown = (container: Element) => container.querySelector('.cm-placeholder')?.textContent;

		it('shows the placeholder while the document is empty', () => {
			const { container } = render(BoundCodeEditor, {
				props: { initial: '', placeholder: 'Paste a config' }
			});

			expect(shown(container)).toBe('Paste a config');
		});

		it('follows the placeholder prop', async () => {
			const { container, rerender } = render(BoundCodeEditor, {
				props: { initial: '', placeholder: 'Paste a config' }
			});

			await rerender({ placeholder: 'Type a query' });

			await expect.poll(() => shown(container)).toBe('Type a query');
		});

		it('hides the placeholder once the document has text', async () => {
			const { container } = render(BoundCodeEditor, {
				props: { initial: '', placeholder: 'Paste a config' }
			});
			const [content] = contents(container);

			await userEvent.click(content);
			await userEvent.keyboard('x');

			await expect.poll(() => shown(container)).toBeUndefined();
		});
	});

	describe('gutter and wrapping', () => {
		it('shows the line-number gutter by default', () => {
			const { container } = render(CodeEditor, {
				props: { value: 'one\ntwo', 'aria-label': 'Robot config' }
			});

			expect(count(container, '.cm-lineNumbers')).toBe(1);
		});

		it('removes the line-number gutter with lineNumbers false', async () => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: 'one\ntwo', 'aria-label': 'Robot config' }
			});

			await rerender({ lineNumbers: false });

			await expect.poll(() => count(container, '.cm-lineNumbers')).toBe(0);
		});

		it('does not wrap lines by default', () => {
			const { container } = render(CodeEditor, {
				props: { value: 'one', 'aria-label': 'Robot config' }
			});

			expect(contents(container)[0].className).not.toContain('cm-lineWrapping');
		});

		it('wraps lines with wrapLines', async () => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: 'one', 'aria-label': 'Robot config' }
			});

			await rerender({ wrapLines: true });

			await expect.poll(() => contents(container)[0].className).toContain('cm-lineWrapping');
		});
	});

	describe('keyboard', () => {
		it('moves focus out of the editor on Tab without changing the document', async () => {
			const { container } = render(BoundCodeEditor, { props: { initial: 'hello' } });
			const [content] = contents(container);

			await userEvent.click(lines(content)[0]);
			await userEvent.keyboard('{Tab}');

			expect(docText(content)).toBe('hello');
			expect(content.ownerDocument.activeElement?.textContent).toBe('Replace');
		});

		it('highlights other occurrences of the selected text', async () => {
			const { container } = render(CodeEditor, {
				props: { value: 'alpha beta alpha', 'aria-label': 'Robot config' }
			});
			const [content] = contents(container);

			await userEvent.click(lines(content)[0]);
			await userEvent.keyboard('{Home}');
			await userEvent.keyboard('{Shift>}{ArrowRight>5/}{/Shift}');

			await expect.poll(() => count(container, '.cm-selectionMatch')).toBe(1);
		});
	});

	describe('search', () => {
		const searchProps = { value: 'alpha\nbeta\nalpha', 'aria-label': 'Robot config' };

		it('opens a search panel from the keyboard', async () => {
			const { container } = render(CodeEditor, { props: searchProps });

			await openSearch(container);

			expect(count(container, '.cm-search')).toBe(1);
		});

		it('marks the matches of the search text', async () => {
			const { container } = render(CodeEditor, { props: searchProps });
			await openSearch(container);

			await userEvent.keyboard('alpha');

			await expect.poll(() => count(container, '.cm-searchMatch')).toBe(2);
		});

		it('closes the search panel on Escape', async () => {
			const { container } = render(CodeEditor, { props: searchProps });
			await openSearch(container);

			await userEvent.keyboard('{Escape}');

			await expect.poll(() => count(container, '.cm-search')).toBe(0);
		});
	});

	describe('folding', () => {
		const foldProps = {
			value: '{\n  "a": 1,\n  "b": 2\n}',
			language: 'json',
			'aria-label': 'Robot config'
		} as const;
		const foldMarker = (container: Element) =>
			container.querySelector<HTMLElement>('.cm-foldGutter [title="Fold line"]');

		it('folds a block from the gutter', async () => {
			const { container } = render(CodeEditor, { props: foldProps });
			const [content] = contents(container);
			await expect.poll(() => count(container, '.cm-foldGutter [title="Fold line"]')).toBe(1);

			await userEvent.click(foldMarker(container)!);

			await expect.poll(() => count(content, '.cm-foldPlaceholder')).toBe(1);
			expect(lines(content)).toHaveLength(1);
		});

		it('unfolds a fold with the expand key when no collapsed lines touch the cursor', async () => {
			const { container } = render(CodeEditor, { props: foldProps });
			const [content] = contents(container);
			await expect.poll(() => count(container, '.cm-foldGutter [title="Fold line"]')).toBe(1);
			await userEvent.click(foldMarker(container)!);
			await expect.poll(() => count(content, '.cm-foldPlaceholder')).toBe(1);
			await userEvent.click(lines(content)[0], { position: { x: 1, y: 1 } });
			expect(count(content, '.cm-foldPlaceholder')).toBe(1);

			await userEvent.keyboard(EXPAND_KEY);

			await expect.poll(() => count(content, '.cm-foldPlaceholder')).toBe(0);
			expect(lines(content)).toHaveLength(4);
		});

		it('drops the fold markers with lineNumbers false', async () => {
			const { container, rerender } = render(CodeEditor, { props: foldProps });
			await expect.poll(() => count(container, '.cm-foldGutter')).toBe(1);

			await rerender({ lineNumbers: false });

			await expect.poll(() => count(container, '.cm-foldGutter')).toBe(0);
		});
	});

	describe('accessible name', () => {
		it('names the textbox with aria-label', async () => {
			render(CodeEditor, {
				props: { value: 'print(1)', language: 'python', 'aria-label': 'Script' }
			});

			await expect.element(textboxNamed('Script')).toHaveAttribute('contenteditable', 'true');
		});

		it('requires an accessible name', () => {
			// @ts-expect-error aria-label or aria-labelledby is required
			const unnamed: EditorProps = { value: 'print(1)' };

			expect(unnamed.value).toBe('print(1)');
		});

		it('names the textbox with aria-labelledby', async () => {
			render(LabelledCodeEditor);

			await expect.element(textboxNamed('Query')).toHaveAttribute('contenteditable', 'true');
		});

		it('names a unified diff textbox exactly as given', async () => {
			render(CodeEditor, {
				props: { value: 'a\nb', original: 'a\nB', 'aria-label': 'Program' }
			});

			await expect.poll(() => textboxNamed('Program').elements()).toHaveLength(1);
			expect(page.getByRole('textbox', { name: 'original' }).elements()).toHaveLength(0);
		});

		it('names the original split textbox with the aria-label followed by original', async () => {
			render(CodeEditor, { props: SPLIT_PROPS });

			await expect.poll(() => textboxNamed('Program, original').elements()).toHaveLength(1);
		});

		it('names the value split textbox with the aria-label as given', async () => {
			render(CodeEditor, { props: SPLIT_PROPS });

			await expect.poll(() => textboxNamed('Program').elements()).toHaveLength(1);
		});

		it('names the original split textbox with the label text followed by original', async () => {
			render(LabelledCodeEditor, { props: { isSplit: true } });

			await expect.poll(() => textboxNamed('Query original').elements()).toHaveLength(1);
		});

		it('names the value split textbox with the label text as given', async () => {
			render(LabelledCodeEditor, { props: { isSplit: true } });

			await expect.poll(() => textboxNamed('Query').elements()).toHaveLength(1);
		});

		it('names the original split textbox from aria-labelledby when aria-label is also given', async () => {
			render(LabelledCodeEditor, { props: { isSplit: true, label: 'Fallback' } });

			await expect.poll(() => textboxNamed('Query original').elements()).toHaveLength(1);
			expect(textboxNamed('Fallback, original').elements()).toHaveLength(0);
		});

		it('renames the original split textbox when aria-label changes', async () => {
			const { rerender } = render(CodeEditor, { props: SPLIT_PROPS });

			await rerender({ 'aria-label': 'Script' });

			await expect.poll(() => textboxNamed('Script, original').elements()).toHaveLength(1);
		});

		it('renames the value split textbox when aria-label changes', async () => {
			const { rerender } = render(CodeEditor, { props: SPLIT_PROPS });

			await rerender({ 'aria-label': 'Script' });

			await expect.poll(() => textboxNamed('Script').elements()).toHaveLength(1);
			expect(page.getByRole('textbox', { name: 'Program' }).elements()).toHaveLength(0);
		});

		it('renames the original split textbox when aria-labelledby changes', async () => {
			const { rerender } = render(LabelledCodeEditor, { props: { isSplit: true } });

			await rerender({ labelledby: 'other-label' });

			await expect.poll(() => textboxNamed('Other original').elements()).toHaveLength(1);
		});

		it('renames the value split textbox when aria-labelledby changes', async () => {
			const { rerender } = render(LabelledCodeEditor, { props: { isSplit: true } });

			await rerender({ labelledby: 'other-label' });

			await expect.poll(() => textboxNamed('Other').elements()).toHaveLength(1);
		});
	});

	describe('unified diff', () => {
		const changedLine = (container: Element) =>
			container.querySelector('.cm-changedLine')?.textContent;
		const diffProps = { value: 'a\nb\nc', original: 'a\nB\nc', 'aria-label': 'Robot config' };

		it('renders the unified diff in a single editor', async () => {
			const { container } = render(CodeEditor, { props: diffProps });

			await expect.poll(() => changedLine(container)).toBe('b');
			expect(contents(container)).toHaveLength(1);
		});

		it('shows the original text of a changed line as a deleted chunk', async () => {
			const { container } = render(CodeEditor, { props: diffProps });

			await expect
				.poll(() => container.querySelector('.cm-deletedChunk')?.textContent)
				.toContain('B');
		});

		it('clears the marks when original equals value', async () => {
			const { container, rerender } = render(CodeEditor, { props: diffProps });
			await expect.poll(() => changedLine(container)).toBe('b');

			await rerender({ original: 'a\nb\nc' });

			await expect.poll(() => changedLine(container)).toBeUndefined();
		});

		it('follows a new original', async () => {
			const { container, rerender } = render(CodeEditor, { props: diffProps });
			await expect.poll(() => changedLine(container)).toBe('b');

			await rerender({ original: 'a\nb\nC' });

			await expect.poll(() => changedLine(container)).toBe('c');
		});

		it('removes the marks when original is cleared', async () => {
			const { container, rerender } = render(CodeEditor, { props: diffProps });
			await expect.poll(() => changedLine(container)).toBe('b');

			await rerender({ original: undefined });

			await expect.poll(() => changedLine(container)).toBeUndefined();
		});
	});

	describe('split diff', () => {
		const splitProps = { initial: 'a\nb\nc', original: 'a\nB\nc', diff: 'split' } as const;

		it('renders two editors', async () => {
			const { container } = render(BoundCodeEditor, { props: splitProps });

			await expect.poll(() => contents(container)).toHaveLength(2);
			expect(count(container, '.cm-mergeView')).toBe(1);
		});

		it('blocks typing on the original side', async () => {
			const { container } = render(BoundCodeEditor, { props: splitProps });
			await expect.poll(() => contents(container)).toHaveLength(2);
			const [originalSide] = contents(container);

			await typeAtLineEnd(lines(originalSide)[2], 'x');

			expect(docText(originalSide)).toBe('a\nB\nc');
			expect(owner(container)).toBe('a\nb\nc');
		});

		it('writes typing on the value side to bind:value and leaves the original side', async () => {
			const { container } = render(BoundCodeEditor, { props: splitProps });
			await expect.poll(() => contents(container)).toHaveLength(2);
			const [originalSide, valueSide] = contents(container);

			await typeAtLineEnd(lines(valueSide)[2], 'x');

			expect(owner(container)).toBe('a\nb\ncx');
			expect(docText(originalSide)).toBe('a\nB\nc');
		});

		it('marks only the original side aria-readonly', async () => {
			const { container } = render(CodeEditor, { props: SPLIT_PROPS });
			await expect.poll(() => contents(container)).toHaveLength(2);
			const [originalSide, valueSide] = contents(container);

			expect(originalSide.getAttribute('aria-readonly')).toBe('true');
			expect(valueSide.getAttribute('aria-readonly')).toBeNull();
		});

		it('invalidates only the value side', async () => {
			const { container } = render(CodeEditor, {
				props: { ...SPLIT_PROPS, 'aria-invalid': true }
			});
			await expect.poll(() => contents(container)).toHaveLength(2);
			const [originalSide, valueSide] = contents(container);

			expect(originalSide.getAttribute('aria-invalid')).toBeNull();
			expect(valueSide.getAttribute('aria-invalid')).toBe('true');
		});
	});

	describe('collapseUnchanged', () => {
		it.each([
			{ diff: 'unified', changedLines: 1, collapsedRuns: 1 },
			{ diff: 'split', changedLines: 2, collapsedRuns: 2 }
		] as const)(
			'folds unchanged lines in the $diff diff only with collapseUnchanged',
			async ({ diff, changedLines, collapsedRuns }) => {
				const { container, rerender } = render(CodeEditor, {
					props: { value: LONG_VALUE, original: LONG_ORIGINAL, diff, 'aria-label': 'Robot config' }
				});
				await expect.poll(() => count(container, '.cm-changedLine')).toBe(changedLines);
				expect(count(container, '.cm-collapsedLines')).toBe(0);

				await rerender({ collapseUnchanged: true });
				await expect.poll(() => count(container, '.cm-collapsedLines')).toBe(collapsedRuns);
				await rerender({ collapseUnchanged: false });

				await expect.poll(() => count(container, '.cm-collapsedLines')).toBe(0);
			}
		);

		it.each([
			{ diff: 'unified', side: 'value', index: 0, collapsedRuns: 1 },
			{ diff: 'split', side: 'original', index: 0, collapsedRuns: 2 },
			{ diff: 'split', side: 'value', index: 1, collapsedRuns: 2 }
		] as const)(
			'expands the collapsed lines next to the cursor on the $side side of the $diff diff with the expand key',
			async ({ diff, index, collapsedRuns }) => {
				const { container } = render(CodeEditor, {
					props: {
						value: LONG_VALUE,
						original: LONG_ORIGINAL,
						diff,
						collapseUnchanged: true,
						'aria-label': 'Robot config'
					}
				});
				await expect.poll(() => count(container, '.cm-collapsedLines')).toBe(collapsedRuns);
				const content = contents(container)[index];
				expect(lineWithText(content, 'line 29')).toBeUndefined();

				await userEvent.click(lineWithText(content, 'line 3')!);
				await userEvent.keyboard(EXPAND_KEY);

				await expect.poll(() => count(container, '.cm-collapsedLines')).toBe(0);
				for (const side of contents(container)) {
					expect(lineWithText(side, 'line 29')?.textContent).toBe('line 29');
				}
			}
		);
	});

	describe('aria and attribute routing', () => {
		const routedProps = {
			value: 'x',
			id: 'config-editor',
			class: ['max-h-64', { 'w-full': true }],
			'data-kind': 'config',
			'aria-label': 'Config',
			'aria-required': true
		} as const;

		it('puts an aria attribute other than the name on the textbox', async () => {
			render(CodeEditor, { props: routedProps });

			await expect.element(textboxNamed('Config')).toHaveAttribute('aria-required', 'true');
		});

		it('keeps every aria attribute off the outer element', () => {
			const { container } = render(CodeEditor, { props: routedProps });
			const outer = container.querySelector<HTMLElement>('#config-editor');

			expect(outer?.getAttributeNames().filter((name) => name.startsWith('aria-'))).toEqual([]);
		});

		it('spreads id, data attributes, and class onto the outer element', () => {
			const { container } = render(CodeEditor, { props: routedProps });
			const outer = container.querySelector<HTMLElement>('#config-editor');

			expect(outer?.dataset.kind).toBe('config');
			expect(outer?.className).toBe('max-h-64 w-full');
		});

		it('wraps the editing surface in the outer element', () => {
			const { container } = render(CodeEditor, { props: routedProps });

			expect(textboxNamed('Config').element().closest('#config-editor')).toBe(
				container.querySelector('#config-editor')
			);
		});

		it('spreads event handlers onto the outer element', async () => {
			const onfocusin = vi.fn();
			render(CodeEditor, { props: { ...routedProps, onfocusin } });

			await userEvent.click(textboxNamed('Config'));

			expect(onfocusin).toHaveBeenCalledOnce();
		});

		it.each([
			{ attribute: 'aria-describedby', value: 'config-hint', expected: 'config-hint' },
			{ attribute: 'aria-errormessage', value: 'config-error', expected: 'config-error' },
			{ attribute: 'aria-invalid', value: true, expected: 'true' }
		])('puts $attribute on the textbox', async ({ attribute, value, expected }) => {
			render(CodeEditor, {
				props: { value: '{', 'aria-label': 'Config', [attribute]: value }
			});

			await expect.element(textboxNamed('Config')).toHaveAttribute(attribute, expected);
		});

		it.each([
			{ attribute: 'aria-describedby', value: 'config-hint' },
			{ attribute: 'aria-errormessage', value: 'config-error' }
		])('removes $attribute from the textbox when it is cleared', async ({ attribute, value }) => {
			const { rerender } = render(CodeEditor, {
				props: { value: '{', 'aria-label': 'Config', [attribute]: value }
			});

			await rerender({ [attribute]: undefined });

			await expect.element(textboxNamed('Config')).not.toHaveAttribute(attribute);
		});

		it('sets aria-invalid to false on the textbox when it changes to false', async () => {
			const { rerender } = render(CodeEditor, {
				props: { value: '{', 'aria-label': 'Config', 'aria-invalid': true }
			});

			await rerender({ 'aria-invalid': false });

			await expect.element(textboxNamed('Config')).toHaveAttribute('aria-invalid', 'false');
		});
	});
});
