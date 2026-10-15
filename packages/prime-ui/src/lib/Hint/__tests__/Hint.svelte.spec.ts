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
});
