import Rocket from '@lucide/svelte/icons/rocket';
import { mdiAlert } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../../../test/computed-style.ts';
import Icon from '../Icon.svelte';
import { ViamService } from '../icons/index.ts';
import HardcodedHiddenIcon from './fixtures/HardcodedHiddenIcon.svelte';

const svg = (container: Element) => container.querySelector('svg')!;
const width = (element: Element) => getComputedStyle(element).width;

describe('Icon', () => {
	it('renders a path string as a single path with that d', () => {
		const { container } = render(Icon, { props: { icon: mdiAlert } });

		const paths = container.querySelectorAll('svg path');
		expect(paths).toHaveLength(1);
		expect(paths[0]?.getAttribute('d')).toBe(mdiAlert);
	});

	it('sizes a component icon', () => {
		const { container } = render(Icon, { props: { icon: Rocket, size: 'lg' } });

		expect(width(svg(container))).toBe('20px');
	});

	it.each([
		{ size: undefined, expected: '16px' },
		{ size: 'xs', expected: '12px' },
		{ size: 'sm', expected: '14px' },
		{ size: 'base', expected: '16px' },
		{ size: 'lg', expected: '20px' },
		{ size: 'xl', expected: '24px' },
		{ size: '2xl', expected: '28px' },
		{ size: '3xl', expected: '32px' },
		{ size: '4xl', expected: '36px' }
	] as const)('draws size $size $expected wide', ({ size, expected }) => {
		const { container } = render(Icon, { props: { icon: mdiAlert, size } });

		expect(width(svg(container))).toBe(expected);
	});

	it('keeps the size when a class sets the color', () => {
		const { container } = render(Icon, {
			props: { icon: mdiAlert, size: 'xl', class: 'text-danger-dark' }
		});

		expect(width(svg(container))).toBe('24px');
		expect(textColor(svg(container))).toBe(colorOf('text-danger-dark', 'color'));
	});

	it.each([
		{ name: 'no name', props: {}, role: null, hidden: 'true' },
		{ name: 'an empty aria-label', props: { 'aria-label': '' }, role: null, hidden: 'true' },
		{ name: 'an aria-label', props: { 'aria-label': 'Warning' }, role: 'img', hidden: null },
		{
			name: 'an aria-labelledby',
			props: { 'aria-labelledby': 'warning-text' },
			role: 'img',
			hidden: null
		}
	])('with $name has role $role and aria-hidden $hidden', ({ props, role, hidden }) => {
		const { container } = render(Icon, { props: { icon: mdiAlert, ...props } });

		expect(svg(container).getAttribute('role')).toBe(role);
		expect(svg(container).getAttribute('aria-hidden')).toBe(hidden);
	});

	it.each([
		{ name: 'an aria-label', props: { 'aria-label': 'Warning' }, role: 'img', hidden: null },
		{ name: 'no name', props: {}, role: null, hidden: 'true' }
	])(
		'with $name a component icon that hardcodes aria-hidden has role $role and aria-hidden $hidden',
		({ props, role, hidden }) => {
			const { container } = render(Icon, { props: { icon: HardcodedHiddenIcon, ...props } });

			expect(svg(container).getAttribute('role'), 'role').toBe(role);
			expect(svg(container).getAttribute('aria-hidden'), 'aria-hidden').toBe(hidden);
		}
	);

	it('renders a Viam glyph through Icon with every layer, the size, and a label', () => {
		const { container } = render(Icon, {
			props: { icon: ViamService, size: 'xl', 'aria-label': 'Service' }
		});

		expect(svg(container).querySelectorAll('path')).toHaveLength(2);
		expect(width(svg(container))).toBe('24px');
		expect(svg(container).getAttribute('role')).toBe('img');
		expect(svg(container).getAttribute('aria-hidden')).toBeNull();
	});

	it.each([
		{ label: undefined, role: null, hidden: 'true' },
		{ label: 'Service', role: 'img', hidden: null }
	])(
		'renders a standalone Viam glyph with aria-label $label as role $role and aria-hidden $hidden',
		({ label, role, hidden }) => {
			const { container } = render(ViamService, { props: { 'aria-label': label } });

			expect(svg(container).getAttribute('viewBox')).toBe('0 0 24 24');
			expect(svg(container).getAttribute('role')).toBe(role);
			expect(svg(container).getAttribute('aria-hidden')).toBe(hidden);
		}
	);
});
