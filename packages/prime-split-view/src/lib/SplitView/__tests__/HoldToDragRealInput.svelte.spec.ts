import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { cdp, page } from 'vitest/browser';

import PanePartsSplitView from './PanePartsSplitView.svelte';

const WIDE_VIEWPORT = { width: 1000, height: 1400 };
const DEFAULT_VIEWPORT = { width: 414, height: 896 };
const HOLD_SETTLE_MS = 300;
const EVENT_SETTLE_MS = 300;
const JITTER_PX = 1;
const DRAG_PX = 40;

interface ViewportPoint {
	x: number;
	y: number;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const frameScale = () => {
	const frameRect = window.frameElement?.getBoundingClientRect();
	return frameRect ? frameRect.width / window.innerWidth : 1;
};

const viewportPointOfCenter = (element: Element): ViewportPoint => {
	const rect = element.getBoundingClientRect();
	const frameRect = window.frameElement?.getBoundingClientRect();
	const scale = frameScale();
	return {
		x: (frameRect?.left ?? 0) + (rect.left + rect.width / 2) * scale,
		y: (frameRect?.top ?? 0) + (rect.top + rect.height / 2) * scale
	};
};

const countInterceptedDrags = async (handle: Element, { jitterPx }: { jitterPx: number }) => {
	const session = cdp();
	type InterceptedDrag = Parameters<Parameters<typeof session.on<'Input.dragIntercepted'>>[1]>[0];

	const intercepted: InterceptedDrag[] = [];
	const recordDrag = (drag: InterceptedDrag) => {
		intercepted.push(drag);
	};
	const start = viewportPointOfCenter(handle);
	const mouse = (
		type: 'mouseMoved' | 'mousePressed' | 'mouseReleased',
		point: ViewportPoint,
		isPressed: boolean
	) =>
		session.send('Input.dispatchMouseEvent', {
			type,
			x: point.x,
			y: point.y,
			button: type === 'mouseMoved' && !isPressed ? 'none' : 'left',
			buttons: isPressed ? 1 : 0,
			clickCount: type === 'mouseMoved' ? 0 : 1
		});
	const finishPress = async () => {
		try {
			await mouse('mouseReleased', start, false);
			const [drag] = intercepted;
			if (drag) {
				await session.send('Input.dispatchDragEvent', {
					type: 'dragCancel',
					x: start.x,
					y: start.y,
					data: drag.data
				});
			}
		} finally {
			session.off('Input.dragIntercepted', recordDrag);
			await session.send('Input.setInterceptDrags', { enabled: false });
		}
	};

	// Vitest builds its CDP handler on the first send, so a listener added before any send is lost.
	await session.send('Input.setInterceptDrags', { enabled: true });
	session.on('Input.dragIntercepted', recordDrag);
	try {
		await wait(EVENT_SETTLE_MS);
		await mouse('mouseMoved', start, false);
		await mouse('mousePressed', start, true);
		if (jitterPx > 0) {
			await mouse('mouseMoved', { x: start.x + jitterPx * frameScale(), y: start.y }, true);
		}
		await wait(HOLD_SETTLE_MS);
		await mouse('mouseMoved', { x: start.x + DRAG_PX * frameScale(), y: start.y }, true);
		await wait(EVENT_SETTLE_MS);
		return intercepted.length;
	} finally {
		await finishPress();
	}
};

beforeAll(() => page.viewport(WIDE_VIEWPORT.width, WIDE_VIEWPORT.height));

afterAll(() => page.viewport(DEFAULT_VIEWPORT.width, DEFAULT_VIEWPORT.height));

describe('SplitView.DragTrigger: holding a control with a real mouse', () => {
	it('starts a pane drag when the press is held and then dragged', async () => {
		const { container } = render(PanePartsSplitView, { props: { variant: 'header' } });
		const handle = container.querySelector<HTMLElement>('[aria-label="Move Camera"]')!;

		const dragsStarted = await countInterceptedDrags(handle, { jitterPx: 0 });

		expect(dragsStarted).toBe(1);
	});

	it('starts a pane drag when the pointer moves 1px before the hold ends', async () => {
		const { container } = render(PanePartsSplitView, { props: { variant: 'header' } });
		const handle = container.querySelector<HTMLElement>('[aria-label="Move Camera"]')!;

		const dragsStarted = await countInterceptedDrags(handle, { jitterPx: JITTER_PX });

		expect(dragsStarted).toBe(1);
	});
});
