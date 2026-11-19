import { tick } from 'svelte';
import { describe, expect, it, onTestFinished } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../__tests__/tailwind.css';
import ClosableTabs from './ClosableTabs.svelte';
import ControlledReorderTabs from './ControlledReorderTabs.svelte';
import ReorderTabs from './ReorderTabs.svelte';

const MOVE_RIGHT = '{Alt>}{Shift>}{ArrowRight}{/Shift}{/Alt}';
const MOVE_LEFT = '{Alt>}{Shift>}{ArrowLeft}{/Shift}{/Alt}';
const KEYSHORTCUTS = 'Alt+Shift+ArrowLeft Alt+Shift+ArrowRight';

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const allTabs = () => page.getByRole('tab').elements();
const announcer = () => page.getByRole('status');
const order = () => page.getByTestId('order').element().textContent;
const focusTab = (name: string) => (tab(name).element() as HTMLElement).focus();

interface Point {
	x: number;
	y: number;
}

interface Pointer {
	pointerId: number;
	pointerType: 'mouse' | 'touch';
}

const MOUSE: Pointer = { pointerId: 1, pointerType: 'mouse' };
const TOUCH: Pointer = { pointerId: 2, pointerType: 'touch' };
const TRAVEL_PX = 10;
const GHOST_OFFSET_PX = 12;
const PAST_HOLD_MS = 300;
const INSIDE_EDGE_ZONE_PX = 4;

const dispatchPointer = (type: string, target: EventTarget, point: Point, pointer = MOUSE) =>
	target.dispatchEvent(
		new PointerEvent(type, {
			bubbles: true,
			cancelable: true,
			composed: true,
			clientX: point.x,
			clientY: point.y,
			button: 0,
			buttons: type === 'pointerup' ? 0 : 1,
			isPrimary: true,
			...pointer
		})
	);

const centerOf = (element: Element): Point => {
	const rect = element.getBoundingClientRect();
	return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
};
const pastEndOf = (name: string): Point => {
	const rect = tab(name).element().getBoundingClientRect();
	return { x: rect.right + 1, y: rect.top + rect.height / 2 };
};
const beforeStartOf = (name: string): Point => {
	const rect = tab(name).element().getBoundingClientRect();
	return { x: rect.left - 1, y: rect.top + rect.height / 2 };
};

const ghost = () => document.querySelector<HTMLElement>('[data-tab-ghost]');
const chip = () => document.querySelector<HTMLElement>('[data-tab-landing]');
const strip = () =>
	[...page.getByRole('tablist').element().children]
		.filter((element) => !element.hasAttribute('hidden'))
		.map((element) => element.textContent?.trim());
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const press = (element: Element, pointer = MOUSE) => {
	const start = centerOf(element);
	dispatchPointer('pointerdown', element, start, pointer);
	return start;
};

const travel = (element: Element, start: Point, pointer = MOUSE) =>
	dispatchPointer('pointermove', element, { x: start.x + TRAVEL_PX, y: start.y }, pointer);

const closableTab = (name: string) => page.getByRole('tab', { name: new RegExp(`^${name}`) });

const lift = async (name: string, element = tab(name).element()) => {
	travel(element, press(element));
	await expect.poll(ghost).not.toBeNull();
	return element;
};

const drop = (source: Element, point: Point, pointer = MOUSE) => {
	dispatchPointer('pointermove', document.body, point, pointer);
	dispatchPointer('pointerup', document.body, point, pointer);
	source.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
};

const startsNoDrag = async (element: Element) => {
	await tick();
	expect(ghost()).toBeNull();
	expect(element.hasAttribute('hidden')).toBe(false);
};

