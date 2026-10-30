import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { backgroundColor, colorOf } from '../../__tests__/computed-style.ts';
import Progress from '../Progress.svelte';

const bar = (container: Element) => container.querySelector<HTMLElement>('[role="progressbar"]')!;
const fill = (container: Element) => container.querySelector<HTMLElement>('.progress-fill')!;

describe('Progress', () => {
	it('is a progressbar named by label with a 0 to max range', () => {
		const { container } = render(Progress, { props: { value: 5, max: 20, label: 'Upload' } });

		expect(bar(container).getAttribute('aria-label')).toBe('Upload');
		expect(bar(container).getAttribute('aria-valuemin')).toBe('0');
		expect(bar(container).getAttribute('aria-valuemax')).toBe('20');
	});

	it('reports the value and fills the matching share of the track', () => {
		const { container } = render(Progress, { props: { value: 25, max: 50, label: 'Upload' } });

		expect(bar(container).getAttribute('aria-valuenow')).toBe('25');
		expect(fill(container).style.width).toBe('50%');
	});

	it.each([
		{ name: 'above max', value: 80, now: '50', width: '100%' },
		{ name: 'below zero', value: -10, now: '0', width: '0%' }
	])('clamps a value $name', ({ value, now, width }) => {
		const { container } = render(Progress, { props: { value, max: 50, label: 'Upload' } });

		expect(bar(container).getAttribute('aria-valuenow')).toBe(now);
		expect(fill(container).style.width).toBe(width);
	});

	it('omits aria-valuenow and slides the fill when indeterminate', () => {
		const { container } = render(Progress, { props: { label: 'Connecting' } });

		expect(bar(container).hasAttribute('aria-valuenow')).toBe(false);
		expect(getComputedStyle(fill(container)).animationName).toBe('progress-indeterminate');
	});

	it('does not animate the fill when determinate', () => {
		const { container } = render(Progress, { props: { value: 10, label: 'Upload' } });

		expect(getComputedStyle(fill(container)).animationName).toBe('none');
	});

	it('paints a 3px medium track with an info fill', () => {
		const { container } = render(Progress, { props: { value: 10, label: 'Upload' } });

		expect(backgroundColor(bar(container))).toBe(colorOf('bg-medium', 'backgroundColor'));
		expect(backgroundColor(fill(container))).toBe(colorOf('bg-info-dark', 'backgroundColor'));
		expect(getComputedStyle(bar(container)).height).toBe('3px');
	});
});
