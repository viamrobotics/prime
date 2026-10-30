import Rocket from '@lucide/svelte/icons/rocket';
import { mdiAlert } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Icon from '../Icon.svelte';
import { ViamService } from '../icons/index.ts';

const svg = (container: Element) => container.querySelector('svg')!;

describe('Icon', () => {
	it('renders a path string as a single path with that d', () => {
		const { container } = render(Icon, { props: { icon: mdiAlert } });

		const paths = container.querySelectorAll('svg path');
		expect(paths).toHaveLength(1);
		expect(paths[0]?.getAttribute('d')).toBe(mdiAlert);
	});

	it('renders a component with the size class', () => {
		const { container } = render(Icon, { props: { icon: Rocket, size: 'lg' } });

		expect(svg(container).classList.contains('size-5'), 'size class reaches the component').toBe(
			true
		);
	});

	it.each([
		{ size: undefined, expected: 'size-4' },
		{ size: 'xs', expected: 'size-3' },
		{ size: 'sm', expected: 'size-3.5' },
		{ size: 'base', expected: 'size-4' },
		{ size: 'lg', expected: 'size-5' },
		{ size: 'xl', expected: 'size-6' },
		{ size: '2xl', expected: 'size-7' },
		{ size: '3xl', expected: 'size-8' },
		{ size: '4xl', expected: 'size-9' }
	] as const)('maps size $size to $expected', ({ size, expected }) => {
		const { container } = render(Icon, { props: { icon: mdiAlert, size } });

		expect(svg(container).getAttribute('class')).toBe(expected);
	});

	it('merges a passed class with the size class', () => {
		const { container } = render(Icon, {
			props: { icon: mdiAlert, size: 'xl', class: 'text-danger-dark' }
		});

		expect(svg(container).getAttribute('class')).toBe('size-6 text-danger-dark');
	});

	it.each([
		{ label: undefined, role: null, hidden: 'true' },
		{ label: '', role: null, hidden: 'true' },
		{ label: 'Warning', role: 'img', hidden: null }
	])('with aria-label $label has role $role and aria-hidden $hidden', ({ label, role, hidden }) => {
		const { container } = render(Icon, { props: { icon: mdiAlert, 'aria-label': label } });

		expect(svg(container).getAttribute('role')).toBe(role);
		expect(svg(container).getAttribute('aria-hidden')).toBe(hidden);
	});

	it('renders a Viam glyph through Icon with every layer, the size class, and a label', () => {
		const { container } = render(Icon, {
			props: { icon: ViamService, size: 'xl', 'aria-label': 'Service' }
		});

		expect(svg(container).querySelectorAll('path')).toHaveLength(2);
		expect(svg(container).getAttribute('class')).toBe('size-6');
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
