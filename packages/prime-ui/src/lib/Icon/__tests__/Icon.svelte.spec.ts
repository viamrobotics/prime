import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Icon from '../Icon.svelte';

describe('Icon', () => {
	it('Renders an icon', () => {
		const { container } = render(Icon, { name: 'camera-outline' });
		expect(container.querySelector('svg')).toBeVisible();
	});

	it('Renders an extra small icon', () => {
		const { container } = render(Icon, { name: 'cog', size: 'xs' });
		expect(container.querySelector('svg')).toHaveClass('size-3 ');
	});

	it('Renders a small icon', () => {
		const { container } = render(Icon, { name: 'cog', size: 'sm' });
		expect(container.querySelector('svg')).toHaveClass('size-3.5 ');
	});

	it('Renders the default sized icon', () => {
		const { container } = render(Icon, { name: 'cog', size: 'base' });
		expect(container.querySelector('svg')).toHaveClass('size-4');
	});

	it('Renders a large icon', () => {
		const { container } = render(Icon, { name: 'cog', size: 'lg' });
		expect(container.querySelector('svg')).toHaveClass('size-5');
	});

	it('Renders an extra large icon', () => {
		const { container } = render(Icon, { name: 'cog', size: 'xl' });
		expect(container.querySelector('svg')).toHaveClass('size-6');
	});

	it('Renders a 2xl icon', () => {
		const { container } = render(Icon, { name: 'cog', size: '2xl' });
		expect(container.querySelector('svg')).toHaveClass('size-7');
	});

	it('Renders a 3xl icon', () => {
		const { container } = render(Icon, { name: 'cog', size: '3xl' });
		expect(container.querySelector('svg')).toHaveClass('size-8');
	});

	it('Renders a 4xl icon', () => {
		const { container } = render(Icon, { name: 'cog', size: '4xl' });
		expect(container.querySelector('svg')).toHaveClass('size-9');
	});
});
