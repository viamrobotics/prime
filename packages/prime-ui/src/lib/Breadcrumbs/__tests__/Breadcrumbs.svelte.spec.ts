import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import { colorOf, textColor } from '../../__tests__/computed-style.ts';
import Trail from './Trail.svelte';

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

	it('lands class on the nav', () => {
		const { container } = render(Trail, { props: { class: 'extra' } });

		expect(container.querySelector('nav')!.classList.contains('extra')).toBe(true);
		expect(container.querySelector('ol')!.classList.contains('extra')).toBe(false);
	});

	it('lists its items as li children of an ol', () => {
		const { container } = render(Trail);

		const list = container.querySelector('nav > ol')!;
		expect(list.children).toHaveLength(5);
		expect([...list.children].every((child) => child.tagName === 'LI')).toBe(true);
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

	it('hides the separators and paints them subtle', () => {
		const { container } = render(Trail);

		const separators = container.querySelectorAll('li[role="presentation"]');
		expect(separators).toHaveLength(2);
		for (const separator of separators) {
			expect(separator.getAttribute('aria-hidden')).toBe('true');
			expect(textColor(separator)).toBe(colorOf('text-subtle-2', 'color'));
		}
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

		expect(container.querySelector('li [role="img"]')).toBeNull();
		expect(container.querySelector('li [data-custom]')!.textContent).toBe('hidden');
	});
});
