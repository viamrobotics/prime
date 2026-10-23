import { tick } from 'svelte';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, page, userEvent } from 'vitest/browser';

import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
import { getDropRegion } from '../../drop-region.ts';
import BoundSplitView from './BoundSplitView.svelte';
import ControlledSplitView from './ControlledSplitView.svelte';
import { dragAfterHold } from './hold-to-drag.ts';

import type { DropRegion } from '../../drop-region.ts';
import type { LayoutNode } from '../../layout.ts';
import type { PaneData } from '../../__tests__/layout-fixture.ts';

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const WHITE = 'rgb(255, 255, 255)';
const MIN_TEXT_CONTRAST = 4.5;
const MIN_GRAPHIC_CONTRAST = 3;
const MIN_HIT_AREA_PX = 24;
const EDGE_BUTTONS_PER_DESTINATION = 4;
const STARTED_CAMERA =
	'Moving Camera. Choose a destination with the pointer or arrow keys, or press Escape. The arrow keys move between sides and panes, Tab moves between destinations, Enter places the pane, and Escape cancels.';
const DESTINATION_IDS = [ids.mytimeseries, ids.mysensor, ids.mycam2];
const KNOWN_IDS = Object.values(ids);

const REGION_POINTS = {
	left: { x: 0.1, y: 0.5 },
	right: { x: 0.9, y: 0.5 },
	top: { x: 0.5, y: 0.1 },
	bottom: { x: 0.5, y: 0.9 },
	center: { x: 0.5, y: 0.5 }
} as const satisfies Record<DropRegion, { x: number; y: number }>;

const handleOf = (container: Element, label: string) =>
	container.querySelector<HTMLElement>(`[aria-label="Move ${label}"]`)!;
const paneElement = (container: Element, id: string) =>
	container.querySelector<HTMLElement>(`[data-pane-id="${id}"]`)!;
const wrapperOf = (container: Element, id: string) => paneElement(container, id).parentElement!;
const outerOf = (container: Element, id: string) => wrapperOf(container, id).parentElement!;
const destinationOf = (container: Element, id: string) =>
	outerOf(container, id).querySelector<HTMLElement>('[data-move-target]')!;
const destinationsIn = (container: Element) => [
	...container.querySelectorAll<HTMLElement>('[data-move-target]')
];
const buttonNamed = (container: Element, name: string) =>
	container.querySelector<HTMLElement>(`[data-move-button][aria-label="${name}"]`)!;
const swapButtonOf = (container: Element, id: string) =>
	destinationOf(container, id).querySelector<HTMLElement>('[data-move-button="center"]')!;
const edgeButtonsIn = (element: Element) => [
	...element.querySelectorAll<HTMLElement>('[data-move-button]:not([data-move-button="center"])')
];
const visibleEdgeButtonsIn = (element: Element) =>
	edgeButtonsIn(element).filter((button) => getComputedStyle(button).opacity !== '0');
const barOf = (edgeButton: HTMLElement) => edgeButton.firstElementChild!;
const barsIn = (element: Element) => edgeButtonsIn(element).map(barOf);
const selectedBarRegionsIn = (element: Element) =>
	edgeButtonsIn(element)
		.filter(
			(button) =>
				getComputedStyle(barOf(button)).backgroundColor ===
				styleOf('bg-info-dark', 'backgroundColor')
		)
		.map((button) => button.dataset.moveButton);
const previewIn = (element: Element) => element.querySelector<HTMLElement>('[data-move-preview]');
const previewedRegionIn = (container: Element, id: string) =>
	previewIn(outerOf(container, id))?.dataset.movePreview;
const engagementOf = (container: Element) =>
	DESTINATION_IDS.map((id) => ({
		bars: visibleEdgeButtonsIn(outerOf(container, id)).length,
		previews: Number(previewIn(outerOf(container, id)) !== null)
	}));
const rootOf = (container: Element) => container.querySelector('[role="status"]')!.parentElement!;
const announcementIn = (container: Element) =>
	container.querySelector('[role="status"]')?.textContent;
const noticeIn = (container: Element) =>
	container.querySelector<HTMLElement>('[data-moving-notice]');
const washIn = (container: Element) => container.querySelector<HTMLElement>('[data-moving-wash]');
const boxOf = (element: Element) => {
	const { left, top, width, height } = element.getBoundingClientRect();
	return { left, top, width, height };
};
const outlineOf = (element: Element) => {
	const { outlineStyle, outlineWidth, outlineOffset, outlineColor } = getComputedStyle(element);
	return { outlineStyle, outlineWidth, outlineOffset, outlineColor };
};
const pressedStates = (container: Element) =>
	[...container.querySelectorAll<HTMLButtonElement>('button[aria-label^="Move "]')].map((handle) =>
		handle.getAttribute('aria-pressed')
	);
const nextFrames = () =>
	new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
	);
const styleOf = (
	utility: string,
	property: 'outlineColor' | 'backgroundColor' | 'color' | 'borderTopColor'
) => {
	const probe = document.createElement('div');
	probe.className = utility;
	probe.style.borderTopStyle = 'solid';
	document.body.append(probe);
	const value = getComputedStyle(probe)[property];
	probe.remove();
	return value;
};
const channelLuminance = (channel: number) => {
	const fraction = channel / 255;
	return fraction <= 0.04045 ? fraction / 12.92 : ((fraction + 0.055) / 1.055) ** 2.4;
};
const luminanceOf = (color: string) => {
	const [red, green, blue] = color
		.match(/[\d.]+/g)!
		.slice(0, 3)
		.map(Number)
		.map(channelLuminance);
	return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
};
const contrastBetween = (first: string, second: string) => {
	const [lighter, darker] = [luminanceOf(first), luminanceOf(second)].sort(
		(left, right) => right - left
	);
	return (lighter! + 0.05) / (darker! + 0.05);
};
const blendOverWhite = (color: string, opacity: number) => {
	const channels = color
		.match(/[\d.]+/g)!
		.slice(0, 3)
		.map(Number);
	return `rgb(${channels.map((channel) => channel * opacity + 255 * (1 - opacity)).join(', ')})`;
};
const withoutGeneratedIds = (layout: LayoutNode<PaneData> | undefined) =>
	JSON.parse(JSON.stringify(layout), (key, value) =>
		key === 'id' && !KNOWN_IDS.includes(value) ? 'generated' : value
	);

const pointIn = (element: HTMLElement, region: DropRegion) => {
	const { left, top, width, height } = element.getBoundingClientRect();
	const point = REGION_POINTS[region];
	return {
		x: width * point.x,
		y: height * point.y,
		clientX: left + width * point.x,
		clientY: top + height * point.y
	};
};

const hoverRegion = (destination: HTMLElement, region: DropRegion) => {
	const { x, y } = pointIn(destination, region);
	return userEvent.hover(destination, { position: { x, y } });
};

