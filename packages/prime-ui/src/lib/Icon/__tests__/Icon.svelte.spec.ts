import Rocket from '@lucide/svelte/icons/rocket';
import { mdiAlert } from '@mdi/js';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import * as glyphs from '../../icons/index.ts';
import { ViamService } from '../../icons/index.ts';
import Icon from '../Icon.svelte';

const ALERT_PATH = mdiAlert;

describe('Icon', () => {
	it('renders a path string as a single path with that d', () => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH } });

		const paths = container.querySelectorAll('svg path');

		expect(paths.length).toBe(1);
		expect(paths[0]?.getAttribute('d')).toBe(ALERT_PATH);
	});

	it('renders a component with the size class', () => {
		const { container } = render(Icon, { props: { icon: Rocket, size: 'lg' } });

		expect(container.querySelector('svg')?.getAttribute('class')).toContain('size-5');
	});

	it.each([
		{ size: 'xs', expected: 'size-3' },
		{ size: 'sm', expected: 'size-3.5' },
		{ size: 'base', expected: 'size-4' },
		{ size: 'lg', expected: 'size-5' },
		{ size: 'xl', expected: 'size-6' },
		{ size: '2xl', expected: 'size-7' },
		{ size: '3xl', expected: 'size-8' },
		{ size: '4xl', expected: 'size-9' }
	] as const)('maps size $size to $expected', ({ size, expected }) => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH, size } });

		expect(container.querySelector('svg')?.getAttribute('class')).toBe(expected);
	});

	it('defaults to size-4', () => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH } });

		expect(container.querySelector('svg')?.getAttribute('class')).toBe('size-4');
	});

	it('is aria-hidden with no role by default', () => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH } });

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('aria-hidden')).toBe('true');
		expect(svg?.hasAttribute('role')).toBe(false);
	});

	it('becomes role img without aria-hidden when labelled', () => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH, 'aria-label': 'Warning' } });

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('role')).toBe('img');
		expect(svg?.getAttribute('aria-label')).toBe('Warning');
		expect(svg?.hasAttribute('aria-hidden')).toBe(false);
	});

	it('merges class with the size class', () => {
		const { container } = render(Icon, {
			props: { icon: ALERT_PATH, size: 'xl', class: 'text-danger-dark' }
		});

		expect(container.querySelector('svg')?.getAttribute('class')).toBe('size-6 text-danger-dark');
	});

	it('renders a Viam glyph through Icon with both layers and the size class', () => {
		const { container } = render(Icon, { props: { icon: ViamService, size: 'xl' } });

		const svg = container.querySelector('svg');

		expect(svg?.querySelectorAll('path').length).toBe(2);
		expect(svg?.getAttribute('class')).toBe('size-6');
		expect(svg?.getAttribute('aria-hidden')).toBe('true');
	});

	it('renders a Viam glyph standalone, decorative by default', () => {
		const { container } = render(ViamService);

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
		expect(svg?.getAttribute('aria-hidden')).toBe('true');
	});

	it('makes a standalone Viam glyph role img without aria-hidden when labelled', () => {
		const { container } = render(ViamService, { props: { 'aria-label': 'Service' } });

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('role')).toBe('img');
		expect(svg?.getAttribute('aria-label')).toBe('Service');
		expect(svg?.hasAttribute('aria-hidden')).toBe(false);
	});

	it('treats an empty aria-label as decorative', () => {
		const { container } = render(Icon, { props: { icon: ALERT_PATH, 'aria-label': '' } });

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('aria-hidden')).toBe('true');
		expect(svg?.hasAttribute('role')).toBe(false);
	});

	it('labels a Viam glyph rendered through Icon', () => {
		const { container } = render(Icon, { props: { icon: ViamService, 'aria-label': 'Service' } });

		const svg = container.querySelector('svg');

		expect(svg?.getAttribute('role')).toBe('img');
		expect(svg?.hasAttribute('aria-hidden')).toBe(false);
	});

	it('exports all 25 Viam glyphs', () => {
		expect(Object.keys(glyphs).length).toBe(25);
	});
});
