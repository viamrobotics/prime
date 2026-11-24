import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../../../test/computed-style.ts';
import Hint from '../Hint.svelte';

const text = (value: string) => createRawSnippet(() => ({ render: () => `<span>${value}</span>` }));
const hint = (container: Element) => container.querySelector('p')!;

describe('Hint', () => {
	it('renders its content in a <p> carrying the given id', () => {
		const { container } = render(Hint, {
			props: { id: 'email-hint', children: text('We never share it') }
		});

		expect(hint(container).id).toBe('email-hint');
		expect(hint(container).textContent).toContain('We never share it');
	});

	it.each([
		{ state: 'error', color: 'text-danger-dark' },
		{ state: 'warn', color: 'text-warning-text' },
		{ state: 'info', color: 'text-info-dark' },
		{ state: 'none', color: 'text-subtle-1' }
	] as const)('colors the text $color for the $state state', ({ state, color }) => {
		const { container } = render(Hint, { props: { state, children: text('hint') } });

		expect(textColor(hint(container))).toBe(colorOf(color, 'color'));
	});

	it('dims the text over the state color when disabled', () => {
		document.documentElement.classList.add('dark');
		try {
			const { container } = render(Hint, {
				props: { disabled: true, state: 'error', children: text('hint') }
			});

			expect(textColor(hint(container))).toBe(colorOf('text-disabled-dark', 'color'));
			expect(textColor(hint(container))).not.toBe(colorOf('text-disabled', 'color'));
		} finally {
			document.documentElement.classList.remove('dark');
		}
	});
});
