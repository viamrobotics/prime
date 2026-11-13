import '../../../../test/tailwind.css';
import '@viamrobotics/tailwind-config/dark';

import { javascript } from '@codemirror/lang-javascript';
import { MergeView, unifiedMergeView } from '@codemirror/merge';
import { EditorView, lineNumbers, placeholder } from '@codemirror/view';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { codeEditorTheme } from '../theme.ts';

const SOURCE = 'const answer = "forty-two"; // note\n';

let host: HTMLElement | undefined;

afterEach(() => host?.remove());

const mount = (scopeClass?: string) => {
	host = document.createElement('div');
	if (scopeClass) host.className = scopeClass;
	document.body.append(host);
	const view = new EditorView({
		doc: SOURCE,
		extensions: [javascript(), lineNumbers(), codeEditorTheme],
		parent: host
	});
	return view.dom;
};

const resolveColor = (container: HTMLElement, variable: string) => {
	const probe = document.createElement('span');
	probe.style.color = `var(${variable})`;
	container.append(probe);
	const resolved = getComputedStyle(probe).color;
	probe.remove();
	return resolved;
};

const colorOfText = (root: HTMLElement, text: string) => {
	const span = [...root.querySelectorAll('.cm-line span')].find(
		(node) => node.textContent === text
	);
	if (!span) throw new Error(`no span with text ${text}`);
	return getComputedStyle(span).color;
};

describe('codeEditorTheme', () => {
	it.each([
		['const', '--color-code-keyword'],
		['"forty-two"', '--color-code-string'],
		['// note', '--color-code-comment']
	])('paints %s with %s', (text, variable) => {
		const root = mount();
		const expected = resolveColor(root, variable);
		expect(expected).not.toBe('');
		expect(colorOfText(root, text)).toBe(expected);
		expect(expected).not.toBe(getComputedStyle(root).color);
	});

	it('paints the gutter with the line number token', () => {
		const root = mount();
		const gutterNumber = root.querySelector(
			'.cm-lineNumbers .cm-gutterElement:not([style*="visibility"])'
		);
		expect(gutterNumber).not.toBeNull();
		expect(getComputedStyle(gutterNumber!).color).toBe(
			resolveColor(root, '--color-code-line-number')
		);
	});

	it('paints the error border only while the content is aria-invalid', () => {
		const validBorder = getComputedStyle(mount()).borderTopColor;
		host?.remove();
		host = document.createElement('div');
		document.body.append(host);
		const view = new EditorView({
			doc: SOURCE,
			extensions: [codeEditorTheme, EditorView.contentAttributes.of({ 'aria-invalid': 'true' })],
			parent: host
		});

		const invalidBorder = getComputedStyle(view.dom).borderTopColor;

		expect(invalidBorder).toBe(resolveColor(view.dom, '--color-danger-dark'));
		expect(invalidBorder).not.toBe(validBorder);
	});

	it('dims a disabled editor and paints the placeholder with the subtle token', () => {
		host = document.createElement('div');
		document.body.append(host);
		const view = new EditorView({
			doc: '',
			extensions: [
				codeEditorTheme,
				placeholder('Empty'),
				EditorView.contentAttributes.of({ 'aria-disabled': 'true' })
			],
			parent: host
		});
		const placeholderNode = view.dom.querySelector('.cm-placeholder');
		if (!placeholderNode) throw new Error('no placeholder');

		expect(getComputedStyle(view.dom).color).toBe(resolveColor(view.dom, '--color-disabled-dark'));
		expect(getComputedStyle(placeholderNode).color).toBe(
			resolveColor(view.dom, '--color-subtle-2')
		);
	});

	it('keeps a visible focus outline', async () => {
		const root = mount();
		root.querySelector<HTMLElement>('.cm-content')!.focus();
		await vi.waitFor(() => expect(root.classList).toContain('cm-focused'));
		const style = getComputedStyle(root);
		expect(style.outlineStyle).toBe('solid');
		expect(style.outlineColor).toBe(resolveColor(root, '--color-link'));
	});

	it('flips the keyword color under a dark ancestor', () => {
		const light = colorOfText(mount(), 'const');
		host?.remove();
		const root = mount('dark');
		const dark = colorOfText(root, 'const');
		expect(dark).toBe(resolveColor(root, '--dark-color-code-keyword'));
		expect(dark).not.toBe(light);
	});

	it('paints the original side of a split diff as removed and the changed side as added', () => {
		host = document.createElement('div');
		document.body.append(host);
		const extensions = [javascript(), codeEditorTheme];
		const view = new MergeView({
			a: { doc: 'let value = 1;\n', extensions },
			b: { doc: 'let value = 2;\n', extensions },
			parent: host
		});
		const backgroundOf = (side: EditorView) =>
			getComputedStyle(side.dom.querySelector('.cm-changedLine')!).backgroundColor;

		expect(backgroundOf(view.a)).toBe(resolveColor(host, '--color-danger-light'));
		expect(backgroundOf(view.b)).toBe(resolveColor(host, '--color-success-light'));
		expect(getComputedStyle(view.a.dom.querySelector('.cm-changedText')!).textDecorationLine).toBe(
			'line-through'
		);
		expect(getComputedStyle(view.b.dom.querySelector('.cm-changedText')!).textDecorationLine).toBe(
			'underline'
		);
		view.destroy();
	});

	it('marks unified diff text with a decoration as well as a color', () => {
		host = document.createElement('div');
		document.body.append(host);
		const view = new EditorView({
			doc: 'let value = 2;\n',
			extensions: [
				javascript(),
				codeEditorTheme,
				unifiedMergeView({ original: 'let value = 1;\n', mergeControls: false })
			],
			parent: host
		});
		const decorationOf = (selector: string) =>
			getComputedStyle(view.dom.querySelector(selector)!).textDecorationLine;

		expect(decorationOf('.cm-deletedChunk .cm-deletedText, .cm-deletedLine')).toBe('line-through');
		expect(decorationOf('.cm-changedText')).toBe('underline');
		expect(getComputedStyle(view.dom.querySelector('.cm-changedLine')!).backgroundColor).toBe(
			resolveColor(host, '--color-success-light')
		);
		view.destroy();
	});
});
