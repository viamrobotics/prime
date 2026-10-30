import { mdiAlert, mdiAlertCircle, mdiInformation } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import StateIcon from '../StateIcon.svelte';
import StateIconField from './StateIconField.svelte';

const iconPath = (container: Element) => container.querySelector('svg path')?.getAttribute('d');

describe('Field.StateIcon', () => {
	it.each([
		{ state: 'info', icon: mdiInformation, color: 'text-info-dark' },
		{ state: 'warn', icon: mdiAlert, color: 'text-warning-text' },
		{ state: 'error', icon: mdiAlertCircle, color: 'text-danger-dark' }
	] as const)('shows the $state icon in $color for a $state field', ({ state, icon, color }) => {
		const { container } = render(StateIconField, { props: { state } });

		expect(iconPath(container)).toBe(icon);
		expect(textColor(container.querySelector('svg')!)).toBe(colorOf(color, 'color'));
	});

	it('renders nothing for the none state', () => {
		const { container } = render(StateIconField, { props: { state: 'none' } });

		expect(container.querySelector('svg')).toBeNull();
	});

	it('merges a passed class with the state color', () => {
		const { container } = render(StateIconField, {
			props: { state: 'error', iconClass: 'size-6' }
		});
		const svg = container.querySelector('svg')!;

		expect(svg.classList.contains('size-6'), 'consumer class lands on the svg').toBe(true);
		expect(textColor(svg)).toBe(colorOf('text-danger-dark', 'color'));
	});

	it('uses its own state when standalone', () => {
		const { container } = render(StateIcon, { props: { state: 'warn' } });

		expect(iconPath(container)).toBe(mdiAlert);
	});
});
