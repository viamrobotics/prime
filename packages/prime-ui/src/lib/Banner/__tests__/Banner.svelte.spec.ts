import {
	mdiAlertCircleOutline,
	mdiAlertOutline,
	mdiCheckCircleOutline,
	mdiInformationOutline
} from '@mdi/js';
import { type ComponentProps, createRawSnippet } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../../../test/computed-style.ts';
import { emulateReducedMotion } from '../../../../test/reduced-motion.ts';
import { Banner } from '../banner.ts';
import CloseBanner from './fixtures/CloseBanner.svelte';
import DetailsBanner from './fixtures/DetailsBanner.svelte';
import IconBanner from './fixtures/IconBanner.svelte';
import ProgressBanner from './fixtures/ProgressBanner.svelte';
import StackedBanner from './fixtures/StackedBanner.svelte';
import VariantBanner from './fixtures/VariantBanner.svelte';

const banner = (container: Element) => container.querySelector<HTMLElement>('.banner')!;
const chip = (container: Element) => container.querySelector<HTMLElement>('.banner-chip')!;
const glyphPath = (container: Element) =>
	chip(container).querySelector('svg path')?.getAttribute('d');

const FLEX_START = /^(flex|flow)-start$/;

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

	it.each(['info', 'success', 'warning', 'danger', 'pending'] as const)(
		'adds no text of its own for the %s variant',
		(variant) => {
			const { container } = render(VariantBanner, { props: { variant } });

			expect(banner(container).querySelector('.sr-only')).toBeNull();
			expect(chip(container).textContent?.trim()).toBe('');
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

	it('names Banner.Close by aria-label', () => {
		const { container } = render(CloseBanner, { props: { label: 'Close notice' } });

		expect(container.querySelector('button')!.getAttribute('aria-label')).toBe('Close notice');
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

	it('requires a name on an icon-only Banner.Close by type', () => {
		const children = createRawSnippet(() => ({ render: () => '<span>Cancel</span>' }));
		// @ts-expect-error an icon-only close requires a name
		const unnamed: ComponentProps<typeof Banner.Close> = {};
		// @ts-expect-error a close takes one name, not two
		const twice: ComponentProps<typeof Banner.Close> = { label: 'Close', 'aria-label': 'Close' };
		const named: ComponentProps<typeof Banner.Close> = { label: 'Close' };
		const withChildren: ComponentProps<typeof Banner.Close> = { children };

		expect([unnamed, twice, named, withChildren]).toHaveLength(4);
	});

	it('requires a name on Banner.Progress by type', () => {
		// @ts-expect-error a banner progress bar requires a name
		const unnamed: ComponentProps<typeof Banner.Progress> = {};

		expect(unnamed).toEqual({});
	});
});
