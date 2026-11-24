import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import '../../../../test/tailwind.css';
import PanelWithChild from './fixtures/PanelWithChild.svelte';

const group = (container: Element) => container.querySelector('[role="group"]')!;

function probeRadius(className: string) {
	const probe = document.createElement('span');
	probe.className = className;
	document.body.append(probe);
	const value = getComputedStyle(probe).borderTopLeftRadius;
	probe.remove();
	return value;
}

describe('Panel', () => {
	it('names the group from the title', async () => {
		render(PanelWithChild, { props: { title: 'Camera' } });

		await expect.element(page.getByRole('group', { name: 'Camera', exact: true })).toBeVisible();
	});

	it('points aria-labelledby at the visible title and sets no aria-label', () => {
		const { container } = render(PanelWithChild, { props: { title: 'Camera' } });

		const titleElement = document.getElementById(group(container).getAttribute('aria-labelledby')!);

		expect(titleElement?.textContent).toBe('Camera');
		expect(group(container).hasAttribute('aria-label'), 'aria-label is absent').toBe(false);
	});

	it('names the group from aria-label without a title', async () => {
		render(PanelWithChild, { props: { 'aria-label': 'Camera settings' } });

		await expect
			.element(page.getByRole('group', { name: 'Camera settings', exact: true }))
			.toBeVisible();
	});

	it('names the group from aria-labelledby without a title', async () => {
		render(PanelWithChild, { props: { 'aria-labelledby': 'outer-name' } });

		await expect
			.element(page.getByRole('group', { name: 'Outside name', exact: true }))
			.toBeVisible();
	});

	it('renders no title element without a title', () => {
		const { container } = render(PanelWithChild, { props: { 'aria-label': 'Camera settings' } });

		expect(group(container).querySelector('span:not([data-testid="child"])')).toBeNull();
		expect(group(container).hasAttribute('aria-labelledby'), 'aria-labelledby is absent').toBe(
			false
		);
	});

	it('lets the visible title name the group over aria-label and aria-labelledby', async () => {
		const { container } = render(PanelWithChild, {
			props: { title: 'Camera', 'aria-label': 'Ignored', 'aria-labelledby': 'outer-name' }
		});

		await expect.element(page.getByRole('group', { name: 'Camera', exact: true })).toBeVisible();
		expect(group(container).hasAttribute('aria-label'), 'aria-label is absent').toBe(false);
	});

	it('renders its children', async () => {
		render(PanelWithChild, { props: { title: 'Camera' } });

		await expect.element(page.getByTestId('child')).toBeVisible();
	});

	it('puts the class prop on the group root', () => {
		const { container } = render(PanelWithChild, { props: { title: 'Camera', class: 'extra' } });

		expect(group(container).classList.contains('extra'), 'root carries the class').toBe(true);
	});

	it('passes an id and a data attribute to the root', () => {
		const { container } = render(PanelWithChild, {
			props: { title: 'Camera', id: 'camera-root', 'data-extra': 'yes' }
		});

		expect(group(container)).toHaveAttribute('id', 'camera-root');
		expect(group(container)).toHaveAttribute('data-extra', 'yes');
	});

	it('rounds the corners like rounded-sm and not rounded-md', () => {
		const { container } = render(PanelWithChild, { props: { title: 'Camera' } });

		const radius = getComputedStyle(group(container)).borderTopLeftRadius;

		expect(radius).toBe(probeRadius('rounded-sm'));
		expect(radius).not.toBe(probeRadius('rounded-md'));
	});
});