describe('Tabs.List reorderable: Alt+Shift+Arrow on a focused tab', () => {
	it('moves the tab one place right and writes the bound order', async () => {
		render(ReorderTabs);
		focusTab('Overview');

		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(order).toBe('usage,overview,api');
		expect(allTabs().map((element) => element.textContent?.trim())).toEqual([
			'Usage',
			'Overview',
			'API'
		]);
	});

	it('moves the tab one place left and writes the bound order', async () => {
		render(ReorderTabs);
		focusTab('API reference');

		await userEvent.keyboard(MOVE_LEFT);

		await expect.poll(order).toBe('overview,api,usage');
	});

	it('keeps focus on the moved tab across repeated presses', async () => {
		render(ReorderTabs);
		focusTab('Overview');

		await userEvent.keyboard(MOVE_RIGHT);
		await expect.element(tab('Overview')).toHaveFocus();
		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(order).toBe('usage,api,overview');
		await expect.element(tab('Overview')).toHaveFocus();
	});

	it.each([
		{ name: 'Overview', keys: MOVE_RIGHT, message: 'Overview moved to position 2 of 3.' },
		{ name: 'API reference', keys: MOVE_LEFT, message: 'API reference moved to position 2 of 3.' }
	])('announces $name by its text or aria-label', async ({ name, keys, message }) => {
		render(ReorderTabs);
		focusTab(name);

		await userEvent.keyboard(keys);

		await expect.element(announcer()).toHaveTextContent(message);
	});

	it('renders the status region after the tablist, outside it', () => {
		render(ReorderTabs);

		const status = announcer().element();
		expect(status.closest('[role="tablist"]')).toBeNull();
		expect(status.previousElementSibling?.getAttribute('role')).toBe('tablist');
	});

	it('announces a repeated message again', async () => {
		render(ReorderTabs);
		focusTab('Overview');
		await userEvent.keyboard(MOVE_RIGHT);
		await expect.element(announcer()).toHaveTextContent('Overview moved to position 2 of 3.');

		await page.getByRole('button', { name: 'Reset order' }).click();
		await expect.poll(order).toBe('overview,usage,api');
		const mutations: MutationRecord[] = [];
		const observer = new MutationObserver((records) => mutations.push(...records));
		observer.observe(announcer().element(), {
			characterData: true,
			childList: true,
			subtree: true
		});
		focusTab('Overview');
		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(() => mutations.length).toBeGreaterThan(0);
		observer.disconnect();
		await expect.element(announcer()).toHaveTextContent('Overview moved to position 2 of 3.');
	});

	it.each([
		{ name: 'Overview', keys: MOVE_LEFT },
		{ name: 'API reference', keys: MOVE_RIGHT }
	])('does nothing when $name would move past the end', async ({ name, keys }) => {
		render(ReorderTabs);
		focusTab(name);

		await userEvent.keyboard(keys);

		expect(order()).toBe('overview,usage,api');
		await expect.element(tab(name)).toHaveFocus();
		expect(announcer().element().textContent).toBe('');
	});

	it.each([
		{ accept: true, expected: 'overview,api,usage', message: 'Usage moved to position 3 of 3.' },
		{ accept: false, expected: 'overview,usage,api', message: '' }
	])(
		'function binding with accept=$accept writes $expected',
		async ({ accept, expected, message }) => {
			render(ControlledReorderTabs, { props: { accept } });
			focusTab('Usage');

			await userEvent.keyboard(MOVE_RIGHT);

			await expect.poll(order).toBe(expected);
			await expect.element(tab('Usage')).toHaveFocus();
			await expect.poll(() => announcer().element().textContent).toBe(message);
		}
	);

	it('does not move a disabled tab', async () => {
		render(ReorderTabs, { props: { disabledTab: 'usage' } });
		focusTab('Usage');

		await userEvent.keyboard(MOVE_RIGHT);

		expect(order()).toBe('overview,usage,api');
		expect(announcer().element().textContent).toBe('');
	});

	it('moves a tab past a disabled one', async () => {
		render(ReorderTabs, { props: { disabledTab: 'usage' } });
		focusTab('Overview');

		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(order).toBe('usage,overview,api');
	});

	it('marks only movable tabs with aria-keyshortcuts', () => {
		render(ReorderTabs, { props: { disabledTab: 'usage' } });

		expect(allTabs().map((element) => element.getAttribute('aria-keyshortcuts'))).toEqual([
			KEYSHORTCUTS,
			null,
			KEYSHORTCUTS
		]);
	});

	it('keeps the selected tab selected and its panel mounted through a move', async () => {
		render(ReorderTabs);
		const panel = page.getByRole('tabpanel').element();
		focusTab('Overview');

		await userEvent.keyboard(MOVE_RIGHT);
		await userEvent.keyboard(MOVE_RIGHT);

		await expect.poll(order).toBe('usage,api,overview');
		await expect.element(tab('Overview')).toHaveAttribute('aria-selected', 'true');
		expect(page.getByTestId('owner').element().textContent).toBe('overview');
		expect(page.getByRole('tabpanel').element()).toBe(panel);
		expect(panel.textContent?.trim()).toBe('Overview panel');
	});
});

