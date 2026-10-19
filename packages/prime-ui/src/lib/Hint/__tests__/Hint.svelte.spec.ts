import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Hint from '../Hint.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));

describe('Hint', () => {
	it('renders its content', () => {
		const { container } = render(Hint, { props: { children: text('We never share it') } });
		expect(container.textContent).toContain('We never share it');
	});

	it('forwards an id so it can be referenced via aria-describedby', () => {
		const { container } = render(Hint, {
			props: { id: 'email-hint', children: text('hint') }
		});
		expect(container.querySelector('#email-hint')).toBeTruthy();
	});

	it.each([
		{ state: 'error', color: 'text-danger-dark' },
		{ state: 'warn', color: 'text-warning-dark' },
		{ state: 'info', color: 'text-info-dark' },
		{ state: 'none', color: 'text-subtle-1' }
	] as const)('colors the text $color for the $state state', ({ state, color }) => {
		const { container } = render(Hint, { props: { state, children: text('hint') } });
		expect(container.querySelector('p')?.getAttribute('class')).toContain(color);
	});

	it('dims the text over the error color when disabled', () => {
		const { container } = render(Hint, {
			props: { disabled: true, state: 'error', children: text('hint') }
		});
		const classes = container.querySelector('p')?.getAttribute('class');
		expect(classes).toContain('text-disabled');
		expect(classes).not.toContain('text-danger-dark');
	});
});
