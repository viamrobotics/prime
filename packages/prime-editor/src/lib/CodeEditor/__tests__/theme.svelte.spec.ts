import '../../../../test/tailwind.css';
import '@viamrobotics/tailwind-config/dark';

import { javascript } from '@codemirror/lang-javascript';
import { MergeView, unifiedMergeView } from '@codemirror/merge';
import {
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	lineNumbers,
	placeholder
} from '@codemirror/view';
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

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const mountWithActiveLine = (doc: string) => {
	host = document.createElement('div');
	document.body.append(host);
	const view = new EditorView({
		doc,
		extensions: [
			lineNumbers(),
			highlightActiveLine(),
			highlightActiveLineGutter(),
			placeholder('Empty'),
			codeEditorTheme
		],
		parent: host
	});
	return view.dom;
};

const backgroundOf = (root: HTMLElement, selector: string) => {
	const node = root.querySelector(selector);
	if (!node) throw new Error(`no node matches ${selector}`);
	return getComputedStyle(node).backgroundColor;
};

const resolveColor = (container: HTMLElement, variable: string) => {
	const probe = document.createElement('span');
	probe.style.color = `var(${variable})`;
	container.append(probe);
	const resolved = getComputedStyle(probe).color;
	probe.remove();
	return resolved;
};

const probeBackground = (container: HTMLElement, kind: 'success' | 'danger') => {
	const probe = document.createElement('span');
	probe.style.background = `color-mix(in srgb, var(--color-${kind}-bright) 14%, var(--color-${kind}-light))`;
	container.append(probe);
	return probe;
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

	it.each(['.cm-activeLine', '.cm-activeLineGutter'])(
		'paints the %s band on the cursor line of a document with text',
		(selector) => {
			const root = mountWithActiveLine(SOURCE);

			expect(backgroundOf(root, selector)).toBe(resolveColor(root, '--color-gray-2'));
		}
	);

	it.each(['.cm-activeLine', '.cm-activeLineGutter'])(
		'paints no %s band behind the placeholder of an empty document',
		(selector) => {
			const root = mountWithActiveLine('');

			expect(backgroundOf(root, selector)).toBe(TRANSPARENT);
		}
	);

	it('clips its square gutter and scroller to the rounded corners', () => {
		const style = getComputedStyle(mount());

		expect(Number.parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(0);
		expect(style.overflow).toBe('hidden');
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

	const signOf = (line: Element) => getComputedStyle(line, '::before').content;

	it('paints the split diff like a patch: tinted lines, darker changed words, and a sign', () => {
		host = document.createElement('div');
		document.body.append(host);
		const extensions = [javascript(), codeEditorTheme];
		const view = new MergeView({
			a: { doc: 'let value = 1;\n', extensions },
			b: { doc: 'let value = 2;\n', extensions },
			parent: host
		});

		expect(backgroundOf(view.a.dom, '.cm-changedLine')).toBe(
			resolveColor(host, '--color-danger-light')
		);
		expect(backgroundOf(view.b.dom, '.cm-changedLine')).toBe(
			resolveColor(host, '--color-success-light')
		);
		expect(getComputedStyle(view.a.dom.querySelector('.cm-changedText')!).background).toBe(
			getComputedStyle(probeBackground(host, 'danger')).background
		);
		expect(getComputedStyle(view.b.dom.querySelector('.cm-changedText')!).background).toBe(
			getComputedStyle(probeBackground(host, 'success')).background
		);
		expect(signOf(view.a.dom.querySelector('.cm-changedLine')!)).toBe('"-"');
		expect(signOf(view.b.dom.querySelector('.cm-changedLine')!)).toBe('"+"');
		expect(signOf(view.b.dom.querySelector('.cm-line:not(.cm-changedLine)')!)).toBe('none');
		view.destroy();
	});

	it('paints the unified diff the same way, with no strike or underline on the text', () => {
		host = document.createElement('div');
		document.body.append(host);
		const view = new EditorView({
			doc: 'let value = 2;\nkeep\n',
			extensions: [
				javascript(),
				codeEditorTheme,
				unifiedMergeView({ original: 'let value = 1;\nkeep\n', mergeControls: false })
			],
			parent: host
		});
		const deletedText = view.dom.querySelector('.cm-deletedChunk .cm-deletedText')!;
		const changedText = view.dom.querySelector('.cm-changedText')!;

		expect(backgroundOf(view.dom, '.cm-changedLine')).toBe(
			resolveColor(host, '--color-success-light')
		);
		expect(backgroundOf(view.dom, '.cm-deletedChunk')).toBe(
			resolveColor(host, '--color-danger-light')
		);
		expect(getComputedStyle(deletedText).background).toBe(
			getComputedStyle(probeBackground(host, 'danger')).background
		);
		expect(getComputedStyle(changedText).background).toBe(
			getComputedStyle(probeBackground(host, 'success')).background
		);
		expect(getComputedStyle(deletedText).textDecorationLine).toBe('none');
		expect(getComputedStyle(changedText).textDecorationLine).toBe('none');
		expect(signOf(view.dom.querySelector('.cm-changedLine')!)).toBe('"+"');
		expect(signOf(view.dom.querySelector('.cm-deletedChunk .cm-deletedLine')!)).toBe('"-"');
		view.destroy();
	});
});
