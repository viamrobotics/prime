import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Label from '../Label.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('Label', () => {
	it('renders its content in a <label> and links via `for`', () => {
		const { container } = render(Label, {
			props: { for: 'email', children: text('Email') }
		});
		const label = container.querySelector('label');
		expect(label?.getAttribute('for')).toBe('email');
		expect(label?.textContent).toContain('Email');
	});

	it('shows a required asterisk only when required', () => {
		const plain = render(Label, { props: { children: text('Name') } });
		expect(plain.container.textContent).not.toContain('*');

		const required = render(Label, { props: { required: true, children: text('Name') } });
		expect(required.container.textContent).toContain('*');
	});

	it('renders a passed indicator in place of the asterisk when required', () => {
		const { container } = render(Label, {
			props: { required: true, children: text('Name'), indicator: text('(req)') }
		});

		expect(container.textContent).toContain('(req)');
		expect(container.textContent).not.toContain('*');
	});

	it('renders no indicator when not required', () => {
		const { container } = render(Label, {
			props: { children: text('Name'), indicator: text('(req)') }
		});

		expect(container.textContent).not.toContain('(req)');
	});

	it('marks the label not-allowed when disabled', () => {
		const { container } = render(Label, {
			props: { disabled: true, children: text('Name') }
		});
		expect(container.querySelector('label')?.getAttribute('class')).toContain('cursor-not-allowed');
	});
});
