import { mdiAlert, mdiAlertCircle } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import StateIcon from '../StateIcon.svelte';
import StateIconField from './StateIconField.svelte';

describe('Field.StateIcon', () => {
	it('shows the error icon for an error field', () => {
		const { container } = render(StateIconField, { props: { state: 'error' } });
		expect(container.querySelector('svg path')?.getAttribute('d')).toBe(mdiAlertCircle);
	});

	it('renders nothing for the none state', () => {
		const { container } = render(StateIconField, { props: { state: 'none' } });
		expect(container.querySelectorAll('svg').length).toBe(0);
	});

	it('merges a passed class with the state color', () => {
		const { container } = render(StateIconField, {
			props: { state: 'error', iconClass: 'size-6' }
		});
		const classes = container.querySelector('svg')?.getAttribute('class');
		expect(classes).toContain('size-6');
		expect(classes).toContain('text-danger-dark');
	});

	it('uses its own state when standalone', () => {
		const { container } = render(StateIcon, { props: { state: 'warn' } });
		expect(container.querySelector('svg path')?.getAttribute('d')).toBe(mdiAlert);
	});
});
