import type { Frame } from 'playwright';
import type { BrowserCommand } from 'vitest/node';

// Pixels from the box's left or top edge, or a `'<n>%'` fraction of its width or height.
export type Offset = number | `${number}%`;

export interface At {
	x: Offset;
	y: Offset;
}

type Modifier = 'Alt' | 'Shift' | 'Control' | 'Meta';

const CENTER: At = { x: '50%', y: '50%' };

function resolve(offset: Offset, size: number, scale: number) {
	return typeof offset === 'number' ? offset * scale : (Number.parseFloat(offset) / 100) * size;
}

// Scaled when the test iframe is scaled.
async function pagePoint(frame: Frame, selector: string, at: At) {
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

const mouseMove: BrowserCommand<[selector: string, at?: At]> = async (
	{ page, frame },
	selector,
	at = CENTER
) => {
	const { x, y } = await pagePoint(await frame(), selector, at);
	await page.mouse.move(x, y);
};

const mouseDown: BrowserCommand<[]> = async ({ page }) => {
	await page.mouse.down();
};

const mouseUp: BrowserCommand<[]> = async ({ page }) => {
	await page.mouse.up();
};

const keyDown: BrowserCommand<[key: Modifier]> = async ({ page }, key) => {
	await page.keyboard.down(key);
};

const keyUp: BrowserCommand<[key: Modifier]> = async ({ page }, key) => {
	await page.keyboard.up(key);
};

export const inputCommands = { mouseMove, mouseDown, mouseUp, keyDown, keyUp };

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
