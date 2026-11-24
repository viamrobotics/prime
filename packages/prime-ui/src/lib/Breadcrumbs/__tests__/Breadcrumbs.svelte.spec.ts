import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, textColor } from '../../../../test/computed-style.ts';
import Trail from './fixtures/Trail.svelte';

describe('Breadcrumbs', () => {
	it('is a navigation landmark named Breadcrumb', () => {
		const { container } = render(Trail);

		const nav = container.querySelector('nav')!;
		expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
		expect(container.querySelectorAll('nav')).toHaveLength(1);
	});

	it('names the landmark through aria-label', () => {
		const { container } = render(Trail, { props: { label: 'Trail' } });

		expect(container.querySelector('nav')!.getAttribute('aria-label')).toBe('Trail');
	});

	it('lands class on the nav and not on the list', () => {
		const { container } = render(Trail, { props: { class: 'p-4' } });

		expect(getComputedStyle(container.querySelector('nav')!).paddingTop).toBe('16px');
		expect(getComputedStyle(container.querySelector('ol')!).paddingTop).toBe('0px');
	});

	it('lists its items as li children of an ol', () => {
		const { container } = render(Trail);

		const list = container.querySelector('nav > ol')!;
		expect(list.children).toHaveLength(5);
		expect(
			[...list.children].every((child) => child.tagName === 'LI'),
			'every child of the list is an li'
		).toBe(true);
	});

	it('renders links as anchors with an href', () => {
		const { container } = render(Trail);

		const link = container.querySelector('a')!;
		expect(link.getAttribute('href')).toBe('/');
		expect(link.textContent).toBe('Home');
	});

	it('marks the current page with aria-current and does not link it', () => {
		const { container } = render(Trail);

		const page = container.querySelector('[aria-current="page"]')!;
		expect(page.textContent).toBe('my-robot');
		expect(page.tagName).not.toBe('A');
		expect(container.querySelectorAll('a')).toHaveLength(1);
	});

	it('hides the separators from assistive technology', () => {
		const { container } = render(Trail);

		const separators = [...container.querySelectorAll('li[role="presentation"]')];
		expect(separators).toHaveLength(2);
		expect(separators.map((separator) => separator.getAttribute('aria-hidden'))).toEqual([
			'true',
			'true'
		]);
	});

	it('paints the separators subtle', () => {
		const { container } = render(Trail);

		const separator = container.querySelector('li[role="presentation"]')!;
		expect(textColor(separator)).toBe(colorOf('text-subtle-2', 'color'));
	});

	it('draws a chevron in a separator without children', () => {
		const { container } = render(Trail);

		expect(container.querySelector('li[role="presentation"] svg')).not.toBeNull();
	});

	it('replaces the chevron with separator children', () => {
		const { container } = render(Trail, { props: { hasCustomSeparator: true } });

		const separator = container.querySelector('li[role="presentation"]')!;
		expect(separator.textContent!.trim()).toBe('/');
		expect(separator.querySelector('svg')).toBeNull();
	});

	it('mutes a link and darkens it on hover', async () => {
		const { container } = render(Trail);
		const link = container.querySelector('a')!;
		expect(textColor(link)).toBe(colorOf('text-subtle-1', 'color'));

		await userEvent.hover(link);

		await vi.waitFor(() => expect(textColor(link)).toBe(colorOf('text-default', 'color')));
	});

	it('wears the shared focus ring on a link', () => {
		const { container } = render(Trail);

		expect(
			container.querySelector('a')!.classList.contains('focus-ring'),
			'the link wears focus-ring'
		).toBe(true);
	});

	it('paints the current page in the default text color', () => {
		const { container } = render(Trail);

		const page = container.querySelector('[aria-current="page"]')!;
		expect(textColor(page)).toBe(colorOf('text-default', 'color'));
	});

	it('announces the ellipsis as More', () => {
		const { container } = render(Trail);

		const glyph = container.querySelector('li [role="img"]')!;
		expect(glyph.getAttribute('aria-label')).toBe('More');
		expect(glyph.textContent).toBe('…');
		expect(glyph.parentElement!.querySelector('svg')).toBeNull();
	});

	it('names the ellipsis through aria-label', () => {
		const { container } = render(Trail, { props: { ellipsisLabel: 'Show hidden pages' } });

		expect(container.querySelector('li [role="img"]')!.getAttribute('aria-label')).toBe(
			'Show hidden pages'
		);
	});

	it('replaces the glyph with children', () => {
		const { container } = render(Trail, { props: { hasEllipsisChildren: true } });

		expect(container.querySelector('li [role="img"] [role="img"]')).toBeNull();
		expect(container.querySelector('li [data-custom]')!.textContent).toBe('hidden');
	});

	it('keeps the ellipsis label when children replace the glyph', () => {
		const { container } = render(Trail, { props: { hasEllipsisChildren: true } });

		const wrapper = container.querySelector('li [data-custom]')!.parentElement!;
		expect(wrapper.getAttribute('role')).toBe('img');
		expect(wrapper.getAttribute('aria-label')).toBe('More');
	});

	it('applies a custom ellipsis label to the children', () => {
		const { container } = render(Trail, {
			props: { hasEllipsisChildren: true, ellipsisLabel: 'Show hidden pages' }
		});

		expect(
			container.querySelector('li [data-custom]')!.parentElement!.getAttribute('aria-label')
		).toBe('Show hidden pages');
	});
});
