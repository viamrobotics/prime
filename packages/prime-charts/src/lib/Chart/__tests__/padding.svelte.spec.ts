import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import PaddedChart from './PaddedChart.svelte';

const START = Date.parse('2026-01-01T00:00:00Z');
const MINUTE = 60_000;
const POINT_COUNT = 13;
const HOVERED_INDEX = 6;
const CLIP_OVERHANG = 1;

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

const expectInside = (inner: Box, outer: Box, tolerance: number) => {
	expect(inner.left).toBeGreaterThanOrEqual(outer.left - tolerance);
	expect(inner.top).toBeGreaterThanOrEqual(outer.top - tolerance);
	expect(inner.right).toBeLessThanOrEqual(outer.right + tolerance);
	expect(inner.bottom).toBeLessThanOrEqual(outer.bottom + tolerance);
};

const renderPadded = async () => {
	const { container } = render(PaddedChart, { props: { points } });
	await expect.poll(() => container.querySelector('path')).not.toBeNull();
	const plot = container.querySelector<HTMLElement>('[data-part="plot"]')!;
	expect(parseFloat(getComputedStyle(plot).paddingLeft)).toBeGreaterThan(0);
	return { container, plot };
};

describe('Chart.Plot with padding', () => {
	it('clips the line to the drawing area inside the content box', async () => {
		const { container, plot } = await renderPadded();
		const svg = container.querySelector('svg')!.getBoundingClientRect();

		const clip = clipBoxOf(container);
		expectInside(clip, contentBoxOf(plot), CLIP_OVERHANG);
		expect(clip.right - clip.left).toBe(svg.width + 2 * CLIP_OVERHANG);
		expect(clip.bottom - clip.top).toBe(svg.height + 2 * CLIP_OVERHANG);
	});

	it('draws the line inside the content box', async () => {
		const { container, plot } = await renderPadded();
		const line = container.querySelector('path')!.getBoundingClientRect();

		expectInside(line, contentBoxOf(plot), CLIP_OVERHANG);
	});

	it('shows the tooltip for the point under the pointer', async () => {
		const { container, plot } = await renderPadded();
		const path = container.querySelector<SVGPathElement>('path')!;
		const vertices = [...(path.getAttribute('d') ?? '').matchAll(/(-?[\d.]+),(-?[\d.]+)/g)];
		expect(vertices).toHaveLength(POINT_COUNT);
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
