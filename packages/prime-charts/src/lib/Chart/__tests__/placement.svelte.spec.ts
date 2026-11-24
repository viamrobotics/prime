import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import PlacementPart from './fixtures/PlacementPart.svelte';
import PlacementSwap from './fixtures/PlacementSwap.svelte';
import PlacementTwoPlots from './fixtures/PlacementTwoPlots.svelte';

const insideParts = ['Line', 'XAxis', 'YAxis', 'Grid', 'Tooltip'] as const;
const outsideParts = ['Legend', 'Table'] as const;

const thrownMessage = (run: () => unknown) => {
	try {
		run();
	} catch (error) {
		return (error instanceof Error ? error.message : String(error)).split('\n')[0];
	}
	return 'did not throw';
};

const plotSvg = (container: Element) => container.querySelector('[data-part="plot"] svg');

const isFreshPlotDrawn = (container: Element, before: Element | null) => {
	const current = container.querySelector('[data-part="plot"]');
	return current !== null && current !== before && plotSvg(container) !== null;
};

describe('Chart placement', () => {
	it('throws for two Chart.Plots in one Chart', () => {
		const message = thrownMessage(() => render(PlacementTwoPlots));

		expect(message).toBe('A Chart takes one Chart.Plot.');
	});

	it.each(
		insideParts.flatMap(
			(part) =>
				[
					{ part, placement: 'chart' },
					{ part, placement: 'no-chart' }
				] as const
		)
	)('throws for a Chart.$part placed in $placement outside Chart.Plot', ({ part, placement }) => {
		const message = thrownMessage(() => render(PlacementPart, { props: { part, placement } }));

		expect(message).toBe(`Chart.${part} must be placed inside Chart.Plot.`);
	});

	it.each(outsideParts)('throws for a Chart.%s inside Chart.Plot', (part) => {
		const message = thrownMessage(() =>
			render(PlacementPart, { props: { part, placement: 'plot' } })
		);

		expect(message).toBe(`Chart.${part} must be placed outside Chart.Plot.`);
	});

	it.each([
		{ swap: 'keyed', first: { mode: 'key', key: 0 }, second: { mode: 'key', key: 1 } },
		{
			swap: 'if/else',
			first: { mode: 'if', isFirst: true },
			second: { mode: 'if', isFirst: false }
		}
	] as const)('draws the plot after an $swap swap', async ({ first, second }) => {
		const { container, rerender } = render(PlacementSwap, { props: first });
		await expect.poll(() => plotSvg(container)).not.toBeNull();
		const before = container.querySelector('[data-part="plot"]');

		await rerender(second);

		await expect
			.poll(() => isFreshPlotDrawn(container, before), {
				message: 'a new plot replaced the old one and drew its svg'
			})
			.toBe(true);
	});
});
