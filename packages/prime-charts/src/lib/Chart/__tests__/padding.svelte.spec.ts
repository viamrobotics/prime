import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import TooltipChart from './fixtures/TooltipChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const POINT_COUNT = 13;
const HOVERED_INDEX = 6;
const CLIP_OVERHANG = 1;
const LAYOUT_UNIT = 1 / 64;

const points = Array.from({ length: POINT_COUNT }, (_, index) => ({
	x: new Date(START + index * MINUTE),
	y: index
}));

interface Box {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

const contentBoxOf = (element: Element): Box => {
	const rect = element.getBoundingClientRect();
	const style = getComputedStyle(element);
	return {
		left: rect.left + parseFloat(style.paddingLeft),
		top: rect.top + parseFloat(style.paddingTop),
		right: rect.right - parseFloat(style.paddingRight),
		bottom: rect.bottom - parseFloat(style.paddingBottom)
	};
};

const clipBoxOf = (container: Element): Box => {
	const clipped = container.querySelector<SVGGElement>('g[clip-path]')!;
	const rect = container.querySelector<SVGRectElement>('clipPath rect')!;
	const matrix = clipped.getScreenCTM()!;
	const left = matrix.e + rect.x.baseVal.value;
	const top = matrix.f + rect.y.baseVal.value;
	return {
		left,
		top,
		right: left + rect.width.baseVal.value,
		bottom: top + rect.height.baseVal.value
	};
};

const sidesOutside = (inner: Box, outer: Box, tolerance: number) =>
	[
		inner.left < outer.left - tolerance && 'left',
		inner.top < outer.top - tolerance && 'top',
		inner.right > outer.right + tolerance && 'right',
		inner.bottom > outer.bottom + tolerance && 'bottom'
	].filter(Boolean);

const renderPadded = async () => {
	const { container } = render(TooltipChart, {
		props: {
			series: [{ name: 'Reading', points }],
			hasAxes: true,
			xFormat: () => 'time',
			plotClass: 'p-4'
		}
	});
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	const plot = container.querySelector<HTMLElement>('[data-part="plot"]')!;
	expect(getComputedStyle(plot).paddingLeft, 'plot padding from its class').toBe('16px');
	return { container, plot };
};

describe('Chart.Plot with padding', () => {
	it('clips the line to the drawing area inside the content box', async () => {
		const { container, plot } = await renderPadded();
		const svg = container.querySelector('svg')!.getBoundingClientRect();

		const clip = clipBoxOf(container);

		expect(sidesOutside(clip, contentBoxOf(plot), CLIP_OVERHANG)).toEqual([]);
		const sizeGaps = {
			width: Math.abs(clip.right - clip.left - (svg.width + 2 * CLIP_OVERHANG)),
			height: Math.abs(clip.bottom - clip.top - (svg.height + 2 * CLIP_OVERHANG))
		};

		expect(
			Math.max(sizeGaps.width, sizeGaps.height),
			`clip size off the svg box plus the overhang by ${JSON.stringify(sizeGaps)}, where Chromium snaps the svg box to a 1/64px layout unit`
		).toBeLessThanOrEqual(LAYOUT_UNIT / 2);
	});

	it('draws the line inside the content box', async () => {
		const { container, plot } = await renderPadded();
		const line = container.querySelector('path')!.getBoundingClientRect();

		expect(sidesOutside(line, contentBoxOf(plot), CLIP_OVERHANG)).toEqual([]);
	});

	it('shows the tooltip for the point under the pointer', async () => {
		const { container, plot } = await renderPadded();
		const path = container.querySelector<SVGPathElement>('path')!;
		const vertices = [...(path.getAttribute('d') ?? '').matchAll(/(-?[\d.]+),(-?[\d.]+)/g)];
		const [, x, y] = vertices[HOVERED_INDEX];
		const onScreen = new DOMPoint(Number(x), Number(y)).matrixTransform(path.getScreenCTM()!);
		const plotRect = plot.getBoundingClientRect();

		await userEvent.hover(plot, {
			position: { x: onScreen.x - plotRect.left, y: onScreen.y - plotRect.top }
		});

		await expect
			.poll(() =>
				[...(container.querySelector('[data-part="tooltip"]')?.children ?? [])].map((line) =>
					line.textContent?.trim()
				)
			)
			.toEqual(['Reading', 'time', String(HOVERED_INDEX)]);
	});
});