const clickRegion = (destination: HTMLElement, region: DropRegion) => {
	const { x, y } = pointIn(destination, region);
	return userEvent.click(destination, { position: { x, y } });
};

const tap = (destination: HTMLElement, region: DropRegion) => {
	const { clientX, clientY } = pointIn(destination, region);
	const touch = {
		pointerType: 'touch',
		pointerId: 1,
		isPrimary: true,
		clientX,
		clientY,
		cancelable: true
	};
	const tapped = document.elementFromPoint(clientX, clientY)!;
	destination.dispatchEvent(new PointerEvent('pointerenter', touch));
	tapped.dispatchEvent(new PointerEvent('pointerdown', { ...touch, bubbles: true }));
	tapped.dispatchEvent(new PointerEvent('pointerup', { ...touch, bubbles: true }));
	destination.dispatchEvent(new PointerEvent('pointerleave', touch));
	tapped.dispatchEvent(
		new MouseEvent('click', { bubbles: true, cancelable: true, clientX, clientY, detail: 1 })
	);
	return tick();
};

const tabThrough = async (count: number) => {
	const visited: (Element | null)[] = [];
	for (let step = 0; step < count; step += 1) {
		await userEvent.keyboard('{Tab}');
		visited.push(document.activeElement);
	}
	return visited;
};

const startMoveWithKeyboard = async (container: Element, label: string) => {
	handleOf(container, label).focus();
	await userEvent.keyboard('{Enter}');
};

const startMoveOnFirstDestination = async (container: Element, label: string) => {
	await startMoveWithKeyboard(container, label);
	await userEvent.keyboard('{Tab}{Tab}');
};

const startMoveWithPointer = (container: Element, label: string) =>
	userEvent.click(handleOf(container, label));

const dragOnto = (
	source: HTMLElement,
	container: Element,
	targetId: string,
	region: DropRegion
) => {
	const target = paneElement(container, targetId);
	const { x, y } = pointIn(target, region);
	return dragAfterHold(source, target, { targetPosition: { x, y } });
};

const dispatchEnter = (type: 'keyDown' | 'keyUp', isRepeat: boolean) =>
	cdp().send('Input.dispatchKeyEvent', {
		type,
		key: 'Enter',
		code: 'Enter',
		windowsVirtualKeyCode: 13,
		text: '\r',
		autoRepeat: isRepeat
	});
const pressEnter = ({ isRepeat }: { isRepeat: boolean }) => dispatchEnter('keyDown', isRepeat);
const releaseEnter = () => dispatchEnter('keyUp', false);

const setReducedMotion = (value: 'reduce' | 'no-preference') =>
	cdp().send('Emulation.setEmulatedMedia', {
		features: [{ name: 'prefers-reduced-motion', value }]
	});

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

describe('SplitView move mode: marking the moving pane', () => {
	it('sets data-move-mode on the root only while a pane is moving', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(rootOf(container).hasAttribute('data-move-mode'), 'before move mode').toBe(false);

		await startMoveWithPointer(container, 'Camera');
		expect(rootOf(container).hasAttribute('data-move-mode'), 'in move mode').toBe(true);

		await userEvent.keyboard('{Escape}');
		expect(rootOf(container).hasAttribute('data-move-mode'), 'after cancel').toBe(false);
	});

	it('sets data-moving on the moving pane wrapper alone', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(container.querySelectorAll('[data-moving]'), 'before move mode').toHaveLength(0);

		await startMoveWithPointer(container, 'Camera');
		expect([...container.querySelectorAll('[data-moving]')], 'in move mode').toEqual([
			wrapperOf(container, ids.mycam)
		]);

		await userEvent.keyboard('{Escape}');
		expect(container.querySelectorAll('[data-moving]'), 'after cancel').toHaveLength(0);
	});

	it('tells the moving pane what to do', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(noticeIn(container), 'before move mode').toBeNull();

		await startMoveWithPointer(container, 'Camera');

		expect(container.querySelectorAll('[data-moving-notice]')).toHaveLength(1);
		expect(outerOf(container, ids.mycam).contains(noticeIn(container))).toBe(true);
		expect(noticeIn(container)!.textContent!.trim()).toBe(
			'Moving Camera. Choose a destination with the pointer or arrow keys, or press Escape.'
		);
	});

	it('opens the status message with the visible notice', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(announcementIn(container)!.startsWith(noticeIn(container)!.textContent!.trim())).toBe(
			true
		);
	});

	it('removes the notice when move mode ends', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.keyboard('{Escape}');

		expect(noticeIn(container)).toBeNull();
	});

	it('outlines the moving pane wrapper inside its edge in info-dark after a mouse click starts the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(outlineOf(wrapperOf(container, ids.mycam))).toEqual({
			outlineStyle: 'solid',
			outlineWidth: '2px',
			outlineOffset: '-2px',
			outlineColor: styleOf('outline-info-dark', 'outlineColor')
		});
	});

	it('outlines the moving pane wrapper in info-dark after Enter on the trigger starts the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithKeyboard(container, 'Camera');

		expect(outlineOf(wrapperOf(container, ids.mycam))).toEqual({
			outlineStyle: 'solid',
			outlineWidth: '2px',
			outlineOffset: '-2px',
			outlineColor: styleOf('outline-info-dark', 'outlineColor')
		});
	});

	it('leaves no outline on the notice, since the wrapper carries the focus outline', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(getComputedStyle(noticeIn(container)!).outlineStyle).toBe('none');
	});

	it('leaves the moving pane without an outline once focus leaves it', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		expect(outlineOf(wrapperOf(container, ids.mycam)).outlineStyle, 'while focused').toBe('solid');

		swapButtonOf(container, ids.mytimeseries).focus();

		expect(outlineOf(wrapperOf(container, ids.mycam)).outlineStyle).toBe('none');
	});

	it('washes the moving pane in gray-2 at 80%', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(washIn(container), 'before move mode').toBeNull();

		await startMoveWithPointer(container, 'Camera');

		expect(container.querySelectorAll('[data-moving-wash]')).toHaveLength(1);
		expect(outerOf(container, ids.mycam).contains(washIn(container))).toBe(true);
		expect(getComputedStyle(washIn(container)!).backgroundColor).toBe(
			styleOf('bg-gray-2/80', 'backgroundColor')
		);
	});

	it('removes the wash when move mode ends', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.keyboard('{Escape}');

		expect(washIn(container)).toBeNull();
	});

	it('paints the wash beneath the notice', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(getComputedStyle(washIn(container)!).zIndex).toBe(
			getComputedStyle(noticeIn(container)!).zIndex
		);
		expect(
			washIn(container)!.compareDocumentPosition(noticeIn(container)!) &
				Node.DOCUMENT_POSITION_FOLLOWING
		).toBeTruthy();
	});

	it('lets a click through the wash and the notice to the moving pane handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		const handle = handleOf(container, 'Camera').getBoundingClientRect();

		expect(
			document.elementFromPoint(handle.left + handle.width / 2, handle.top + handle.height / 2)
		).toBe(handleOf(container, 'Camera'));
	});

	it('insets the wash by the outline width while the moving pane has focus', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const pane = boxOf(wrapperOf(container, ids.mycam));
		expect(boxOf(washIn(container)!)).toEqual({
			left: pane.left + 2,
			top: pane.top + 2,
			width: pane.width - 4,
			height: pane.height - 4
		});
	});

	it('covers the whole moving pane with the wash once focus leaves it', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		swapButtonOf(container, ids.mytimeseries).focus();

		expect(boxOf(washIn(container)!)).toEqual(boxOf(wrapperOf(container, ids.mycam)));
	});

	it('sets the notice in info-dark on an opaque info-light pill that reads at 4.5 to 1', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const pill = getComputedStyle(noticeIn(container)!.querySelector('p')!);
		expect(pill.color).toBe(styleOf('text-info-dark', 'color'));
		expect(pill.backgroundColor).toBe(styleOf('bg-info-light', 'backgroundColor'));
		expect(pill.backgroundColor, 'the pill is translucent').toMatch(/^rgb\(/);
		expect(contrastBetween(pill.color, pill.backgroundColor)).toBeGreaterThanOrEqual(
			MIN_TEXT_CONTRAST
		);
	});

	it('lets a click through the notice to the moving pane handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		expect(getComputedStyle(noticeIn(container)!).pointerEvents).toBe('none');
	});
});

