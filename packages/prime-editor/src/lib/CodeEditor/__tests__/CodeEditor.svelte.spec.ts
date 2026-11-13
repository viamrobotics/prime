import type { ComponentProps } from 'svelte';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import CodeEditor from '../CodeEditor.svelte';
import BoundCodeEditor from './BoundCodeEditor.svelte';
import ControlledCodeEditor from './ControlledCodeEditor.svelte';
import LabelledCodeEditor from './LabelledCodeEditor.svelte';

const owner = (container: Element) => container.querySelector('[data-testid="owner"]')?.textContent;
const contents = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('.cm-content')
];
const lines = (content: Element) => [...content.querySelectorAll<HTMLElement>(':scope > .cm-line')];
const docText = (content: Element) =>
	lines(content)
		.map((line) => line.textContent)
		.join('\n');
const token = (container: Element, text: string) =>
	[...container.querySelectorAll('.cm-line span')].find((span) => span.textContent === text);

const MODIFIER = navigator.platform.includes('Mac') ? 'Meta' : 'Control';
const LONG_ORIGINAL = Array.from({ length: 30 }, (_, index) => `line ${index}`).join('\n');
const LONG_VALUE = LONG_ORIGINAL.replace('line 0', 'line zero');

async function typeAtLineEnd(line: HTMLElement, text: string) {
	await userEvent.click(line);
	await userEvent.keyboard('{End}');
	await userEvent.keyboard(text);
}

