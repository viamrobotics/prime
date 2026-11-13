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
			props: { value: '[true]', language: 'json' }
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
		const { container } = render(CodeEditor, { props: { value: 'locked', readonly: true } });

		expect(contents(container)[0].getAttribute('aria-readonly')).toBe('true');
	});

	it('shows the line-number gutter by default and removes it with lineNumbers false', async () => {
		const { container, rerender } = render(CodeEditor, { props: { value: 'one\ntwo' } });

		expect(container.querySelector('.cm-lineNumbers')).not.toBeNull();

		await rerender({ lineNumbers: false });

		await expect.poll(() => container.querySelector('.cm-lineNumbers')).toBeNull();
	});

	it('toggles line wrapping with wrapLines', async () => {
		const { container, rerender } = render(CodeEditor, { props: { value: 'one' } });
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

	it('names the textbox with aria-labelledby', async () => {
		render(LabelledCodeEditor);

		await expect.element(page.getByRole('textbox', { name: 'Query' })).toBeInTheDocument();
	});

	it('marks a changed chunk in the unified diff and follows original', async () => {
		const { container, rerender } = render(CodeEditor, {
			props: { value: 'a\nb\nc', original: 'a\nB\nc' }
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
});
