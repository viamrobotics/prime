import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, commands, page, userEvent } from 'vitest/browser';
import type { Locator } from 'vitest/browser';

import {
	CAM_A,
	CAM_B,
	CAM_C,
	CAMERA_ROW,
	STACK_A,
	STACK_B,
	TWO_STACKS
} from '../../../../test/layouts.ts';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

const TAB_PRESS = { x: 10, y: '50%' } as const;
const TAB_LIFTED = { x: 14.1, y: '50%' } as const;
const STRIP_PRESS = { x: '95%', y: '50%' } as const;
const STRIP_LIFTED = { x: '94%', y: '50%' } as const;
const STRIP_END = { x: '95%', y: '50%' } as const;
const BEFORE_TAB = { x: '10%', y: '50%' } as const;
const ABOVE_TAB = { x: '10%', y: -8 } as const;
const SOLO_TOP = { x: '50%', y: 10 } as const;
const SOLO_RIGHT_EDGE = { x: '90%', y: '50%' } as const;

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const firstStrip = () => page.getByRole('tablist').first();
const lastStrip = () => page.getByRole('tablist').last();
const soloOverlay = () => page.getByPane('solo').getByDropOverlay();

const orderIn = (strip: Locator) =>
	strip
		.getByTabSlot()
		.elements()
		.map((element) =>
			element.hasAttribute('data-tab-preview')
				? `preview ${element.textContent?.trim()}`
				: element.textContent?.trim()
		);

const lift = async (
	source: Locator,
	from: { x: number | `${number}%`; y: number | `${number}%` },
	to: { x: number | `${number}%`; y: number | `${number}%` }
) => {
	await commands.mouseMove(source.selector, from);
	await commands.mouseDown();
	await commands.mouseMove(source.selector, to);
};

const liftTab = async (source: Locator) => {
	await lift(source, TAB_PRESS, TAB_LIFTED);
	await expect.element(source).not.toBeInTheDocument();
};
const liftStack = (strip: Locator) => lift(strip, STRIP_PRESS, STRIP_LIFTED);

const emulateReducedMotion = (value: 'reduce' | 'no-preference') =>
	cdp().send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value }]
	});

afterEach(() => emulateReducedMotion('no-preference'));

describe('Panes.TabList: pressing a tab', () => {
	it('lifts the tab once the pointer moves 4px, with no hold', async () => {
		render(StackPanes);

		await liftTab(tab('Camera B'));

		await expect.element(page.getByDragGhost()).toHaveTextContent('Camera B');
		await commands.mouseUp();
	});
});

describe('Panes.TabList: the preview over its own strip', () => {
	it('shows the preview in the gap between the other two tabs with the lifted tab out of the strip', async () => {
		await emulateReducedMotion('reduce');
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(tab('Camera B').selector, BEFORE_TAB);

		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera B', 'preview Camera A', 'Camera C']);
		await commands.mouseUp();
	});

	it('renders the tab snippet for the dragged pane in the preview', async () => {
		render(StackPanes, { hasCustomTab: true });

		await liftTab(tab('Tab Camera A'));
		await commands.mouseMove(tab('Tab Camera C').selector, BEFORE_TAB);

		await expect.element(page.getByTabPreview()).toHaveTextContent('Tab Camera A');
		await commands.mouseUp();
	});

	it('leaves the label of the preview unseen, since the ghost shows it', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect.element(page.getByTabPreview()).toBeVisible();
		await expect.element(page.getByTabPreview().getByText('Camera A')).not.toBeVisible();
		await commands.mouseUp();
	});

	it('hides the preview from assistive technology', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect.element(page.getByTabPreview()).toHaveAttribute('aria-hidden', 'true');
		await commands.mouseUp();
	});

	it('shows no preview once the pointer leaves for an edge of the pane', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(soloOverlay().selector, SOLO_RIGHT_EDGE);

		await expect.element(page.getByDropIndicator()).toBeInTheDocument();
		await expect.element(page.getByTabPreview()).not.toBeInTheDocument();
		await commands.mouseUp();
	});

	it('shows the preview in the strip when no drop region is mounted', async () => {
		render(StackPanes, { dropRegion: 'none' });

		await liftTab(tab('Camera C'));
		await commands.mouseMove(tab('Camera A').selector, BEFORE_TAB);

		await expect.element(firstStrip().getByTabPreview()).toBeInTheDocument();
		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['preview Camera C', 'Camera A', 'Camera B']);
		await commands.mouseUp();
	});
});

