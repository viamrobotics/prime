import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import { CodeEditor } from '../../index.ts';

describe('CodeEditor on the server', () => {
	it('renders the single layout as an empty outer element carrying the passed attributes', () => {
		const { body } = render(CodeEditor, {
			props: { value: '{"a": 1}', 'aria-label': 'Config', id: 'config', class: 'host' }
		});

		expect(body).toContain('<div id="config" class="host"></div>');
	});

	it('leaves the document and the editing surface to the client', () => {
		const { body } = render(CodeEditor, {
			props: { value: 'unique-document-text', 'aria-label': 'Config', id: 'config' }
		});

		expect(body).not.toContain('unique-document-text');
		expect(body).not.toContain('cm-editor');
		expect(body).not.toContain('aria-label');
	});

	it('renders no hidden original label in the single layout', () => {
		const { body } = render(CodeEditor, {
			props: { value: 'a', 'aria-labelledby': 'heading', id: 'config' }
		});

		expect(body).not.toContain('sr-only');
	});

	it('renders no hidden original label in a unified diff', () => {
		const { body } = render(CodeEditor, {
			props: { value: 'a', original: 'b', 'aria-labelledby': 'heading', id: 'config' }
		});

		expect(body).not.toContain('sr-only');
	});

	it('renders the split diff with the hidden original label after the outer element', () => {
		const { body } = render(CodeEditor, {
			props: {
				value: 'a',
				original: 'b',
				diff: 'split',
				'aria-labelledby': 'heading',
				id: 'config'
			}
		});

		expect(body).toMatch(
			/<div id="config"><\/div>.*<span id="[^"]+" class="sr-only">original<\/span>/s
		);
		expect(body).not.toContain('aria-labelledby');
	});

	it('renders no hidden original label in a split diff named by aria-label', () => {
		const { body } = render(CodeEditor, {
			props: { value: 'a', original: 'b', diff: 'split', 'aria-label': 'Config', id: 'config' }
		});

		expect(body).toContain('<div id="config"></div>');
		expect(body).not.toContain('sr-only');
	});
});
