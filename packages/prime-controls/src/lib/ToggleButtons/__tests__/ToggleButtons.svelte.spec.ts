import type { ComponentProps } from 'svelte';

import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import { ToggleButtons } from '../toggle-buttons.ts';
import BoundToggleButtons from './fixtures/BoundToggleButtons.svelte';

function probeStyle(className: string, read: (style: CSSStyleDeclaration) => string) {
	const probe = document.createElement('span');
	probe.className = className;
	document.body.append(probe);
	const value = read(getComputedStyle(probe));
	probe.remove();
	return value;
}

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

		await expect.element(page.getByRole('radiogroup', { name: 'Space' })).toBeVisible();
	});

	it('names the group from its visible label', async () => {
		render(BoundToggleButtons, { props: { label: 'Orientation' } });

		await expect.element(page.getByRole('radiogroup', { name: 'Orientation' })).toBeVisible();
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
			.element(page.getByRole('radiogroup', { name: 'Space' }))
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
			.element(page.getByRole('radiogroup', { name: 'Space' }))
			.not.toHaveAttribute('aria-describedby');
	});
});

describe('ToggleButtons root and naming', () => {
	const items = [
		{ value: 'local', label: 'Local' },
		{ value: 'world', label: 'World' }
	];

	it('passes an id and a data attribute to the root', () => {
		const { container } = render(ToggleButtons, {
			props: { label: 'Space', items, id: 'space-root', 'data-extra': 'yes' }
		});

		const root = container.firstElementChild!;
		expect(root).toHaveAttribute('id', 'space-root');
		expect(root).toHaveAttribute('data-extra', 'yes');
	});

	it('draws the label at 12 px in the subtle-1 text color', () => {
		const { container } = render(ToggleButtons, { props: { label: 'Space', items } });

		const style = getComputedStyle(container.querySelector('span')!);

		expect(style.fontSize).toBe('12px');
		expect(style.color).toBe(probeStyle('text-subtle-1', (probe) => probe.color));
	});

	it.each<{ by: string; props: ComponentProps<typeof ToggleButtons> }>([
		{ by: 'label', props: { label: 'Speed', items } },
		{ by: 'aria-label', props: { 'aria-label': 'Speed', items } },
		{ by: 'aria-labelledby', props: { 'aria-labelledby': 'speed-name', items } }
	])('renders named by $by without a console warning', ({ props }) => {
		const warn = vi.spyOn(console, 'warn');
		onTestFinished(() => warn.mockRestore());

		render(ToggleButtons, { props });

		expect(warn).not.toHaveBeenCalled();
	});

	it('requires an accessible name', () => {
		// @ts-expect-error no label, aria-label, or aria-labelledby
		const props: ComponentProps<typeof ToggleButtons> = { items };
		expect(props).toBeDefined();
	});

	it('requires a visible label for a hint', () => {
		// @ts-expect-error hint with aria-label and no visible label
		const props: ComponentProps<typeof ToggleButtons> = {
			'aria-label': 'Speed',
			hint: 'Tip',
			items
		};
		expect(props).toBeDefined();
	});
});