describe('SplitView move mode: quiet until engaged', () => {
	it('shows no edge bars and no preview on any destination after a mouse click starts the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(engagementOf(container)).toEqual([
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 }
		]);
	});

	it('exposes the four edge buttons by role and name on a destination that is not engaged', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const found = [
			'Place Camera left of Time series',
			'Place Camera right of Time series',
			'Place Camera above Time series',
			'Place Camera below Time series'
		].map((name) => page.getByRole('button', { name, exact: true }).element());
		expect(found).toEqual(edgeButtonsIn(destinationOf(container, ids.mytimeseries)));
	});

	it('hides the edge buttons of a destination that is not engaged with opacity and pointer events alone', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const buttons = edgeButtonsIn(destinationOf(container, ids.mytimeseries));
		const looks = buttons.map((button) => {
			const { opacity, pointerEvents } = getComputedStyle(button);
			return { opacity, pointerEvents };
		});
		expect(looks).toEqual(
			Array.from({ length: EDGE_BUTTONS_PER_DESTINATION }, () => ({
				opacity: '0',
				pointerEvents: 'none'
			}))
		);
		expect(buttons.filter((button) => button.closest('[aria-hidden="true"], [inert]'))).toEqual([]);
	});

	it('shows the preview when any key is pressed on a destination that took focus after a mouse start', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		swapButtonOf(container, ids.mytimeseries).focus();
		expect(engagementOf(container), 'before the key').toEqual([
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 }
		]);

		await userEvent.keyboard('{Shift}');

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 },
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 }
			]);
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('center');
	});

	it('moves focus to the moving pane wrapper when a mouse click started the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');
		await nextFrames();

		expect(document.activeElement).toBe(wrapperOf(container, ids.mycam));
		expect(engagementOf(container)).toEqual([
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 }
		]);
	});

	it('selects no destination and moves focus to the moving pane wrapper when Enter on the trigger started the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithKeyboard(container, 'Camera');
		await nextFrames();

		expect(document.activeElement).toBe(wrapperOf(container, ids.mycam));
		expect(engagementOf(container)).toEqual([
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 }
		]);
	});

	it('previews the swap on the first destination when Tab reaches it after the trigger started the move', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveOnFirstDestination(container, 'Camera');

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 },
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 }
			]);
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('center');
	});

	it('shows the preview of the pane below when an arrow key follows a mouse start', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.keyboard('{ArrowDown}');

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 },
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 }
			]);
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('top');
	});

	it('engages only the destination under the pointer', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.hover(destinationOf(container, ids.mysensor));

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: 0, previews: 0 },
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 },
				{ bars: 0, previews: 0 }
			]);
	});

	it('goes quiet again when the pointer leaves an unfocused destination', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		await userEvent.hover(destinationOf(container, ids.mysensor));

		await userEvent.hover(handleOf(container, 'Camera'));

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 }
			]);
	});

	it('engages only the destination that Tab reaches', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await tabThrough(4);

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: 0, previews: 0 },
				{ bars: 0, previews: 0 },
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 }
			]);
	});

	it('hides the preview from assistive technology', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');
		await expect.poll(() => previewIn(outerOf(container, ids.mytimeseries))).not.toBeNull();

		const preview = previewIn(outerOf(container, ids.mytimeseries))!;

		expect(preview.closest('[aria-hidden="true"]')).not.toBeNull();
	});

	it('keeps the edge buttons in the accessibility tree', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');
		await expect
			.poll(() => visibleEdgeButtonsIn(outerOf(container, ids.mytimeseries)).length)
			.toBe(EDGE_BUTTONS_PER_DESTINATION);

		const hidden = edgeButtonsIn(outerOf(container, ids.mytimeseries)).filter((button) =>
			button.closest('[aria-hidden="true"]')
		);

		expect(hidden).toEqual([]);
	});
});