describe('Panes.TabList: dropping in its own strip', () => {
	it('moves the dragged tab to the insertion index', async () => {
		const { component } = render(StackPanes);

		await liftTab(tab('Camera B'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_A, CAM_C, CAM_B] } });
	});

	it('makes the dropped pane the active one', async () => {
		const { component } = render(StackPanes);

		await liftTab(tab('Camera B'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);
		await commands.mouseUp();

		await expect.poll(() => component.getLayout()).toMatchObject({ first: { activeId: 'cam-b' } });
	});

	it('moves the tab with a real touch drag', async () => {
		const { component } = render(StackPanes);

		await commands.touchStart(tab('Camera B').selector);
		await commands.touchMove(tab('Camera B').selector, { x: '90%', y: '50%' });
		await commands.touchMove(firstStrip().selector, STRIP_END);
		await commands.touchEnd();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ first: { panes: [CAM_A, CAM_C, CAM_B] } });
	});

	it('restores the tab in its place when Escape cancels the drag', async () => {
		const { component } = render(StackPanes);
		await liftTab(tab('Camera B'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);
		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera A', 'Camera C', 'preview Camera B']);

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => orderIn(firstStrip())).toEqual(['Camera A', 'Camera B', 'Camera C']);
		await commands.mouseUp();
		expect(component.getLayout()).toEqual(CAMERA_ROW);
	});
});

describe('Panes.TabList: dropping in the strip of another stack', () => {
	it('shows the preview at the insertion index of the other strip', async () => {
		render(StackPanes, { initialLayout: TWO_STACKS });

		await liftTab(tab('A1'));
		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);

		await expect.poll(() => orderIn(lastStrip())).toEqual(['B1', 'preview A1', 'B2', 'B3']);
		await commands.mouseUp();
	});

	it('keeps the lifted tab out of its own strip while it hovers over another strip', async () => {
		render(StackPanes, { initialLayout: TWO_STACKS });

		await liftTab(tab('A1'));
		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);

		await expect.element(page.getByTabPreview()).toBeInTheDocument();
		await expect.poll(() => orderIn(firstStrip())).toEqual(['A2']);
		await commands.mouseUp();
	});

	it('inserts the dropped pane at the insertion index and shows it', async () => {
		const { component } = render(StackPanes, { initialLayout: TWO_STACKS });
		const [b1, b2, b3] = STACK_B.panes;
		const [a1] = STACK_A.panes;

		await liftTab(tab('A1'));
		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [b1, a1, b2, b3], activeId: 'a1' } });
	});

	it('shows no preview over the region of an unstacked pane', async () => {
		render(StackPanes);

		await liftTab(tab('Camera B'));
		await commands.mouseMove(soloOverlay().selector, SOLO_TOP);

		await expect.element(page.getByDragGhost()).toHaveAttribute('data-form', 'tab');
		await expect.element(page.getByTabPreview()).not.toBeInTheDocument();
		await commands.mouseUp();
	});
});

describe('Panes.TabList: a drop region above the tabs', () => {
	it('inserts the dropped pane at the insertion index of the pointer over the region', async () => {
		const { component } = render(StackPanes, {
			initialLayout: TWO_STACKS,
			dropRegion: 'top-strip'
		});
		const [b1, b2, b3] = STACK_B.panes;
		const [a1] = STACK_A.panes;

		await liftTab(tab('A1'));
		await commands.mouseMove(tab('B3').selector, ABOVE_TAB);
		await commands.mouseUp();

		await expect
			.poll(() => component.getLayout())
			.toMatchObject({ second: { panes: [b1, b2, a1, b3], activeId: 'a1' } });
	});
});

describe('Panes.TabList: dragging a whole stack', () => {
	it('previews every pane of the stack at the insertion index', async () => {
		render(StackPanes, { initialLayout: TWO_STACKS });

		await liftStack(firstStrip());
		await commands.mouseMove(tab('B2').selector, BEFORE_TAB);

		await expect
			.poll(() => orderIn(lastStrip()))
			.toEqual(['B1', 'preview A1', 'preview A2', 'B2', 'B3']);
		await commands.mouseUp();
	});

	it('keeps every tab of the stack in its own strip while it hovers over its own strip', async () => {
		render(StackPanes, { initialLayout: TWO_STACKS });

		await liftStack(firstStrip());
		await commands.mouseMove(firstStrip().selector, { x: '2%', y: '50%' });

		await expect.element(page.getByDraggingPanes()).toBeInTheDocument();
		await expect.poll(() => orderIn(firstStrip())).toEqual(['A1', 'A2']);
		await commands.mouseUp();
	});
});

describe('Panes drag ghost form', () => {
	it('is the tab form over its own tab strip', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect.element(page.getByDragGhost()).toHaveAttribute('data-form', 'tab');
		await commands.mouseUp();
	});

	it('is the pane form over the edge of a pane', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(soloOverlay().selector, SOLO_RIGHT_EDGE);

		await expect.element(page.getByDragGhost()).toHaveAttribute('data-form', 'pane');
		await commands.mouseUp();
	});
});

describe('Panes.TabList: shifting the other tabs', () => {
	it('animates the tabs that shift around the preview', async () => {
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect.poll(() => tab('Camera B').element().getAnimations()).toHaveLength(1);
		await commands.mouseUp();
	});

	it('shifts the tabs with no animation under prefers-reduced-motion', async () => {
		await emulateReducedMotion('reduce');
		render(StackPanes);

		await liftTab(tab('Camera A'));
		await commands.mouseMove(firstStrip().selector, STRIP_END);

		await expect
			.poll(() => orderIn(firstStrip()))
			.toEqual(['Camera B', 'Camera C', 'preview Camera A']);
		expect(tab('Camera B').element().getAnimations()).toHaveLength(0);
		await commands.mouseUp();
	});
});
