import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import {
	backgroundColor,
	borderColor,
	colorOf,
	textColor
} from '../../__tests__/computed-style.ts';
import StatusDot from '../StatusDot.svelte';

const dot = (container: Element) => container.querySelector<HTMLElement>('[role="img"]')!;

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const DOT_SIZE = '8px';

describe('StatusDot', () => {
	it.each([
		{ state: 'info', fill: 'bg-info-dark' },
		{ state: 'warning', fill: 'bg-warning-bright' },
		{ state: 'success', fill: 'bg-success-bright' },
		{ state: 'danger', fill: 'bg-danger-dark' },
		{ state: 'disabled', fill: 'bg-disabled-dark' }
	] as const)('fills the solid $state dot with its token', ({ state, fill }) => {
		const { container } = render(StatusDot, { props: { state, label: 'Status' } });

		expect(backgroundColor(dot(container))).toBe(colorOf(fill, 'backgroundColor'));
	});

	it.each([
		{ state: 'warning', ring: 'border-warning-bright' },
		{ state: 'danger', ring: 'border-danger-dark' }
	] as const)('rings the hollow $state dot with no fill', ({ state, ring }) => {
		const { container } = render(StatusDot, {
			props: { state, variant: 'hollow', label: 'Status' }
		});

		expect(backgroundColor(dot(container))).toBe(TRANSPARENT);
		expect(borderColor(dot(container))).toBe(colorOf(ring, 'borderTopColor'));
	});

	it('fills a dot with no state gray', () => {
		const { container } = render(StatusDot, { props: { label: 'Status' } });

		expect(backgroundColor(dot(container))).toBe(colorOf('bg-gray-6', 'backgroundColor'));
	});

	it('rings a hollow dot with no state gray and no fill', () => {
		const { container } = render(StatusDot, { props: { variant: 'hollow', label: 'Status' } });

		expect(backgroundColor(dot(container))).toBe(TRANSPARENT);
		expect(borderColor(dot(container))).toBe(colorOf('border-gray-6', 'borderTopColor'));
	});

	it('is an image named by label', () => {
		const { container } = render(StatusDot, { props: { state: 'success', label: 'Online' } });

		expect(dot(container).getAttribute('aria-label')).toBe('Online');
	});

	it.each([
		{ state: 'info', text: 'text-info-dark' },
		{ state: 'danger', text: 'text-danger-dark' }
	] as const)(
		'shows the $state glyph in its color on the 8px box when working',
		({ state, text }) => {
			const { container } = render(StatusDot, {
				props: { state, working: true, label: 'Syncing' }
			});
			const dotStyle = getComputedStyle(dot(container));
			const glyph = container.querySelector<HTMLElement>('.progress-dots')!;
			const content = getComputedStyle(glyph, '::before').content;

			expect(textColor(glyph)).toBe(colorOf(text, 'color'));
			expect(content).not.toBe('none');
			expect(content).not.toBe('""');
			expect(dotStyle.width).toBe(DOT_SIZE);
			expect(dotStyle.height).toBe(DOT_SIZE);
			expect(backgroundColor(dot(container))).toBe(TRANSPARENT);
		}
	);

	it('renders no glyph when not working', () => {
		const { container } = render(StatusDot, { props: { state: 'info', label: 'Status' } });

		expect(container.querySelector('.progress-dots')).toBeNull();
	});

	it('puts class on the root', () => {
		const { container } = render(StatusDot, {
			props: { state: 'info', label: 'Status', class: 'mine' }
		});

		expect(dot(container).classList.contains('mine')).toBe(true);
	});
});