describe('SplitView move mode: edge bars', () => {
	const renderEngaged = async () => {
		const view = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(view.container, 'Camera');
		await expect
			.poll(() => visibleEdgeButtonsIn(outerOf(view.container, ids.mytimeseries)).length)
			.toBe(EDGE_BUTTONS_PER_DESTINATION);
		return view;
	};

	it('puts one edge button on each side', async () => {
		const { container } = await renderEngaged();

		const regions = edgeButtonsIn(outerOf(container, ids.mytimeseries)).map(
			(button) => button.dataset.moveButton
		);

		expect(regions.toSorted()).toEqual(['bottom', 'left', 'right', 'top']);
	});

	it('puts each bar inside the region it hints at', async () => {
		const { container } = await renderEngaged();
		const destination = destinationOf(container, ids.mytimeseries).getBoundingClientRect();

		const misplaced = edgeButtonsIn(outerOf(container, ids.mytimeseries))
			.filter((button) => {
				const box = barOf(button).getBoundingClientRect();
				const region = getDropRegion(
					box.left + box.width / 2,
					box.top + box.height / 2,
					destination
				);
				return region !== button.dataset.moveButton;
			})
			.map((button) => button.dataset.moveButton);

		expect(misplaced).toEqual([]);
	});

	it.each([
		{ region: 'left', axis: 'y' },
		{ region: 'right', axis: 'y' },
		{ region: 'top', axis: 'x' },
		{ region: 'bottom', axis: 'x' }
	] as const)('centers the $region bar along its edge', async ({ region, axis }) => {
		const { container } = await renderEngaged();
		const destination = destinationOf(container, ids.mytimeseries).getBoundingClientRect();
		const bar = barOf(
			outerOf(container, ids.mytimeseries).querySelector<HTMLElement>(
				`[data-move-button="${region}"]`
			)!
		).getBoundingClientRect();

		const center = axis === 'x' ? bar.left + bar.width / 2 : bar.top + bar.height / 2;
		const midpoint =
			axis === 'x'
				? destination.left + destination.width / 2
				: destination.top + destination.height / 2;

		expect(center).toBeCloseTo(midpoint, 0);
	});

	it.each([
		{ region: 'left', longSide: 'height', shortSide: 'width' },
		{ region: 'right', longSide: 'height', shortSide: 'width' },
		{ region: 'top', longSide: 'width', shortSide: 'height' },
		{ region: 'bottom', longSide: 'width', shortSide: 'height' }
	] as const)(
		'runs the $region bar parallel to its edge',
		async ({ region, longSide, shortSide }) => {
			const { container } = await renderEngaged();

			const bar = barOf(
				outerOf(container, ids.mytimeseries).querySelector<HTMLElement>(
					`[data-move-button="${region}"]`
				)!
			).getBoundingClientRect();

			expect(bar[longSide]).toBeGreaterThan(bar[shortSide]);
		}
	);

	it('rounds the bars', async () => {
		const { container } = await renderEngaged();

		const radii = barsIn(outerOf(container, ids.mytimeseries)).map(
			(bar) => getComputedStyle(bar).borderTopLeftRadius
		);

		expect(radii.filter((radius) => parseFloat(radius) === 0)).toEqual([]);
	});

	it('draws no mark on the swap, so a swap shows only through the preview', async () => {
		const { container } = await renderEngaged();
		const destination = destinationOf(container, ids.mytimeseries);

		const extras = [...destination.querySelectorAll('*')].filter(
			(element) =>
				!element.matches(
					'button, button > span, [aria-hidden="true"], [data-move-preview], [data-move-preview] > span'
				)
		);

		expect(extras).toEqual([]);
		expect(swapButtonOf(container, ids.mytimeseries).childElementCount).toBe(0);
	});

	it('draws the unselected bars in gray-8 at 70% opacity', async () => {
		const { container } = await renderEngaged();

		const looks = barsIn(outerOf(container, ids.mytimeseries)).map((bar) => {
			const { backgroundColor, opacity } = getComputedStyle(bar);
			return { backgroundColor, opacity };
		});

		expect(looks).toEqual(
			Array.from({ length: EDGE_BUTTONS_PER_DESTINATION }, () => ({
				backgroundColor: styleOf('bg-gray-8', 'backgroundColor'),
				opacity: '0.7'
			}))
		);
	});

	it('keeps the unselected bars at 3 to 1 against a white pane once blended', async () => {
		const { container } = await renderEngaged();

		const contrasts = barsIn(outerOf(container, ids.mytimeseries)).map((bar) => {
			const { backgroundColor, opacity } = getComputedStyle(bar);
			return contrastBetween(blendOverWhite(backgroundColor, Number(opacity)), WHITE);
		});

		expect(Math.min(...contrasts)).toBeGreaterThanOrEqual(MIN_GRAPHIC_CONTRAST);
	});

	it('turns the focused edge bar of a quiet destination solid info-dark, with no focus outline', async () => {
		const view = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(view.container, 'Camera');
		expect(engagementOf(view.container), 'before the arrow').toEqual([
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 },
			{ bars: 0, previews: 0 }
		]);

		await userEvent.keyboard('{ArrowDown}');

		const focused = buttonNamed(view.container, 'Place Camera above Time series');
		expect(document.activeElement).toBe(focused);
		await expect
			.poll(() => selectedBarRegionsIn(outerOf(view.container, ids.mytimeseries)))
			.toEqual(['top']);
		expect(visibleEdgeButtonsIn(outerOf(view.container, ids.mytimeseries))).toHaveLength(
			EDGE_BUTTONS_PER_DESTINATION
		);
		expect(getComputedStyle(focused).outlineStyle).toBe('none');
	});

	it('draws the selected bar in solid info-dark and no other bar', async () => {
		const { container } = await renderEngaged();

		await userEvent.keyboard('{ArrowRight}');

		await expect
			.poll(() => selectedBarRegionsIn(outerOf(container, ids.mytimeseries)))
			.toEqual(['right']);
		const selected = barOf(
			outerOf(container, ids.mytimeseries).querySelector<HTMLElement>('[data-move-button="right"]')!
		);
		expect(getComputedStyle(selected).opacity).toBe('1');
	});

	it.each(['left', 'right', 'top', 'bottom'] as const)(
		'gives the %s edge button a hit area of at least 24 by 24 pixels',
		async (region) => {
			const { container } = await renderEngaged();

			const { width, height } = outerOf(container, ids.mytimeseries)
				.querySelector<HTMLElement>(`[data-move-button="${region}"]`)!
				.getBoundingClientRect();

			expect(Math.min(width, height)).toBeGreaterThanOrEqual(MIN_HIT_AREA_PX);
		}
	);

	it('keeps each hit area around its visible bar', async () => {
		const { container } = await renderEngaged();

		const outside = edgeButtonsIn(outerOf(container, ids.mytimeseries)).filter((button) => {
			const area = button.getBoundingClientRect();
			const bar = barOf(button).getBoundingClientRect();
			return (
				bar.left < area.left ||
				bar.right > area.right ||
				bar.top < area.top ||
				bar.bottom > area.bottom
			);
		});

		expect(outside).toEqual([]);
	});
});

