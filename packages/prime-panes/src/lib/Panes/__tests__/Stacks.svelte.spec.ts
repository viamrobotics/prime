import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import { CAM_A, CAM_B, CAM_C, CAMERA_ROW, CAMERAS } from '../../../../test/layouts.ts';
import type { PaneData } from '../../../../test/layouts.ts';
import type { LayoutNode } from '../../layout.ts';
import StackPanes from '../../../../test/fixtures/StackPanes.svelte';

const tab = (name: string) => page.getByRole('tab', { name, exact: true });
const note = (label: string) =>
	page.getByRole('textbox', { name: `Note for ${label}`, includeHidden: true });
const renderedNotes = () =>
	page
		.getByRole('textbox', { includeHidden: true })
		.elements()
		.map((element) => element.getAttribute('aria-label'));

const STALE_LAYOUT: LayoutNode<PaneData> = {
	...CAMERA_ROW,
	first: { ...CAMERAS, activeId: 'gone' }
};

describe('stack rendering', () => {
	it('renders only the active pane of a stack, and unmounts the others', async () => {
		render(StackPanes);

		await expect.element(note('Camera A')).toBeInTheDocument();
		expect(renderedNotes()).toEqual(['Note for Camera A', 'Note for Solo']);
	});

	it('keeps inactive panes mounted, hidden, and inert with keepInactiveMounted', async () => {
		render(StackPanes, { keepInactiveMounted: true });

		await expect.element(note('Camera A')).toBeVisible();
		await expect.element(note('Camera B')).not.toBeVisible();
		await expect.element(note('Camera C')).not.toBeVisible();
		await expect.element(page.getByStackPane('cam-a')).not.toHaveAttribute('inert');
		await expect.element(page.getByStackPane('cam-b')).toHaveAttribute('inert');
		await expect.element(page.getByStackPane('cam-c')).toHaveAttribute('inert');
		expect(renderedNotes()).toEqual([
			'Note for Camera A',
			'Note for Camera B',
			'Note for Camera C',
			'Note for Solo'
		]);
	});

	it('keeps an inactive pane state across a tab switch with keepInactiveMounted', async () => {
		render(StackPanes, { keepInactiveMounted: true });
		(note('Camera B').element() as HTMLInputElement).value = 'kept';

		await userEvent.click(tab('Camera B'));

		await expect.element(note('Camera B')).toBeVisible();
		await expect.element(note('Camera B')).toHaveValue('kept');
	});

	it('mounts the newly active pane and unmounts the old one on selection', async () => {
		render(StackPanes);

		await userEvent.click(tab('Camera B'));

		await expect.poll(renderedNotes).toEqual(['Note for Camera B', 'Note for Solo']);
	});
});

