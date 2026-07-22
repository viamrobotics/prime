import Rocket from '@lucide/svelte/icons/rocket';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Icon from '../Icon.svelte';

describe('Icon', () => {
	it('renders a curated icon as an inline svg with a path', () => {
		const { container } = render(Icon, { props: { icon: 'cog' } });
		const svg = container.querySelector('svg[data-testid="icon-cog"]');
		expect(svg).toBeTruthy();
		expect(svg?.querySelectorAll('path').length).toBeGreaterThan(0);
	});

	it('applies the size token and extra classes', () => {
		const { container } = render(Icon, {
			props: { icon: 'cog', size: 'xl', class: 'text-danger-dark' }
		});
		const cls = container.querySelector('[data-testid="icon-cog"]')?.getAttribute('class') ?? '';
		expect(cls).toContain('size-6');
		expect(cls).toContain('text-danger-dark');
	});

	it('renders every layer of a multi-path icon', () => {
		const { container } = render(Icon, { props: { icon: 'viam-service' } });
		const paths = container.querySelectorAll('[data-testid="icon-viam-service"] path');
		expect(paths.length).toBe(2);
	});

	it('renders a passed-in icon component (e.g. Lucide) at the chosen size', () => {
		const { container } = render(Icon, { props: { icon: Rocket, size: 'lg' } });
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
		expect(svg?.getAttribute('class')).toContain('size-5');
	});
});
