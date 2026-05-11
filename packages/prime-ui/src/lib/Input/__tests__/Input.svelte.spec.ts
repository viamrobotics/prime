import { cleanup, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import Input from '../Input.svelte';

describe('Input', () => {
	afterEach(cleanup);

	it('renders an accessible input element', () => {
		render(Input, { props: { 'aria-label': 'name' } });
		expect(screen.getByRole('textbox', { name: 'name' })).toBeVisible();
	});

	it('forwards rest props to the underlying input', () => {
		render(Input, {
			props: {
				'aria-label': 'email',
				type: 'email',
				placeholder: 'you@example.com',
				value: 'foo@bar.com'
			}
		});

		const input = screen.getByRole('textbox', { name: 'email' });
		expect(input).toHaveAttribute('type', 'email');
		expect(input).toHaveAttribute('placeholder', 'you@example.com');
		expect(input).toHaveValue('foo@bar.com');
	});

	it('forwards the readonly attribute', () => {
		render(Input, { props: { 'aria-label': 'name', readonly: true } });
		expect(screen.getByRole('textbox', { name: 'name' })).toHaveAttribute('readonly');
	});

	it('sets aria-disabled when disabled', () => {
		render(Input, { props: { 'aria-label': 'name', disabled: true } });
		expect(screen.getByRole('textbox', { name: 'name' })).toHaveAttribute('aria-disabled', 'true');
	});

	it('does not set aria-disabled when not disabled', () => {
		render(Input, { props: { 'aria-label': 'name' } });
		expect(screen.getByRole('textbox', { name: 'name' })).not.toHaveAttribute('aria-disabled');
	});

	it('sets aria-invalid when state is error', () => {
		render(Input, { props: { 'aria-label': 'name', state: 'error' } });
		expect(screen.getByRole('textbox', { name: 'name' })).toHaveAttribute('aria-invalid', 'true');
	});

	it.each(['none', 'info', 'warn'] as const)(
		'does not set aria-invalid when state is %s',
		(state) => {
			render(Input, { props: { 'aria-label': 'name', state } });
			expect(screen.getByRole('textbox', { name: 'name' })).not.toHaveAttribute('aria-invalid');
		}
	);
});
