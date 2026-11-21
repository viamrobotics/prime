import {
	mdiAlertCircleOutline,
	mdiAlertOutline,
	mdiCheckCircleOutline,
	mdiInformationOutline
} from '@mdi/js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../__tests__/computed-style.ts';
import CloseBanner from './CloseBanner.svelte';
import DetailsBanner from './DetailsBanner.svelte';
import IconBanner from './IconBanner.svelte';
import ProgressBanner from './ProgressBanner.svelte';
import StackedBanner from './StackedBanner.svelte';
import VariantBanner from './VariantBanner.svelte';

const banner = (container: Element) => container.querySelector<HTMLElement>('.banner')!;
const chip = (container: Element) => container.querySelector<HTMLElement>('.banner-chip')!;
const glyphPath = (container: Element) =>
	chip(container).querySelector('svg path')?.getAttribute('d');

const FLEX_START = /^(flex|flow)-start$/;

const emulateReducedMotion = (value: 'reduce' | 'no-preference') =>
	cdp().send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value }]
	});

afterEach(() => emulateReducedMotion('no-preference'));

describe('Banner', () => {
	it.each([
		{ variant: 'info', role: 'status' },
		{ variant: 'success', role: 'status' },
		{ variant: 'warning', role: 'alert' },
		{ variant: 'danger', role: 'alert' },
		{ variant: 'pending', role: 'status' }
	] as const)('has role $role for the $variant variant', ({ variant, role }) => {
		const { container } = render(VariantBanner, { props: { variant } });

		expect(banner(container).getAttribute('role')).toBe(role);
	});

	it.each([
		{ role: 'log', rendered: 'log' },
		{ role: null, rendered: null }
	] as const)('takes a role of $role over the variant default', ({ role, rendered }) => {
		const { container } = render(VariantBanner, { props: { variant: 'danger', role } });

		expect(banner(container).getAttribute('role')).toBe(rendered);
	});

	it.each([
		{ variant: 'info', background: 'bg-info-light', text: 'text-info-dark' },
		{ variant: 'success', background: 'bg-success-light', text: 'text-success-dark' },
		{ variant: 'warning', background: 'bg-warning-light', text: 'text-warning-text' },
		{ variant: 'danger', background: 'bg-danger-light', text: 'text-danger-dark' },
		{ variant: 'pending', background: 'bg-pending-light', text: 'text-pending-dark' }
	] as const)(
		'colors the $variant chip from the variant tokens',
		({ variant, background, text }) => {
			const { container } = render(VariantBanner, { props: { variant } });

			expect(backgroundColor(chip(container))).toBe(colorOf(background, 'backgroundColor'));
			expect(textColor(chip(container))).toBe(colorOf(text, 'color'));
		}
	);

	it('defaults to the info variant', () => {
		const { container } = render(VariantBanner);

		expect(banner(container).getAttribute('role')).toBe('status');
		expect(backgroundColor(chip(container))).toBe(colorOf('bg-info-light', 'backgroundColor'));
	});

	it('is a compact one-liner without a title', () => {
		const { container } = render(VariantBanner);

		const style = getComputedStyle(banner(container));
		expect(style.minHeight).toBe('40px');
		expect(style.alignItems).toBe('center');
		expect(getComputedStyle(chip(container)).height).toBe('28px');
	});

	it('stacks when a title is present', () => {
		const { container } = render(StackedBanner);

		expect(
			getComputedStyle(banner(container)).alignItems,
			'Chromium 158 serializes flex-start as its newer alias flow-start'
		).toMatch(FLEX_START);
		expect(getComputedStyle(chip(container)).height).toBe('32px');
	});

	it.each([
		{ variant: 'info', glyph: mdiInformationOutline },
		{ variant: 'success', glyph: mdiCheckCircleOutline },
		{ variant: 'warning', glyph: mdiAlertOutline },
		{ variant: 'danger', glyph: mdiAlertCircleOutline }
	] as const)('draws the $variant glyph in a single chip', ({ variant, glyph }) => {
		const { container } = render(VariantBanner, { props: { variant } });

		expect(container.querySelectorAll('.banner-chip')).toHaveLength(1);
		expect(glyphPath(container)).toBe(glyph);
	});

	it('spins in the chip for the pending variant', () => {
		const { container } = render(VariantBanner, { props: { variant: 'pending' } });

		expect(container.querySelector('.banner-chip .progress-dots')).toBeTruthy();
		expect(container.querySelector('.banner-chip svg')).toBeNull();
	});

	it.each([
		{ preference: 'no-preference', animationName: 'progress-dots' },
		{ preference: 'reduce', animationName: 'none' }
	] as const)(
		'animates the pending spinner as $animationName under prefers-reduced-motion: $preference',
		async ({ preference, animationName }) => {
			await emulateReducedMotion(preference);
			const { container } = render(VariantBanner, { props: { variant: 'pending' } });

			const spinner = container.querySelector<HTMLElement>('.banner-chip .progress-dots')!;

			expect(getComputedStyle(spinner, '::before').animationName).toBe(animationName);
		}
	);

	it('replaces the default glyph with Banner.Icon', () => {
		const { container } = render(IconBanner);

		expect(container.querySelectorAll('.banner-chip')).toHaveLength(1);
		expect(chip(container).querySelector('[data-testid="custom-glyph"]')).toBeTruthy();
		expect(chip(container).querySelector('svg')).toBeNull();
	});

	it('restores the default glyph when Banner.Icon unmounts', async () => {
		const { container, rerender } = render(IconBanner);

		await rerender({ showIcon: false });

		expect(container.querySelectorAll('.banner-chip')).toHaveLength(1);
		expect(glyphPath(container)).toBe(mdiInformationOutline);
	});

	it.each([
		{ label: undefined, name: 'Dismiss' },
		{ label: 'Close notice', name: 'Close notice' }
	])('labels Banner.Close $name', ({ label, name }) => {
		const { container } = render(CloseBanner, { props: { label } });

		expect(container.querySelector('button')!.getAttribute('aria-label')).toBe(name);
	});

	it('fires the native onclick of Banner.Close', async () => {
		const onclick = vi.fn();
		const { container } = render(CloseBanner, { props: { onclick } });

		await userEvent.click(container.querySelector<HTMLButtonElement>('button')!);

		expect(onclick).toHaveBeenCalledOnce();
	});

	it('opens Banner.Details on click', async () => {
		const { container } = render(DetailsBanner);
		const trigger = container.querySelector<HTMLButtonElement>('[aria-expanded]')!;

		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(trigger.textContent).toContain('Details');
		expect(container.textContent).not.toContain('Stack trace');

		await userEvent.click(trigger);

		await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'));
		expect(container.textContent).toContain('Stack trace');
	});

	it('drops the side and top borders for the block placement', () => {
		const { container } = render(VariantBanner, { props: { placement: 'block' } });

		const style = getComputedStyle(banner(container));
		expect(style.borderLeftWidth).toBe('0px');
		expect(style.borderRightWidth).toBe('0px');
		expect(style.borderTopWidth).toBe('0px');
		expect(style.borderBottomWidth).toBe('1px');
	});

	it('keeps all four borders inline', () => {
		const { container } = render(VariantBanner);

		const style = getComputedStyle(banner(container));
		expect(style.borderLeftWidth).toBe('1px');
		expect(style.borderRightWidth).toBe('1px');
		expect(style.borderTopWidth).toBe('1px');
		expect(style.borderBottomWidth).toBe('1px');
	});

	it('pins Banner.Progress to the bottom edge', () => {
		const { container } = render(ProgressBanner);
		const bar = container.querySelector<HTMLElement>('[role="progressbar"]')!;

		const style = getComputedStyle(bar);
		expect(style.position).toBe('absolute');
		expect(style.bottom).toBe('0px');
	});
});
