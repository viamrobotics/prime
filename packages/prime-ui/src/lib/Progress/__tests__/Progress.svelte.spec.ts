import type { ComponentProps } from 'svelte';

import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { backgroundColor, colorOf } from '../../../../test/computed-style.ts';
import { emulateReducedMotion } from '../../../../test/reduced-motion.ts';
import Progress from '../Progress.svelte';

const bar = (container: Element) => container.querySelector<HTMLElement>('[role="progressbar"]')!;
const fill = (container: Element) => container.querySelector<HTMLElement>('.progress-fill')!;

afterEach(() => emulateReducedMotion('no-preference'));

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

	it('fills nothing when max is 0', () => {
		const { container } = render(Progress, { props: { value: 5, max: 0, label: 'Upload' } });

		expect(fill(container).style.width).toBe('0%');
		expect(fill(container).getBoundingClientRect().width).toBe(0);
	});

	it('omits aria-valuenow when indeterminate', () => {
		const { container } = render(Progress, { props: { label: 'Connecting' } });

		expect(bar(container).getAttribute('aria-valuenow')).toBeNull();
	});

	it('slides the fill when indeterminate', () => {
		const { container } = render(Progress, { props: { label: 'Connecting' } });

		expect(getComputedStyle(fill(container)).animationName).toBe('progress-indeterminate');
	});

	it('holds the indeterminate fill still under prefers-reduced-motion', async () => {
		await emulateReducedMotion('reduce');

		const { container } = render(Progress, { props: { label: 'Connecting' } });

		expect(getComputedStyle(fill(container)).animationName).toBe('none');
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

	it.each([
		{ tone: 'progress-info', color: 'bg-info-dark' },
		{ tone: 'progress-success', color: 'bg-success-dark' },
		{ tone: 'progress-warning', color: 'bg-warning-dark' },
		{ tone: 'progress-danger', color: 'bg-danger-dark' }
	] as const)('paints the fill in $color under $tone', ({ tone, color }) => {
		const { container } = render(Progress, { props: { value: 10, label: 'Upload', class: tone } });

		expect(backgroundColor(fill(container))).toBe(colorOf(color, 'backgroundColor'));
	});

	it('requires a name by type', () => {
		// @ts-expect-error a Progress requires a name
		const unnamed: ComponentProps<typeof Progress> = {};
		// @ts-expect-error a Progress takes one name, not two
		const twice: ComponentProps<typeof Progress> = { label: 'Upload', 'aria-label': 'Upload' };

		expect([unnamed, twice]).toHaveLength(2);
	});

	it('applies aria-label as the name', () => {
		const { container } = render(Progress, { props: { 'aria-label': 'Sync' } });

		expect(bar(container).getAttribute('aria-label')).toBe('Sync');
	});

	it('passes aria-labelledby through', () => {
		const { container } = render(Progress, { props: { 'aria-labelledby': 'heading' } });

		expect(bar(container).getAttribute('aria-labelledby')).toBe('heading');
		expect(bar(container).hasAttribute('aria-label')).toBe(false);
	});
});