describe('Tabs.List reorderable: dragging a tab', () => {
	it('drops a tab forward and back and writes the bound order', async () => {
		render(ReorderTabs);

		const overview = await lift('Overview');
		drop(overview, pastEndOf('API reference'));
		await expect.poll(order).toBe('usage,api,overview');
		await expect.element(announcer()).toHaveTextContent('Overview moved to position 3 of 3.');

		await lift('Overview');
		drop(overview, beforeStartOf('Usage'));
		await expect.poll(order).toBe('overview,usage,api');
		await expect.element(announcer()).toHaveTextContent('Overview moved to position 1 of 3.');
	});

	it('lifts the tab out of the strip, follows the pointer with a ghost, and marks the landing slot', async () => {
		render(ReorderTabs);

		const usage = await lift('Usage');

		expect(usage).not.toBeVisible();
		expect(ghost()?.textContent?.trim()).toBe('Usage');
		expect(ghost()?.getAttribute('aria-hidden')).toBe('true');
		expect(chip()?.getAttribute('aria-hidden')).toBe('true');
		await expect.poll(strip).toEqual(['Overview', 'Usage', 'API']);

		const end = pastEndOf('API reference');
		dispatchPointer('pointermove', document.body, end);
		await expect.poll(strip).toEqual(['Overview', 'API', 'Usage']);
		const ghostRect = ghost()?.getBoundingClientRect();
		expect(ghostRect?.left).toBeCloseTo(end.x + GHOST_OFFSET_PX, 0);
		expect(ghostRect?.top).toBeCloseTo(end.y + GHOST_OFFSET_PX, 0);

		drop(usage, end);
		await expect.poll(order).toBe('overview,api,usage');
		expect(chip()).toBeNull();
		expect(ghost()).toBeNull();
	});

	it('swallows the click that follows a drop, and only that one', async () => {
		render(ReorderTabs);

		const usage = await lift('Usage');
		drop(usage, pastEndOf('API reference'));
		await expect.poll(order).toBe('overview,api,usage');
		expect(page.getByTestId('owner').element().textContent).toBe('overview');

		await userEvent.click(tab('Usage'));
		await expect.element(tab('Usage')).toHaveAttribute('aria-selected', 'true');
	});

	it('keeps the selected tab selected and its panel shown and mounted through a drag', async () => {
		render(ReorderTabs);
		const panel = page.getByRole('tabpanel').element();

		const overview = await lift('Overview');
		await tick();
		expect(page.getByRole('tabpanel').element()).toBe(panel);
		drop(overview, pastEndOf('API reference'));

		await expect.poll(order).toBe('usage,api,overview');
		await expect.element(tab('Overview')).toHaveAttribute('aria-selected', 'true');
		expect(page.getByTestId('owner').element().textContent).toBe('overview');
		expect(page.getByRole('tabpanel').element()).toBe(panel);
		expect(panel.textContent?.trim()).toBe('Overview panel');
	});

	it('writes nothing for a drop at the original slot', async () => {
		render(ReorderTabs);

		const usage = await lift('Usage');
		drop(usage, centerOf(chip() as HTMLElement));
		await expect.poll(ghost).toBeNull();
		await tick();

		expect(order()).toBe('overview,usage,api');
		expect(announcer().element().textContent).toBe('');
		expect(strip()).toEqual(['Overview', 'Usage', 'API']);
	});

	it.each([
		{
			accept: true,
			expected: 'usage,api,overview',
			labels: ['Usage', 'API', 'Overview'],
			message: 'Overview moved to position 3 of 3.'
		},
		{
			accept: false,
			expected: 'overview,usage,api',
			labels: ['Overview', 'Usage', 'API'],
			message: ''
		}
	])(
		'function binding with accept=$accept writes $expected on a drop',
		async ({ accept, expected, labels, message }) => {
			render(ControlledReorderTabs, { props: { accept } });

			const overview = await lift('Overview');
			drop(overview, pastEndOf('API'));

			await expect.poll(order).toBe(expected);
			await expect.poll(strip).toEqual(labels);
			await tick();
			expect(announcer().element().textContent).toBe(message);
		}
	);

	it('does not lift a disabled tab, and drops another tab past it', async () => {
		render(ReorderTabs, { props: { disabledTab: 'usage' } });
		const usage = tab('Usage').element();

		travel(usage, press(usage));
		await startsNoDrag(usage);
		dispatchPointer('pointerup', usage, centerOf(usage));

		const overview = await lift('Overview');
		drop(overview, beforeStartOf('API reference'));
		await expect.poll(order).toBe('usage,overview,api');
	});

	it('ends the drag cleanly when the lifted tab is removed, and drags again after', async () => {
		render(ReorderTabs);

		const usage = await lift('Usage');
		(page.getByRole('button', { name: 'Remove Usage' }).element() as HTMLElement).click();

		await expect.poll(ghost).toBeNull();
		expect(chip()).toBeNull();
		expect(usage.isConnected).toBe(false);
		dispatchPointer('pointerup', document.body, centerOf(tab('Overview').element()));
		expect(strip()).toEqual(['Overview', 'API']);

		const overview = await lift('Overview');
		drop(overview, pastEndOf('API reference'));
		await expect.poll(order).toBe('api,overview');
	});

	it('cancels on Escape without letting the key reach the page', async () => {
		render(ReorderTabs);
		const keys: string[] = [];
		const controller = new AbortController();
		onTestFinished(() => controller.abort());
		document.addEventListener('keydown', (event) => keys.push(event.key), {
			signal: controller.signal
		});

		const overview = await lift('Overview');
		const end = pastEndOf('API reference');
		dispatchPointer('pointermove', document.body, end);
		await userEvent.keyboard('{Escape}');

		await expect.poll(ghost).toBeNull();
		expect(chip()).toBeNull();
		expect(keys).toEqual([]);
		drop(overview, end);
		await tick();
		expect(order()).toBe('overview,usage,api');
		expect(strip()).toEqual(['Overview', 'Usage', 'API']);
	});

	it.each([
		{
			cause: 'pointercancel',
			end: () => dispatchPointer('pointercancel', document.body, { x: 0, y: 0 })
		},
		{ cause: 'window blur', end: () => window.dispatchEvent(new FocusEvent('blur')) }
	])('cancels on $cause with no write', async ({ end }) => {
		render(ReorderTabs);

		const overview = await lift('Overview');
		const target = pastEndOf('API reference');
		dispatchPointer('pointermove', document.body, target);
		end();

		await expect.poll(ghost).toBeNull();
		drop(overview, target);
		await tick();
		expect(order()).toBe('overview,usage,api');
		expect(strip()).toEqual(['Overview', 'Usage', 'API']);
	});

	it('starts no drag from a press on a nested close button, which still closes the tab', async () => {
		render(ClosableTabs, { props: { reorderable: true } });
		const close = page.getByRole('button', { name: 'Close Usage' }).element() as HTMLElement;
		const usage = closableTab('Usage').element();

		const start = press(close);
		travel(close, start);
		await startsNoDrag(usage);
		dispatchPointer('pointerup', close, start);
		close.click();

		await expect.element(closableTab('Usage')).not.toBeInTheDocument();
	});

	it('selects a tab pressed with no travel', async () => {
		render(ReorderTabs);

		await userEvent.click(tab('Usage'));

		await expect.element(tab('Usage')).toHaveAttribute('aria-selected', 'true');
		expect(ghost()).toBeNull();
		expect(order()).toBe('overview,usage,api');
	});

	it('scrolls the strip while the pointer holds near its end', async () => {
		render(ClosableTabs, {
			props: { reorderable: true, variant: 'file', extraTabCount: 8, width: '240px' }
		});
		const list = page.getByRole('tablist').element();
		expect(list.scrollLeft).toBe(0);

		await lift('Overview', closableTab('Overview').element());
		const { right, top, height } = list.getBoundingClientRect();
		const nearEnd = { x: right - INSIDE_EDGE_ZONE_PX, y: top + height / 2 };
		dispatchPointer('pointermove', document.body, nearEnd);

		await expect.poll(() => list.scrollLeft).toBeGreaterThan(0);
		await userEvent.keyboard('{Escape}');
		dispatchPointer('pointerup', document.body, nearEnd);
	});

	it('abandons a touch that travels before the hold', async () => {
		render(ReorderTabs);
		const usage = tab('Usage').element();

		travel(usage, press(usage, TOUCH), TOUCH);
		await delay(PAST_HOLD_MS);
		travel(usage, { x: centerOf(usage).x + TRAVEL_PX, y: centerOf(usage).y }, TOUCH);

		await startsNoDrag(usage);
		dispatchPointer('pointerup', usage, centerOf(usage), TOUCH);
	});

	it('drags a touch held past the hold, and blocks scrolling once armed', async () => {
		render(ReorderTabs);
		const usage = tab('Usage').element();

		const start = press(usage, TOUCH);
		const early = new TouchEvent('touchmove', { bubbles: true, cancelable: true });
		usage.dispatchEvent(early);
		await delay(PAST_HOLD_MS);
		const armed = new TouchEvent('touchmove', { bubbles: true, cancelable: true });
		usage.dispatchEvent(armed);
		travel(usage, start, TOUCH);

		expect(early.defaultPrevented).toBe(false);
		expect(armed.defaultPrevented).toBe(true);
		await expect.poll(ghost).not.toBeNull();
		drop(usage, pastEndOf('API reference'), TOUCH);
		await expect.poll(order).toBe('overview,api,usage');
	});
});

describe('Tabs.List without reorderable', () => {
	it('starts no drag on a press that travels', async () => {
		render(ReorderTabs, { props: { reorderable: false } });
		const overview = tab('Overview').element();

		const start = press(overview);
		travel(overview, start);
		await startsNoDrag(overview);
		drop(overview, pastEndOf('API reference'));

		await tick();
		expect(order()).toBe('overview,usage,api');
		expect(chip()).toBeNull();
	});

	it('moves nothing on the chord and marks no tab with aria-keyshortcuts', async () => {
		render(ReorderTabs, { props: { reorderable: false } });
		focusTab('Overview');

		await userEvent.keyboard(MOVE_RIGHT);

		expect(order()).toBe('overview,usage,api');
		expect(allTabs().map((element) => element.hasAttribute('aria-keyshortcuts'))).toEqual([
			false,
			false,
			false
		]);
		expect(document.querySelector('[role="status"]')).toBeNull();
	});
});
