import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import { colorOf, shapeOf } from '../../../../test/computed-style.ts';
import BasicContextMenu from './fixtures/BasicContextMenu.svelte';
import BasicMenu from './fixtures/BasicMenu.svelte';
import BasicMenubar from './fixtures/BasicMenubar.svelte';
import StructuredMenu from './fixtures/StructuredMenu.svelte';

const menus = () => [...document.querySelectorAll<HTMLElement>('[role="menu"]')];
const buttonLabeled = (container: Element, label: string) =>
	[...container.querySelectorAll('button')].find((button) => button.textContent?.trim() === label)!;
const panelControlledBy = (trigger: Element) =>
	vi.waitFor(() => {
		const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
		expect(panel?.getAttribute('role')).toBe('menu');
		return panel!;
	});

const openMenu = async () => {
	const { container } = render(BasicMenu);
	const trigger = buttonLabeled(container, 'Open');
	await userEvent.click(trigger);
	return panelControlledBy(trigger);
};

const openSubmenu = async () => {
	const { container } = render(StructuredMenu);
	await userEvent.click(buttonLabeled(container, 'Open'));
	const subTrigger = await vi.waitFor(
		() => document.querySelector<HTMLElement>('[aria-haspopup="menu"]:not(button)')!
	);
	await userEvent.click(subTrigger);
	return panelControlledBy(subTrigger);
};

const openContextMenu = async () => {
	const { container } = render(BasicContextMenu);
	const area = container.querySelector('[data-testid="area"]')!;
	area.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
	return vi.waitFor(() => {
		expect(menus()).toHaveLength(1);
		return menus()[0]!;
	});
};

const openMenubarMenu = async () => {
	const { container } = render(BasicMenubar);
	const trigger = buttonLabeled(container, 'Edit');
	await userEvent.click(trigger);
	return panelControlledBy(trigger);
};

const frameOf = (panel: Element) => {
	const style = getComputedStyle(panel);
	return {
		backgroundColor: style.backgroundColor,
		borderTopColor: style.borderTopColor,
		borderTopLeftRadius: style.borderTopLeftRadius,
		borderTopWidth: style.borderTopWidth,
		boxShadow: style.boxShadow
	};
};

const popoverFrame = () => ({
	backgroundColor: colorOf('bg-white', 'backgroundColor'),
	borderTopColor: colorOf('border-light', 'borderTopColor'),
	borderTopLeftRadius: shapeOf('rounded-sm', 'borderTopLeftRadius'),
	borderTopWidth: '1px',
	boxShadow: shapeOf('shadow-popover', 'boxShadow')
});

afterEach(async () => {
	if (menus().length > 0) await userEvent.keyboard('{Escape}');
	await vi.waitFor(() => expect(menus()).toHaveLength(0));
});

describe('Menu panels', () => {
	it.each([
		{ part: 'Menu.Content', open: openMenu },
		{ part: 'Menu.SubContent', open: openSubmenu },
		{ part: 'ContextMenu.Content', open: openContextMenu },
		{ part: 'Menubar.Content', open: openMenubarMenu }
	])('$part paints the popover frame with the popover shadow', async ({ open }) => {
		const panel = await open();

		expect(frameOf(panel)).toStrictEqual(popoverFrame());
	});
});
