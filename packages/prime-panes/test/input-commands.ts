import type { CDPSession, Frame, Page } from 'playwright';
import type { BrowserCommand } from 'vitest/node';

// Pixels from the box's left or top edge, or a `'<n>%'` fraction of its width or height.
export type Offset = number | `${number}%`;

export interface Point {
	x: Offset;
	y: Offset;
}

type MouseButton = 'left' | 'right' | 'middle';

const CENTER: Point = { x: '50%', y: '50%' };

const sessions = new WeakMap<Page, Promise<CDPSession>>();

function sessionFor(page: Page) {
	let session = sessions.get(page);
	if (!session) {
		session = page.context().newCDPSession(page);
		sessions.set(page, session);
	}
	return session;
}

function resolve(offset: Offset, size: number, scale: number) {
	return typeof offset === 'number' ? offset * scale : (Number.parseFloat(offset) / 100) * size;
}

// Scaled when the test iframe is scaled.
async function pagePoint(frame: Frame, selector: string, at: Point) {
	const locator = frame.locator(selector);
	const box = await locator.boundingBox();
	if (!box) throw new Error(`No box for ${selector}`);
	const cssWidth = await locator.evaluate((element) => element.getBoundingClientRect().width);
	const scale = box.width / cssWidth;
	return {
		x: box.x + resolve(at.x, box.width, scale),
		y: box.y + resolve(at.y, box.height, scale)
	};
}

const mouseMove: BrowserCommand<[selector: string, at?: Point]> = async (
	{ page, frame },
	selector,
	at = CENTER
) => {
	const { x, y } = await pagePoint(await frame(), selector, at);
	await page.mouse.move(x, y);
};

const mouseDown: BrowserCommand<[button?: MouseButton]> = async ({ page }, button = 'left') => {
	await page.mouse.down({ button });
};

const mouseUp: BrowserCommand<[button?: MouseButton]> = async ({ page }, button = 'left') => {
	await page.mouse.up({ button });
};

async function dispatchTouch(
	page: Page,
	type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel',
	point?: { x: number; y: number }
) {
	await (
		await sessionFor(page)
	).send('Input.dispatchTouchEvent', {
		type,
		touchPoints: point ? [{ ...point, id: 1 }] : []
	});
}

const touchStart: BrowserCommand<[selector: string, at?: Point]> = async (
	{ page, frame },
	selector,
	at = CENTER
) => {
	await dispatchTouch(page, 'touchStart', await pagePoint(await frame(), selector, at));
};

const touchMove: BrowserCommand<[selector: string, at?: Point]> = async (
	{ page, frame },
	selector,
	at = CENTER
) => {
	await dispatchTouch(page, 'touchMove', await pagePoint(await frame(), selector, at));
};

const touchEnd: BrowserCommand<[]> = async ({ page }) => {
	await dispatchTouch(page, 'touchEnd');
};

const touchCancel: BrowserCommand<[]> = async ({ page }) => {
	await dispatchTouch(page, 'touchCancel');
};

export const inputCommands = {
	mouseMove,
	mouseDown,
	mouseUp,
	touchStart,
	touchMove,
	touchEnd,
	touchCancel
};

type InputCommands = {
	[Name in keyof typeof inputCommands]: (typeof inputCommands)[Name] extends BrowserCommand<
		infer Args
	>
		? (...args: Args) => Promise<void>
		: never;
};

declare module 'vitest/browser' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmentation merges into an interface, which a type alias cannot do
	interface BrowserCommands extends InputCommands {}
}