describe('SplitView move mode: destination group', () => {
	const buttonNamesIn = (element: Element) =>
		[...element.querySelectorAll('button')].map((button) => button.getAttribute('aria-label'));
	const tabStopsIn = (element: Element) =>
		[...element.querySelectorAll<HTMLElement>('button')]
			.filter((button) => button.tabIndex === 0)
			.map((button) => button.dataset.moveButton);

	const renderEngaged = async () => {
		const view = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(view.container, 'Camera');
		await expect
			.poll(() => visibleEdgeButtonsIn(outerOf(view.container, ids.mytimeseries)).length)
			.toBe(EDGE_BUTTONS_PER_DESTINATION);
		return view;
	};

	it('makes each destination a group named for the move it offers', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const names = [
			'Move Camera to Time series',
			'Move Camera to Sensor stat',
			'Move Camera to Camera 2'
		];
		expect(
			destinationsIn(container).map((destination) => destination.getAttribute('aria-label'))
		).toEqual(names);
		expect(names.map((name) => page.getByRole('group', { name, exact: true }).element())).toEqual(
			destinationsIn(container)
		);
	});

	it('leaves no toolbar, since arrows cross from one destination into another', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		expect(container.querySelectorAll('[role="toolbar"]')).toHaveLength(0);
	});

	it('names the swap and the four edge buttons the same whatever the selection', async () => {
		const { container } = await renderEngaged();
		const names = [
			'Swap Camera with Time series',
			'Place Camera left of Time series',
			'Place Camera right of Time series',
			'Place Camera above Time series',
			'Place Camera below Time series'
		];
		expect(buttonNamesIn(destinationOf(container, ids.mytimeseries)), 'on the swap').toEqual(names);

		await userEvent.keyboard('{ArrowRight}');

		expect(buttonNamesIn(destinationOf(container, ids.mytimeseries)), 'on the right edge').toEqual(
			names
		);
	});

	it('shows the four edge buttons only on the destination that is engaged', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		const visibleButtonCounts = () =>
			DESTINATION_IDS.map((id) => visibleEdgeButtonsIn(destinationOf(container, id)).length);
		expect(visibleButtonCounts(), 'while quiet').toEqual([0, 0, 0]);

		await userEvent.hover(destinationOf(container, ids.mysensor));

		await expect.poll(visibleButtonCounts).toEqual([0, EDGE_BUTTONS_PER_DESTINATION, 0]);
	});

	it('shows the edge buttons when a hidden one takes focus on a quiet destination', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		buttonNamed(container, 'Place Camera above Sensor stat').focus();

		await expect
			.poll(() => engagementOf(container))
			.toEqual([
				{ bars: 0, previews: 0 },
				{ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 },
				{ bars: 0, previews: 0 }
			]);
		expect(previewedRegionIn(container, ids.mysensor)).toBe('top');
	});

	it('shows the full-pane preview and an inset info-dark outline on a focused swap', async () => {
		const { container } = await renderEngaged();

		const swap = swapButtonOf(container, ids.mytimeseries);
		expect(document.activeElement, 'Tab did not reach the swap').toBe(swap);
		expect(outlineOf(swap)).toEqual({
			outlineStyle: 'solid',
			outlineWidth: '2px',
			outlineOffset: '-2px',
			outlineColor: styleOf('outline-info-dark', 'outlineColor')
		});
		await expect
			.poll(() => boxOf(previewIn(outerOf(container, ids.mytimeseries))!))
			.toEqual(boxOf(destinationOf(container, ids.mytimeseries)));
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('center');
	});

	it('makes the swap the one tab stop of a destination at first', async () => {
		const { container } = await renderEngaged();

		expect(tabStopsIn(destinationOf(container, ids.mytimeseries))).toEqual(['center']);
	});

	it('moves the one tab stop to the selected edge button', async () => {
		const { container } = await renderEngaged();

		await userEvent.keyboard('{ArrowUp}');

		await expect
			.poll(() => tabStopsIn(destinationOf(container, ids.mytimeseries)))
			.toEqual(['top']);
	});

	it('keeps the tab stop on the focused button when the pointer selects another edge', async () => {
		const { container } = await renderEngaged();
		await hoverRegion(destinationOf(container, ids.mytimeseries), 'right');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('right');

		await userEvent.keyboard('{Tab}');

		expect(document.activeElement).toBe(swapButtonOf(container, ids.mysensor));
	});

	it('keeps the remembered edge as the one tab stop of a destination that is no longer engaged', async () => {
		const { container } = await renderEngaged();
		await userEvent.hover(handleOf(container, 'Camera'));

		await userEvent.keyboard('{ArrowRight}{Tab}');

		await expect
			.poll(() => visibleEdgeButtonsIn(destinationOf(container, ids.mytimeseries)))
			.toEqual([]);
		expect(tabStopsIn(destinationOf(container, ids.mytimeseries))).toEqual(['right']);
	});

	it('keeps Tab on the remembered region of a destination the pointer rests over', async () => {
		const { container } = await renderEngaged();
		await hoverRegion(destinationOf(container, ids.mysensor), 'right');
		await expect.poll(() => previewedRegionIn(container, ids.mysensor)).toBe('right');

		await userEvent.keyboard('{Tab}');

		expect(document.activeElement).toBe(swapButtonOf(container, ids.mysensor));
	});

	it('lands Tab on a remembered edge without focusing the swap first', async () => {
		await renderEngaged();
		await userEvent.keyboard('{ArrowRight}{Tab}');
		const focused: (string | null)[] = [];
		const stopRecording = new AbortController();
		document.addEventListener(
			'focusin',
			(event) => focused.push((event.target as Element).getAttribute('aria-label')),
			{ signal: stopRecording.signal }
		);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
		stopRecording.abort();

		expect(focused).toEqual(['Place Camera right of Time series']);
	});

	it('previews the edge of a button that takes focus without announcing it', async () => {
		const { container } = await renderEngaged();

		buttonNamed(container, 'Place Camera below Time series').focus();

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('bottom');
		expect(announcementIn(container)).toBe(STARTED_CAMERA);
	});

	it('leaves the status text alone when Tab returns focus to a remembered edge', async () => {
		const { container } = await renderEngaged();
		await userEvent.keyboard('{ArrowRight}{Tab}');

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		await expect
			.poll(() => document.activeElement)
			.toBe(buttonNamed(container, 'Place Camera right of Time series'));
		expect(announcementIn(container)).toBe(STARTED_CAMERA);
	});

	it.each([
		{
			region: 'left',
			name: 'Place Camera left of Time series',
			placed: 'Camera placed left of Time series.'
		},
		{
			region: 'right',
			name: 'Place Camera right of Time series',
			placed: 'Camera placed right of Time series.'
		},
		{
			region: 'top',
			name: 'Place Camera above Time series',
			placed: 'Camera placed above Time series.'
		},
		{
			region: 'bottom',
			name: 'Place Camera below Time series',
			placed: 'Camera placed below Time series.'
		}
	] as const)(
		'places the pane on the $region side when that bar is clicked',
		async ({ name, placed }) => {
			const { container } = await renderEngaged();

			await userEvent.click(buttonNamed(container, name));

			await expect.poll(() => announcementIn(container)).toBe(placed);
		}
	);

	it('places the side of a button clicked without a pointer, as assistive technology does', async () => {
		const { container } = await renderEngaged();

		buttonNamed(container, 'Place Camera left of Time series').click();

		await expect.poll(() => announcementIn(container)).toBe('Camera placed left of Time series.');
	});
});

