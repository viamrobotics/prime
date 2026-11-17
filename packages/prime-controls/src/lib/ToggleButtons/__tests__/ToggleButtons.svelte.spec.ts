import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundToggleButtons from './BoundToggleButtons.svelte';

const MIN_ROW_HEIGHT_PX = 24;
const MAX_ROW_HEIGHT_PX = 28;

const option = (name: string) => page.getByRole('radio', { name, exact: true });
const owner = (container: Element) => container.querySelector('[data-testid="owner"]')!.textContent;
const rootProperty = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const resolvedFontSize = (size: string) => {
	const node = document.createElement('span');
	node.style.fontSize = size;
	document.body.append(node);
	const resolved = getComputedStyle(node).fontSize;
	node.remove();
	return resolved;
};

describe('ToggleButtons', () => {
	it('checks the option that holds the bound value', async () => {
		render(BoundToggleButtons, { props: { initial: 'world' } });

		await expect.element(option('World')).toBeChecked();
		await expect.element(option('Local')).not.toBeChecked();
	});

	it('writes the pressed option to the bound value', async () => {
		const { container } = render(BoundToggleButtons);

		await userEvent.click(option('View'));

		expect(owner(container)).toBe('view');
	});

	it('keeps the bound value when disabled', async () => {
		const { container } = render(BoundToggleButtons, { props: { disabled: true } });

		await userEvent.click(option('View'), { force: true });

		expect(owner(container)).toBe('local');
	});

	it.each([
		{ form: 'items', composed: false },
		{ form: 'composed Item parts', composed: true }
	])('renders $form between 24px and 28px tall in text-xs', async ({ composed }) => {
		render(BoundToggleButtons, { props: { composed } });

		const item = option('Local').element();
		const height = item.getBoundingClientRect().height;

		expect(height).toBeGreaterThanOrEqual(MIN_ROW_HEIGHT_PX);
		expect(height).toBeLessThanOrEqual(MAX_ROW_HEIGHT_PX);
		expect(getComputedStyle(item).fontSize).toBe(resolvedFontSize(rootProperty('--text-xs')));
	});

	it('names the group from aria-label', async () => {
		render(BoundToggleButtons);

		await expect.element(page.getByRole('group', { name: 'Space' })).toBeVisible();
	});

	it('names the group from its visible label', async () => {
		render(BoundToggleButtons, { props: { label: 'Orientation' } });

		await expect.element(page.getByRole('group', { name: 'Orientation' })).toBeVisible();
		await expect.element(page.getByText('Orientation')).toBeVisible();
	});
});

describe('ToggleButtons hint', () => {
	const HINT = 'Shown beside the label';

	it('names an info button after the label', async () => {
		render(BoundToggleButtons, { props: { label: 'Space', hint: HINT } });

		await expect.element(page.getByRole('button', { name: 'About Space' })).toBeInTheDocument();
	});

	it('describes the control by the hint while the tooltip is closed', async () => {
		render(BoundToggleButtons, { props: { label: 'Space', hint: HINT } });

		expect(page.getByRole('tooltip').query()).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Space' }))
			.toHaveAccessibleDescription(HINT);
	});

	it('shows the hint in a tooltip when the button takes focus', async () => {
		render(BoundToggleButtons, { props: { label: 'Space', hint: HINT } });

		await userEvent.tab();
		await expect.element(page.getByRole('button', { name: 'About Space' })).toHaveFocus();
		await expect.element(page.getByRole('tooltip')).toHaveTextContent(HINT);
	});

	it('renders no button and no description without a hint', async () => {
		render(BoundToggleButtons, { props: { label: 'Space' } });

		expect(page.getByRole('button', { name: 'About Space' }).query()).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Space' }))
			.not.toHaveAttribute('aria-describedby');
	});
});
