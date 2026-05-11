import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import InputWithIcon from './InputWithIcon.svelte';

describe('InputIcon', () => {
	it('renders nothing when state is none', () => {
		const { container } = render(InputWithIcon);
		expect(container.querySelector('svg')).toBeNull();
	});

	it.each([
		{ state: 'info', expectedClass: 'text-info-dark' },
		{ state: 'warn', expectedClass: 'text-warning-bright' },
		{ state: 'error', expectedClass: 'text-danger-dark' }
	] as const)('renders a $state-colored icon when state is $state', ({ state, expectedClass }) => {
		const { container } = render(InputWithIcon, { props: { state } });
		const svg = container.querySelector('svg');
		expect(svg).toBeVisible();
		expect(svg).toHaveClass(expectedClass);
	});
});