describe('SplitView move mode: pointer preview', () => {
	const renderQuiet = async () => {
		const view = render(BoundSplitView, { props: { handles: true } });
		await startMoveWithPointer(view.container, 'Camera');
		return view;
	};

	it.each([
		{ region: 'left', selectedBars: ['left'] },
		{ region: 'right', selectedBars: ['right'] },
		{ region: 'top', selectedBars: ['top'] },
		{ region: 'bottom', selectedBars: ['bottom'] },
		{ region: 'center', selectedBars: [] }
	] as const)(
		'previews the $region region when the pointer is there',
		async ({ region, selectedBars }) => {
			const { container } = await renderQuiet();

			await hoverRegion(destinationOf(container, ids.mytimeseries), region);

			await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe(region);
			await expect
				.poll(() => selectedBarRegionsIn(outerOf(container, ids.mytimeseries)))
				.toEqual(selectedBars);
		}
	);

	it('moves the preview with the pointer', async () => {
		const { container } = await renderQuiet();
		const destination = destinationOf(container, ids.mytimeseries);

		await hoverRegion(destination, 'right');
		await expect
			.poll(() => previewedRegionIn(container, ids.mytimeseries), { message: 'at right' })
			.toBe('right');

		await hoverRegion(destination, 'top');
		await expect
			.poll(() => previewedRegionIn(container, ids.mytimeseries), { message: 'at top' })
			.toBe('top');

		await hoverRegion(destination, 'center');
		await expect
			.poll(() => previewedRegionIn(container, ids.mytimeseries), { message: 'at center' })
			.toBe('center');
	});

	it('leaves the status text alone while the mouse sweeps across the regions', async () => {
		const { container } = await renderQuiet();
		const destination = destinationOf(container, ids.mytimeseries);
		expect(announcementIn(container), 'before the sweep').toBe(STARTED_CAMERA);

		await hoverRegion(destination, 'right');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('right');
		await hoverRegion(destination, 'left');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('left');
		await hoverRegion(destination, 'top');
		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('top');

		expect(announcementIn(container)).toBe(STARTED_CAMERA);
	});

	it.each([
		{ region: 'left', box: { left: 0, top: 0, width: 0.5, height: 1 } },
		{ region: 'right', box: { left: 0.5, top: 0, width: 0.5, height: 1 } },
		{ region: 'top', box: { left: 0, top: 0, width: 1, height: 0.5 } },
		{ region: 'bottom', box: { left: 0, top: 0.5, width: 1, height: 0.5 } },
		{ region: 'center', box: { left: 0, top: 0, width: 1, height: 1 } }
	] as const)(
		'covers the $region part of the pane the way the drag indicator does',
		async ({ region, box }) => {
			const { container } = await renderQuiet();
			const destination = destinationOf(container, ids.mytimeseries);
			await hoverRegion(destination, region);

			await expect
				.poll(() => {
					const pane = destination.getBoundingClientRect();
					const preview = previewIn(outerOf(container, ids.mytimeseries))!.getBoundingClientRect();
					const relative = {
						left: (preview.left - pane.left) / pane.width,
						top: (preview.top - pane.top) / pane.height,
						width: preview.width / pane.width,
						height: preview.height / pane.height
					};
					return Object.fromEntries(
						Object.entries(relative).map(([edge, fraction]) => [
							edge,
							Math.round(fraction * 100) / 100
						])
					);
				})
				.toEqual(box);
		}
	);

	it('tints the preview like the drag indicator', async () => {
		const { container } = await renderQuiet();

		await hoverRegion(destinationOf(container, ids.mytimeseries), 'right');

		await expect
			.poll(
				() => getComputedStyle(previewIn(outerOf(container, ids.mytimeseries))!).backgroundColor
			)
			.toBe(styleOf('bg-info-medium/50', 'backgroundColor'));
	});

	it('labels the preview with the moving pane on an opaque background that reads at 4.5 to 1', async () => {
		const { container } = await renderQuiet();
		await hoverRegion(destinationOf(container, ids.mytimeseries), 'right');
		await expect.poll(() => previewIn(outerOf(container, ids.mytimeseries))).not.toBeNull();

		const label = previewIn(outerOf(container, ids.mytimeseries))!.querySelector('span')!;

		const { color, backgroundColor } = getComputedStyle(label);
		expect(label.textContent!.trim()).toBe('Camera');
		expect(color).toBe(styleOf('text-info-dark', 'color'));
		expect(backgroundColor).toBe(styleOf('bg-info-light', 'backgroundColor'));
		expect(backgroundColor, 'the label background is translucent').toMatch(/^rgb\(/);
		expect(contrastBetween(color, backgroundColor)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
	});

	it.each(['left', 'right', 'top', 'bottom', 'center'] as const)(
		'places the pane when the %s region is clicked, the way a drag onto it does',
		async (region) => {
			const moved = render(BoundSplitView, { props: { handles: true } });
			await startMoveWithPointer(moved.container, 'Camera');
			await clickRegion(destinationOf(moved.container, ids.mytimeseries), region);
			await expect.poll(() => destinationsIn(moved.container)).toEqual([]);

			const dragged = render(BoundSplitView, { props: { handles: true } });
			await dragOnto(
				handleOf(dragged.container, 'Camera'),
				dragged.container,
				ids.mytimeseries,
				region
			);
			await expect.poll(() => dragged.component.getLayout()).not.toEqual(layoutRoot);

			expect(withoutGeneratedIds(moved.component.getLayout())).toEqual(
				withoutGeneratedIds(dragged.component.getLayout())
			);
		}
	);
});

describe('SplitView move mode: keyboard selection', () => {
	const renderMoving = async () => {
		const view = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(view.container, 'Camera');
		return view;
	};

	it('previews a swap when Tab brings a destination into focus', async () => {
		const { container } = await renderMoving();

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('center');
		expect(document.activeElement).toBe(buttonNamed(container, 'Swap Camera with Time series'));
	});

	it.each([
		{ key: 'ArrowLeft', region: 'left', name: 'Place Camera left of Time series' },
		{ key: 'ArrowRight', region: 'right', name: 'Place Camera right of Time series' },
		{ key: 'ArrowUp', region: 'top', name: 'Place Camera above Time series' },
		{ key: 'ArrowDown', region: 'bottom', name: 'Place Camera below Time series' }
	])('selects the $region edge with $key', async ({ key, region, name }) => {
		const { container } = await renderMoving();

		await userEvent.keyboard(`{${key}}`);

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe(region);
		expect(document.activeElement).toBe(buttonNamed(container, name));
	});

	it.each([
		{ edge: 'ArrowLeft', opposite: 'ArrowRight' },
		{ edge: 'ArrowRight', opposite: 'ArrowLeft' },
		{ edge: 'ArrowUp', opposite: 'ArrowDown' },
		{ edge: 'ArrowDown', opposite: 'ArrowUp' }
	])('returns to the swap when $opposite follows $edge', async ({ edge, opposite }) => {
		const { container } = await renderMoving();
		await userEvent.keyboard(`{${edge}}`);

		await userEvent.keyboard(`{${opposite}}`);

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('center');
		expect(document.activeElement).toBe(buttonNamed(container, 'Swap Camera with Time series'));
	});

	it('starts every move on the swap, whatever an earlier move selected', async () => {
		const { container } = await renderMoving();
		await userEvent.keyboard('{ArrowRight}{Escape}');
		await expect.poll(() => destinationsIn(container)).toEqual([]);

		await startMoveOnFirstDestination(container, 'Camera');

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('center');
		expect(document.activeElement).toBe(buttonNamed(container, 'Swap Camera with Time series'));
	});

	it('moves from one edge to another when a different arrow follows', async () => {
		const { container } = await renderMoving();
		await userEvent.keyboard('{ArrowRight}');

		await userEvent.keyboard('{ArrowUp}');

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('top');
	});

	it('keeps the edge when its own arrow is pressed again with no pane beyond it', async () => {
		const { container } = await renderMoving();
		await userEvent.keyboard('{ArrowLeft}');

		await userEvent.keyboard('{ArrowLeft}');

		await expect.poll(() => previewedRegionIn(container, ids.mytimeseries)).toBe('left');
	});

	it('remembers each destination selection when focus returns to it', async () => {
		const { container } = await renderMoving();
		await userEvent.keyboard('{ArrowRight}');
		await userEvent.keyboard('{Tab}');
		expect(document.activeElement, 'Tab did not reach the second destination').toBe(
			buttonNamed(container, 'Swap Camera with Sensor stat')
		);

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

		expect(document.activeElement).toBe(
			buttonNamed(container, 'Place Camera right of Time series')
		);
	});

	it('cancels the arrow keydown so the page does not scroll', async () => {
		const { container } = await renderMoving();
		const keydown = new KeyboardEvent('keydown', {
			key: 'ArrowDown',
			bubbles: true,
			cancelable: true
		});

		swapButtonOf(container, ids.mytimeseries).dispatchEvent(keydown);

		expect(keydown.defaultPrevented, 'the keydown was not canceled').toBe(true);
	});

	it('leaves a modified arrow to the browser', async () => {
		const { container } = await renderMoving();
		const keydown = new KeyboardEvent('keydown', {
			key: 'ArrowLeft',
			altKey: true,
			bubbles: true,
			cancelable: true
		});

		swapButtonOf(container, ids.mytimeseries).dispatchEvent(keydown);

		expect(keydown.defaultPrevented, 'the keydown was canceled').toBe(false);
		await tick();
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('center');
	});

	it('ignores Enter repeating from the key that entered move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		handleOf(container, 'Camera').focus();
		await pressEnter({ isRepeat: false });
		await expect.poll(() => destinationsIn(container)).toHaveLength(3);

		await pressEnter({ isRepeat: true });
		await releaseEnter();

		expect(destinationsIn(container)).toHaveLength(3);
		expect(announcementIn(container)).toBe(STARTED_CAMERA);
		expect(document.activeElement).toBe(wrapperOf(container, ids.mycam));
	});

	it('ignores Enter repeating from the key that canceled move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		handleOf(container, 'Camera').focus();
		await pressEnter({ isRepeat: false });
		await expect.poll(() => destinationsIn(container)).toEqual([]);

		await pressEnter({ isRepeat: true });
		await releaseEnter();

		expect(destinationsIn(container)).toEqual([]);
		expect(announcementIn(container)).toBe('Move canceled.');
	});
});

