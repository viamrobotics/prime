import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../__tests__/tailwind.css';
import Label from '../Label.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
const label = (container: Element) => container.querySelector('label')!;

describe('Label', () => {
	it('renders a native <label> whose `for` points at the given id', () => {
		const { container } = render(Label, { props: { for: 'email', children: text('Email') } });

		expect(container.firstElementChild?.tagName).toBe('LABEL');
		expect(label(container).htmlFor).toBe('email');
		expect(label(container).textContent).toContain('Email');
	});

	it.each([
		{ required: undefined, indicator: undefined, suffix: '' },
		{ required: true, indicator: undefined, suffix: '*' },
		{ required: true, indicator: text('(req)'), suffix: '(req)' },
		{ required: undefined, indicator: text('(req)'), suffix: '' }
	])(
		'renders "$suffix" after the text for required=$required with a custom indicator=$indicator',
		({ required, indicator, suffix }) => {
			const { container } = render(Label, {
				props: { required, indicator, children: text('Name') }
			});

			expect(label(container).textContent?.replace('Name', '').trim()).toBe(suffix);
		}
	);

	it('hides the asterisk from the accessible name', () => {
		const { container } = render(Label, { props: { required: true, children: text('Name') } });

		expect(container.querySelector('[aria-hidden="true"]')?.textContent).toBe('*');
	});

	it('shows the not-allowed cursor when disabled', () => {
		const { container } = render(Label, { props: { disabled: true, children: text('Name') } });

		expect(getComputedStyle(label(container)).cursor).toBe('not-allowed');
	});
});
