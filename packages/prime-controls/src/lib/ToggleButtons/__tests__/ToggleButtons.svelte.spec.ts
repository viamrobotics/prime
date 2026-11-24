import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import BoundToggleButtons from './fixtures/BoundToggleButtons.svelte';

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
		{ form: 'items', isComposed: false },
		{ form: 'composed Item parts', isComposed: true }
	])('renders $form between 24px and 28px tall in text-xs', async ({ isComposed }) => {
		render(BoundToggleButtons, { props: { isComposed } });

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

describe('ToggleButtons parts', () => {
	it('sets item padding to 6px across and 2px down', () => {
		render(BoundToggleButtons);

		const item = getComputedStyle(option('Local').element());

		expect(item.paddingLeft).toBe('6px');
		expect(item.paddingTop).toBe('2px');
	});

	it('does not select an item whose entry is disabled', async () => {
		const { container } = render(BoundToggleButtons, { props: { isViewDisabled: true } });

		await userEvent.click(option('View'), { force: true });

		expect(owner(container)).toBe('local');
	});

	it('disables the radio of a disabled entry', async () => {
		render(BoundToggleButtons, { props: { isViewDisabled: true } });

		await expect.element(option('View')).toBeDisabled();
		await expect.element(option('World')).not.toBeDisabled();
	});

	it('puts the class prop on the root row', () => {
		const { container } = render(BoundToggleButtons, { props: { class: 'extra' } });

		const root = container.querySelector('.extra')!;

		expect(root.contains(option('Local').element()), 'the class element holds the buttons').toBe(
			true
		);
	});

	it('lays the label and the buttons out in one row with an 8px gap', () => {
		render(BoundToggleButtons, { props: { label: 'Orientation' } });

		const row = getComputedStyle(page.getByText('Orientation').element().parentElement!);

		expect(row.display).toBe('flex');
		expect(row.columnGap).toBe('8px');
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

	it('disables the hint button when the group is disabled', async () => {
		render(BoundToggleButtons, { props: { label: 'Space', hint: HINT, disabled: true } });

		await expect.element(page.getByRole('button', { name: 'About Space' })).toBeDisabled();
	});

	it('renders no button and no description without a hint', async () => {
		render(BoundToggleButtons, { props: { label: 'Space' } });

		expect(page.getByRole('button', { name: 'About Space' }).query()).toBeNull();
		await expect
			.element(page.getByRole('group', { name: 'Space' }))
			.not.toHaveAttribute('aria-describedby');
	});
});