describe('SplitView move mode: touch', () => {
	const renderMoving = async () => {
		const view = render(BoundSplitView, { props: { handles: true } });
		await startMoveWithPointer(view.container, 'Camera');
		return view;
	};

	it('previews the tapped region on the first tap without placing the pane', async () => {
		const { container, component } = await renderMoving();

		await tap(destinationOf(container, ids.mytimeseries), 'right');

		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('right');
		expect(destinationsIn(container)).toHaveLength(3);
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('moves the preview when a different region is tapped', async () => {
		const { container, component } = await renderMoving();
		await tap(destinationOf(container, ids.mytimeseries), 'right');

		await tap(destinationOf(container, ids.mytimeseries), 'left');

		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('left');
		expect(destinationsIn(container)).toHaveLength(3);
		expect(component.getLayout()).toEqual(layoutRoot);
	});

	it('places the pane when the previewed region is tapped again', async () => {
		const { container, component } = await renderMoving();
		await tap(destinationOf(container, ids.mytimeseries), 'right');

		await tap(destinationOf(container, ids.mytimeseries), 'right');

		expect(announcementIn(container)).toBe('Camera placed right of Time series.');
		expect(destinationsIn(container)).toEqual([]);
		expect(component.getLayout()).not.toEqual(layoutRoot);
	});

	it('does not place the pane when a tap returns to a region the preview left', async () => {
		const { container } = await renderMoving();
		await tap(destinationOf(container, ids.mytimeseries), 'right');
		await tap(destinationOf(container, ids.mytimeseries), 'left');

		await tap(destinationOf(container, ids.mytimeseries), 'right');

		expect(destinationsIn(container), 'a tap on the earlier region placed the pane').toHaveLength(
			3
		);
	});

	it('previews instead of placing when another destination is tapped', async () => {
		const { container } = await renderMoving();
		await tap(destinationOf(container, ids.mytimeseries), 'right');

		await tap(destinationOf(container, ids.mysensor), 'right');

		expect(previewedRegionIn(container, ids.mysensor)).toBe('right');
		expect(destinationsIn(container)).toHaveLength(3);
	});

	it('previews again when a destination is tapped after another took the preview', async () => {
		const { container } = await renderMoving();
		await tap(destinationOf(container, ids.mytimeseries), 'right');
		await tap(destinationOf(container, ids.mysensor), 'right');

		await tap(destinationOf(container, ids.mytimeseries), 'right');

		expect(destinationsIn(container)).toHaveLength(3);
		expect(previewedRegionIn(container, ids.mytimeseries)).toBe('right');
	});

	it('previews the tapped region over a selection the keyboard made on the same destination', async () => {
		const view = render(BoundSplitView, { props: { handles: true } });
		await startMoveOnFirstDestination(view.container, 'Camera');
		await userEvent.keyboard('{ArrowLeft}');
		await expect.poll(() => previewedRegionIn(view.container, ids.mytimeseries)).toBe('left');

		await tap(destinationOf(view.container, ids.mytimeseries), 'right');

		expect(previewedRegionIn(view.container, ids.mytimeseries)).toBe('right');
	});

	it('announces the tapped region', async () => {
		const { container } = await renderMoving();

		await tap(destinationOf(container, ids.mytimeseries), 'right');

		expect(announcementIn(container)).toBe('Place Camera right of Time series');
	});

	it('keeps the preview showing after the finger lifts', async () => {
		const { container } = await renderMoving();

		await tap(destinationOf(container, ids.mysensor), 'bottom');

		expect(engagementOf(container)[1]).toEqual({ bars: EDGE_BUTTONS_PER_DESTINATION, previews: 1 });
	});
});

describe('SplitView move mode: inert panes', () => {
	const inertStates = (container: Element) =>
		[ids.mycam, ...DESTINATION_IDS].map((id) => wrapperOf(container, id).inert);

	it('makes every destination pane inert and leaves the moving pane alone', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		expect(inertStates(container), 'before move mode').toEqual([false, false, false, false]);

		await startMoveWithPointer(container, 'Camera');

		expect(inertStates(container), 'in move mode').toEqual([false, true, true, true]);
	});

	it('makes the panes interactive again after a placement', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await clickRegion(destinationOf(container, ids.mytimeseries), 'center');

		await expect.poll(() => inertStates(container)).toEqual([false, false, false, false]);
	});

	it('makes the panes interactive again after Escape', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		await userEvent.keyboard('{Escape}');

		await expect.poll(() => inertStates(container)).toEqual([false, false, false, false]);
	});

	it('keeps each destination outside the inert content', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });

		await startMoveWithPointer(container, 'Camera');

		const inside = destinationsIn(container).filter((destination) =>
			destination.closest('[inert]')
		);
		expect(inside).toEqual([]);
	});

	it('reaches only the destinations and the moving pane handle with Tab', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		const visited = await tabThrough(4);

		expect(visited).toEqual([
			handleOf(container, 'Camera'),
			swapButtonOf(container, ids.mytimeseries),
			swapButtonOf(container, ids.mysensor),
			swapButtonOf(container, ids.mycam2)
		]);
	});

	it('puts the destination, not a control inside the pane, under a click', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');

		const handle = handleOf(container, 'Time series').getBoundingClientRect();

		expect(
			document.elementFromPoint(handle.left + handle.width / 2, handle.top + handle.height / 2)
		).toBe(swapButtonOf(container, ids.mytimeseries));
	});

	it('makes the resize separators inert in move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		const separators = () => [...container.querySelectorAll<HTMLElement>('[role="separator"]')];
		expect(
			separators().map((separator) => separator.inert),
			'before move mode'
		).toEqual([false, false, false]);

		await startMoveWithPointer(container, 'Camera');

		expect(
			separators().map((separator) => separator.inert),
			'in move mode'
		).toEqual([true, true, true]);
	});
});