describe('CodeEditor', () => {
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

	it('rehighlights the same text when language changes, without rebuilding the editor', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: '[true]', language: 'json', 'aria-label': 'Robot config' }
		});
		const [content] = contents(container);

		await expect.poll(() => token(container, 'true')?.className).toContain('tok-bool');

		await rerender({ language: 'python' });

		await expect.poll(() => token(container, 'true')?.className).toContain('tok-variableName');
		expect(token(container, 'true')?.className).not.toContain('tok-bool');
		expect(contents(container)[0]).toBe(content);
	});

	it('blocks typed input while readonly, and accepts it once readonly is cleared', async () => {
		const { container, rerender } = render(BoundCodeEditor, {
			props: { initial: 'locked', readonly: true }
		});
		const [content] = contents(container);

		expect(content.getAttribute('contenteditable')).toBe('false');
		expect(content.getAttribute('tabindex')).toBe('0');

		await typeAtLineEnd(lines(content)[0], 'x');

		expect(docText(content)).toBe('locked');
		expect(owner(container)).toBe('locked');

		await rerender({ readonly: false });
		await typeAtLineEnd(lines(content)[0], 'x');

		expect(owner(container)).toBe('lockedx');
	});

	it('exposes aria-readonly on a readonly editor', () => {
		const { container } = render(CodeEditor, {
			props: { value: 'locked', readonly: true, 'aria-label': 'Robot config' }
		});

		expect(contents(container)[0].getAttribute('aria-readonly')).toBe('true');
	});

	it('takes no focus, input, or tab stop while disabled, and marks the textbox aria-disabled', async () => {
		const { container, rerender } = render(BoundCodeEditor, {
			props: { initial: 'off', disabled: true, readonly: true }
		});
		const [content] = contents(container);

		expect(content.getAttribute('aria-disabled')).toBe('true');
		expect(content.hasAttribute('tabindex')).toBe(false);

		await typeAtLineEnd(lines(content)[0], '!');

		expect(content.ownerDocument.activeElement).not.toBe(content);
		expect(owner(container)).toBe('off');

		await rerender({ disabled: false, readonly: false });
		await typeAtLineEnd(lines(content)[0], '!');

		expect(content.hasAttribute('aria-disabled')).toBe(false);
		expect(owner(container)).toBe('off!');
	});

	it('disables both sides of a split diff', async () => {
		const { container } = render(CodeEditor, {
			props: {
				value: 'a\nb',
				original: 'a\nB',
				diff: 'split',
				disabled: true,
				'aria-label': 'Robot config'
			}
		});

		await expect.poll(() => contents(container)).toHaveLength(2);

		for (const side of contents(container)) {
			expect(side.getAttribute('aria-disabled')).toBe('true');
			expect(side.hasAttribute('tabindex')).toBe(false);
		}
	});

	it('shows placeholder only while the document is empty, and follows the prop', async () => {
		const { container, rerender } = render(BoundCodeEditor, {
			props: { initial: '', placeholder: 'Paste a config' }
		});
		const [content] = contents(container);
		const shown = () => container.querySelector('.cm-placeholder')?.textContent;

		expect(shown()).toBe('Paste a config');

		await rerender({ placeholder: 'Type a query' });

		await expect.poll(shown).toBe('Type a query');

		await userEvent.click(content);
		await userEvent.keyboard('x');

		await expect.poll(shown).toBeUndefined();
	});

	it('shows the line-number gutter by default and removes it with lineNumbers false', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: 'one\ntwo', 'aria-label': 'Robot config' }
		});

		expect(container.querySelector('.cm-lineNumbers')).not.toBeNull();

		await rerender({ lineNumbers: false });

		await expect.poll(() => container.querySelector('.cm-lineNumbers')).toBeNull();
	});

	it('toggles line wrapping with wrapLines', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: 'one', 'aria-label': 'Robot config' }
		});
		const [content] = contents(container);

		expect(content.classList.contains('cm-lineWrapping')).toBe(false);

		await rerender({ wrapLines: true });

		await expect.poll(() => content.classList.contains('cm-lineWrapping')).toBe(true);
	});

	it('names the textbox with aria-label', async () => {
		render(CodeEditor, {
			props: { value: 'print(1)', language: 'python', 'aria-label': 'Script' }
		});

		await expect.element(page.getByRole('textbox', { name: 'Script' })).toBeInTheDocument();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error aria-label or aria-labelledby is required
		const unnamed: ComponentProps<typeof CodeEditor> = { value: 'print(1)' };

		expect(unnamed.value).toBe('print(1)');
	});

	it('names the textbox with aria-labelledby', async () => {
		render(LabelledCodeEditor);

		await expect.element(page.getByRole('textbox', { name: 'Query' })).toBeInTheDocument();
	});

	it('marks a changed chunk in the unified diff and follows original', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: 'a\nb\nc', original: 'a\nB\nc', 'aria-label': 'Robot config' }
		});
		const changed = () => container.querySelector('.cm-changedLine, .cm-deletedChunk');

		expect(contents(container)).toHaveLength(1);
		await expect.poll(changed).not.toBeNull();

		await rerender({ original: 'a\nb\nc' });

		await expect.poll(changed).toBeNull();

		await rerender({ original: 'a\nb\nC' });

		await expect.poll(changed).not.toBeNull();

		await rerender({ original: undefined });

		await expect.poll(changed).toBeNull();
	});

	it('names both split textboxes and marks only the original side aria-readonly', async () => {
		render(CodeEditor, {
			props: { value: 'a\nb', original: 'a\nB', diff: 'split', 'aria-label': 'Program' }
		});
		const named = page.getByRole('textbox', { name: 'Program' });

		await expect.poll(() => named.elements()).toHaveLength(2);
		const [originalSide, valueSide] = named.elements();
		expect(originalSide.getAttribute('aria-readonly')).toBe('true');
		expect(valueSide.getAttribute('aria-readonly')).toBeNull();
	});

	it('renames both split textboxes when aria-label changes', async () => {
		const { rerender } = render(CodeEditor, {
			props: { value: 'a\nb', original: 'a\nB', diff: 'split', 'aria-label': 'Program' }
		});

		await rerender({ 'aria-label': 'Script' });

		await expect
			.poll(() => page.getByRole('textbox', { name: 'Script' }).elements())
			.toHaveLength(2);
		expect(page.getByRole('textbox', { name: 'Program' }).elements()).toHaveLength(0);
	});

	it('renders the split diff as two editors with the original side read-only', async () => {
		const { container } = render(BoundCodeEditor, {
			props: { initial: 'a\nb\nc', original: 'a\nB\nc', diff: 'split' }
		});

		await expect.poll(() => contents(container)).toHaveLength(2);
		expect(container.querySelector('.cm-mergeView')).not.toBeNull();
		expect(container.querySelector('.cm-changedLine')).not.toBeNull();

		const [originalSide, valueSide] = contents(container);

		expect(originalSide.getAttribute('contenteditable')).toBe('false');
		expect(valueSide.getAttribute('contenteditable')).toBe('true');

		await typeAtLineEnd(lines(originalSide)[2], 'x');

		expect(docText(originalSide)).toBe('a\nB\nc');
		expect(owner(container)).toBe('a\nb\nc');

		await typeAtLineEnd(lines(valueSide)[2], 'x');

		expect(owner(container)).toBe('a\nb\ncx');
		expect(docText(originalSide)).toBe('a\nB\nc');
	});

	it('describes and invalidates the textbox, and clears both', async () => {
		const { rerender } = render(CodeEditor, {
			props: {
				value: '{',
				'aria-label': 'Config',
				'aria-describedby': 'config-hint',
				'aria-invalid': true,
				'aria-errormessage': 'config-error'
			}
		});
		const textbox = page.getByRole('textbox', { name: 'Config' });

		await expect.element(textbox).toHaveAttribute('aria-describedby', 'config-hint');
		await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
		await expect.element(textbox).toHaveAttribute('aria-errormessage', 'config-error');

		await rerender({
			'aria-invalid': false,
			'aria-describedby': undefined,
			'aria-errormessage': undefined
		});

		await expect.element(textbox).toHaveAttribute('aria-invalid', 'false');
		await expect.element(textbox).not.toHaveAttribute('aria-describedby');
		await expect.element(textbox).not.toHaveAttribute('aria-errormessage');
	});

	it('puts every aria attribute on the textbox and every other attribute on the outer element', async () => {
		const onfocusin = vi.fn();
		const { container } = render(CodeEditor, {
			props: {
				value: 'x',
				id: 'config-editor',
				class: ['max-h-64', { 'w-full': true }],
				'data-kind': 'config',
				'aria-label': 'Config',
				'aria-required': true,
				onfocusin
			}
		});
		const outer = container.querySelector<HTMLElement>('#config-editor');
		const textbox = page.getByRole('textbox', { name: 'Config' });

		expect(outer?.dataset.kind).toBe('config');
		expect(outer?.className).toBe('max-h-64 w-full');
		expect(outer?.hasAttribute('aria-label')).toBe(false);
		expect(outer?.hasAttribute('aria-required')).toBe(false);
		await expect.element(textbox).toHaveAttribute('aria-required', 'true');
		expect(textbox.element().closest('#config-editor')).toBe(outer);

		await userEvent.click(textbox);

		expect(onfocusin).toHaveBeenCalled();
	});

	it('invalidates only the value side of a split diff', async () => {
		const { container } = render(CodeEditor, {
			props: {
				value: 'a\nb',
				original: 'a\nB',
				diff: 'split',
				'aria-invalid': true,
				'aria-label': 'Robot config'
			}
		});

		await expect.poll(() => contents(container)).toHaveLength(2);
		const [originalSide, valueSide] = contents(container);

		expect(originalSide.getAttribute('aria-invalid')).toBeNull();
		expect(valueSide.getAttribute('aria-invalid')).toBe('true');
	});

	it('opens a search panel from the keyboard, marks the matches, and closes on Escape', async () => {
		const { container } = render(CodeEditor, {
			props: { value: 'alpha\nbeta\nalpha', 'aria-label': 'Robot config' }
		});
		const [content] = contents(container);

		await userEvent.click(lines(content)[1]);
		await userEvent.keyboard(`{${MODIFIER}>}f{/${MODIFIER}}`);

		await expect.poll(() => container.querySelector('.cm-search')).not.toBeNull();

		await userEvent.keyboard('alpha');

		await expect.poll(() => container.querySelectorAll('.cm-searchMatch')).toHaveLength(2);

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => container.querySelector('.cm-search')).toBeNull();
	});

	it('folds a block from the gutter, and drops the fold markers with lineNumbers false', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: '{\n  "a": 1,\n  "b": 2\n}', language: 'json', 'aria-label': 'Robot config' }
		});
		const [content] = contents(container);
		const foldMarker = () =>
			container.querySelector<HTMLElement>('.cm-foldGutter [title="Fold line"]');

		await expect.poll(foldMarker).not.toBeNull();
		await userEvent.click(foldMarker()!);

		await expect.poll(() => content.querySelector('.cm-foldPlaceholder')).not.toBeNull();
		expect(lines(content)).toHaveLength(1);

		await rerender({ lineNumbers: false });

		await expect.poll(() => container.querySelector('.cm-foldGutter')).toBeNull();
	});

	it.each(['unified', 'split'] as const)(
		'folds unchanged lines in the %s diff only with collapseUnchanged',
		async (diff) => {
			const { container, rerender } = render(CodeEditor, {
				props: { value: LONG_VALUE, original: LONG_ORIGINAL, diff, 'aria-label': 'Robot config' }
			});
			const collapsed = () => container.querySelector('.cm-collapsedLines');

			await expect.poll(() => container.querySelector('.cm-changedLine')).not.toBeNull();
			expect(collapsed()).toBeNull();

			await rerender({ collapseUnchanged: true });

			await expect.poll(collapsed).not.toBeNull();
			expect(container.querySelector('.cm-changedLine')).not.toBeNull();

			await rerender({ collapseUnchanged: false });

			await expect.poll(collapsed).toBeNull();
		}
	);
});
