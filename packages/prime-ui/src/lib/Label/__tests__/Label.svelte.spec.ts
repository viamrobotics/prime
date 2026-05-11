import { cleanup, render, screen } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from 'vitest';

import PlainLabel from './PlainLabel.svelte';

describe('Label', () => {
	afterEach(cleanup);

	it('renders its children inside a label element', () => {
		render(PlainLabel);
		const text = screen.getByText('Email');
		expect(text).toBeVisible();
		expect(text.closest('label')).not.toBeNull();
		expect(screen.getByText('Email').className).not.toContain('after:content');
	});

	it('applies the required asterisk affordance when required', () => {
		render(PlainLabel, { props: { required: true } });
		expect(screen.getByText('Email').className).toContain('after:content');
	});

	it('applies disabled styling when disabled', () => {
		render(PlainLabel, { props: { disabled: true } });
		expect(screen.getByText('Email')).toHaveClass('cursor-not-allowed');
	});
});