describe('SplitView move mode: leaving the view', () => {
	const outsideButtonOf = (container: Element) => container.querySelector('button')!;

	it('cancels move mode with the layout unchanged when Tab leaves the last destination', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container, component } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveWithKeyboard(container, 'Camera');
		await tabThrough(4);
		expect(document.activeElement, 'Tab did not reach the last destination').toBe(
			swapButtonOf(container, ids.mycam2)
		);

		await userEvent.keyboard('{Tab}');

		await expect.poll(() => destinationsIn(container)).toEqual([]);
		expect(announcementIn(container)).toBe('Move canceled.');
		expect(received).toEqual([]);
		expect(component.getLayout()).toBe(layoutRoot);
	});

	it('cancels move mode when focus moves to a control outside the view', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		outsideButtonOf(container).focus();

		await expect.poll(() => destinationsIn(container)).toEqual([]);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
	});

	it('leaves focus where it went when it left the view', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithKeyboard(container, 'Camera');

		outsideButtonOf(container).focus();
		await expect.poll(() => destinationsIn(container)).toEqual([]);
		await nextFrames();

		expect(document.activeElement).toBe(outsideButtonOf(container));
	});

	it('keeps move mode when focus moves to the moving pane handle', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');

		await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
		await nextFrames();

		expect(document.activeElement).toBe(handleOf(container, 'Camera'));
		expect(destinationsIn(container)).toHaveLength(3);
	});

	it('places the pane when a destination other than the focused one is clicked', async () => {
		const received: (LayoutNode<PaneData> | undefined)[] = [];
		const { container } = render(ControlledSplitView, {
			props: { accept: true, received, handles: true }
		});
		await startMoveOnFirstDestination(container, 'Camera');

		await clickRegion(destinationOf(container, ids.mysensor), 'center');

		await expect.poll(() => received).toHaveLength(1);
		expect(announcementIn(container)).toBe('Camera swapped with Sensor stat.');
	});

	it('keeps move mode when a press inside the view leaves focus on nothing', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');
		expect(document.activeElement, 'Tab did not reach the first destination').toBe(
			swapButtonOf(container, ids.mytimeseries)
		);

		handleOf(container, 'Camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
		(document.activeElement as HTMLElement).blur();
		await tick();

		expect(destinationsIn(container)).toHaveLength(3);
	});

	it('cancels move mode when focus is lost after the press ended', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');
		expect(document.activeElement, 'Tab did not reach the first destination').toBe(
			swapButtonOf(container, ids.mytimeseries)
		);
		handleOf(container, 'Camera').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
		handleOf(container, 'Camera').dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

		(document.activeElement as HTMLElement).blur();

		await expect.poll(() => destinationsIn(container)).toEqual([]);
	});

	it('cancels instead of restarting when the pressed handle is clicked and focus lands on nothing', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveWithPointer(container, 'Camera');
		expect(document.activeElement, 'the click did not focus the moving pane').toBe(
			wrapperOf(container, ids.mycam)
		);
		const handle = handleOf(container, 'Camera');
		handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
		(document.activeElement as HTMLElement).blur();

		handle.click();
		await tick();

		expect(destinationsIn(container)).toEqual([]);
		expect(pressedStates(container)).toEqual(['false', 'false', 'false', 'false']);
	});

	it('announces nothing when focus leaves the view outside move mode', async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		handleOf(container, 'Camera').focus();

		outsideButtonOf(container).focus();
		await nextFrames();

		expect(announcementIn(container)).toBe('');
	});
});

describe('SplitView move mode: motion', () => {
	afterEach(() => setReducedMotion('no-preference'));

	const transitionOfPreview = async () => {
		const { container } = render(ControlledSplitView, { props: { accept: true, handles: true } });
		await startMoveOnFirstDestination(container, 'Camera');
		await expect.poll(() => previewIn(outerOf(container, ids.mytimeseries))).not.toBeNull();
		return getComputedStyle(previewIn(outerOf(container, ids.mytimeseries))!).transitionDuration;
	};

	it('animates the preview when motion is not reduced', async () => {
		await setReducedMotion('no-preference');

		expect(await transitionOfPreview()).not.toBe('0s');
	});

	it('does not animate the preview under prefers-reduced-motion', async () => {
		await setReducedMotion('reduce');

		expect(await transitionOfPreview()).toBe('0s');
	});
});
