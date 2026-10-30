import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { backgroundColor, colorOf, textColor } from '../../__tests__/computed-style.ts';
import CloseBanner from './CloseBanner.svelte';
import DetailsBanner from './DetailsBanner.svelte';
import IconBanner from './IconBanner.svelte';
import ProgressBanner from './ProgressBanner.svelte';
import StackedBanner from './StackedBanner.svelte';
import VariantBanner from './VariantBanner.svelte';

const banner = (container: Element) => container.querySelector<HTMLElement>('.banner')!;
const chip = (container: Element) => container.querySelector<HTMLElement>('.banner-chip')!;

describe('Banner', () => {
	it.each([
		{ variant: 'info', role: 'status' },
		{ variant: 'success', role: 'status' },
		{ variant: 'warning', role: 'alert' },
		{ variant: 'danger', role: 'alert' }
	] as const)('has role $role for the $variant variant', ({ variant, role }) => {
		const { container } = render(VariantBanner, { props: { variant } });

		expect(banner(container).getAttribute('role')).toBe(role);
	});

	it.each([
		{ variant: 'info', light: 'bg-info-light', dark: 'text-info-dark' },
		{ variant: 'success', light: 'bg-success-light', dark: 'text-success-dark' },
		{ variant: 'warning', light: 'bg-warning-light', dark: 'text-warning-dark' },
		{ variant: 'danger', light: 'bg-danger-light', dark: 'text-danger-dark' }
	] as const)('colors the $variant chip from the variant tokens', ({ variant, light, dark }) => {
		const { container } = render(VariantBanner, { props: { variant } });

		expect(backgroundColor(chip(container))).toBe(colorOf(light, 'backgroundColor'));
		expect(textColor(chip(container))).toBe(colorOf(dark, 'color'));
	});

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

		expect(getComputedStyle(banner(container)).alignItems).toBe('flex-start');
		expect(getComputedStyle(chip(container)).height).toBe('32px');
	});

	it('renders the default glyph in a single chip', () => {
		const { container } = render(VariantBanner);

		expect(container.querySelectorAll('.banner-chip')).toHaveLength(1);
		expect(chip(container).querySelector('svg')).toBeTruthy();
	});

	it('replaces the default glyph with Banner.Icon', () => {
		const { container } = render(IconBanner);

		expect(container.querySelectorAll('.banner-chip')).toHaveLength(1);
		expect(chip(container).querySelector('[data-testid="custom-glyph"]')).toBeTruthy();
		expect(chip(container).querySelector('svg')).toBeNull();
	});

	it('fires the native onclick of Banner.Close, labelled Dismiss', async () => {
		const onclick = vi.fn();
		const { container } = render(CloseBanner, { props: { onclick } });
		const close = container.querySelector<HTMLButtonElement>('button')!;

		expect(close.getAttribute('aria-label')).toBe('Dismiss');
		await userEvent.click(close);

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

	it('drops the side borders for the site placement', () => {
		const { container } = render(VariantBanner, { props: { placement: 'site' } });

		const style = getComputedStyle(banner(container));
		expect(style.borderLeftWidth).toBe('0px');
		expect(style.borderRightWidth).toBe('0px');
		expect(style.borderBottomWidth).toBe('1px');
	});

	it('keeps all four borders inline', () => {
		const { container } = render(VariantBanner);

		expect(getComputedStyle(banner(container)).borderLeftWidth).toBe('1px');
	});

	it('pins Banner.Progress to the bottom edge', () => {
		const { container } = render(ProgressBanner);
		const bar = container.querySelector<HTMLElement>('[role="progressbar"]')!;

		const style = getComputedStyle(bar);
		expect(style.position).toBe('absolute');
		expect(style.bottom).toBe('0px');
	});
});