describe('Panes.TabList', () => {
	it('renders nothing in a pane that is not stacked', async () => {
		render(StackPanes);

		await expect.element(page.getByPane('solo')).toBeInTheDocument();
		await expect.element(page.getByPane('solo').getByRole('tablist')).not.toBeInTheDocument();
		await expect.element(page.getByPane('solo').getByRole('tab')).not.toBeInTheDocument();
		expect(page.getByRole('tablist').elements()).toHaveLength(1);
		expect(page.getByLabelText('Cameras').elements()).toHaveLength(1);
	});

	it('renders a tab per pane in order with the tab roles and ARIA attributes', async () => {
		render(StackPanes);

		await expect.element(page.getByRole('tablist', { name: 'Cameras' })).toBeInTheDocument();
		const tabs = page.getByRole('tab').elements();
		expect(tabs.map((element) => element.textContent?.trim())).toEqual([
			'Camera A',
			'Camera B',
			'Camera C'
		]);
		expect(tabs.map((element) => element.getAttribute('aria-selected'))).toEqual([
			'true',
			'false',
			'false'
		]);
		expect(tabs.map((element) => element.tabIndex)).toEqual([0, -1, -1]);
	});

	it('has no tabpanel and no aria-controls without a PaneBody', async () => {
		render(StackPanes);

		await expect.element(tab('Camera A')).toBeInTheDocument();
		await expect.element(page.getByRole('tabpanel')).not.toBeInTheDocument();
		await expect.element(tab('Camera A')).not.toHaveAttribute('aria-controls');
		await expect.element(tab('Camera B')).not.toHaveAttribute('aria-controls');
		await expect.element(tab('Camera C')).not.toHaveAttribute('aria-controls');
	});

	it('labels the PaneBody by the active tab and points the tab at it', async () => {
		render(StackPanes, { hasPaneBody: true });

		const panel = page.getByRole('tabpanel');
		await expect.element(panel).toHaveAccessibleName('Camera A');
		expect(page.getByRole('tabpanel').elements()).toHaveLength(1);
		await expect.element(tab('Camera A')).toHaveAttribute('aria-controls', panel.element().id);
		await expect.element(tab('Camera B')).not.toHaveAttribute('aria-controls');
		await expect.element(tab('Camera C')).not.toHaveAttribute('aria-controls');
	});

	it('labels the new panel by the new active tab after a switch', async () => {
		render(StackPanes, { hasPaneBody: true });

		await userEvent.click(tab('Camera B'));

		const panel = page.getByRole('tabpanel');
		await expect.element(panel).toHaveAccessibleName('Camera B');
		await expect.element(tab('Camera B')).toHaveAttribute('aria-controls', panel.element().id);
		expect(page.getByRole('tabpanel').elements()).toHaveLength(1);
	});

	it('renders a PaneBody in an unstacked pane without a role', async () => {
		render(StackPanes, { hasPaneBody: true });

		await expect.element(page.getByRole('tabpanel')).toHaveAccessibleName('Camera A');
		await expect.element(page.getByPaneBody('solo')).not.toHaveAttribute('role');
		await expect.element(page.getByPaneBody('solo')).not.toHaveAttribute('aria-labelledby');
	});

	it('renders a PaneBody without a role when no TabList is mounted in the pane', async () => {
		render(StackPanes, { hasPaneBody: true, hasTabList: false });

		await expect.element(note('Camera A')).toBeInTheDocument();
		await expect.element(page.getByRole('tabpanel')).not.toBeInTheDocument();
		await expect.element(page.getByPaneBody('cam-a')).not.toHaveAttribute('role');
	});

	it('resolves every tab aria-controls to a panel with keepInactiveMounted', async () => {
		render(StackPanes, { hasPaneBody: true, keepInactiveMounted: true });

		await expect.element(tab('Camera C')).toHaveAttribute('aria-controls');
		const controlled = page
			.getByRole('tab')
			.elements()
			.map((element) => element.getAttribute('aria-controls'));
		const panelIds = page
			.getByRole('tabpanel', { includeHidden: true })
			.elements()
			.map((element) => element.id);
		expect(controlled).toHaveLength(3);
		expect(panelIds).toEqual(controlled);
	});

	it('selects a tab on click through the layout binding', async () => {
		const { component } = render(StackPanes);

		await userEvent.click(tab('Camera C'));

		await expect.element(tab('Camera C')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Camera A')).toHaveAttribute('aria-selected', 'false');
		expect(component.getLayout()).toMatchObject({
			first: { panes: [CAM_A, CAM_B, CAM_C], activeId: 'cam-c' }
		});
	});

	it('moves to the next tab on ArrowRight with automatic activation', async () => {
		const { component } = render(StackPanes);
		tab('Camera A').element().focus();

		await userEvent.keyboard('{ArrowRight}');

		await expect.element(tab('Camera B')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Camera B')).toHaveFocus();
		expect(component.getLayout()).toMatchObject({ first: { activeId: 'cam-b' } });
	});

	it('lands focus on the new active tab after a click selection', async () => {
		render(StackPanes);

		await userEvent.click(tab('Camera B'));

		await expect.element(tab('Camera B')).toHaveFocus();
	});

	it('leaves layout and focus unchanged when the binding vetoes a selection', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { component } = render(StackPanes, { isAccepting: false, received });
		tab('Camera A').element().focus();

		await userEvent.keyboard('{ArrowRight}');

		await expect.poll(() => received.length).toBe(1);
		expect(component.getLayout()).toEqual(CAMERA_ROW);
		await expect.element(tab('Camera A')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Camera A')).toHaveFocus();
	});

	it('renders the tab snippet in place of the label', async () => {
		render(StackPanes, { hasCustomTab: true });

		await expect.element(tab('Tab Camera B')).toBeInTheDocument();
		expect(
			page
				.getByRole('tab')
				.elements()
				.map((element) => element.textContent?.trim())
		).toEqual(['Tab Camera A', 'Tab Camera B', 'Tab Camera C']);
	});
});

describe('a stack whose activeId names none of its panes', () => {
	it('shows the first pane', async () => {
		render(StackPanes, { initialLayout: STALE_LAYOUT });

		await expect.element(note('Camera A')).toBeInTheDocument();
		expect(renderedNotes()).toEqual(['Note for Camera A', 'Note for Solo']);
	});

	it('selects the first tab', async () => {
		render(StackPanes, { initialLayout: STALE_LAYOUT });

		await expect.element(tab('Camera A')).toHaveAttribute('aria-selected', 'true');
		await expect.element(tab('Camera B')).toHaveAttribute('aria-selected', 'false');
	});
});
