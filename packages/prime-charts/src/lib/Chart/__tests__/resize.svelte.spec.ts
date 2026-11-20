import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import RootChart from './RootChart.svelte';

const INITIAL_WIDTH = 400;
const RESIZED_WIDTH = 250;

const points = [
	{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
	{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
];

describe('Chart resize', () => {
	it('redraws at the new width when the container changes size', async () => {
		const { container } = render(RootChart, {
			props: { series: [{ name: 'Reading', points }], width: INITIAL_WIDTH }
		});
		const path = () => container.querySelector('path')?.getAttribute('d') ?? '';

		await expect.poll(path).toMatch(new RegExp(`L${INITIAL_WIDTH},`));

		const frame = container.querySelector<HTMLElement>('[data-testid="frame"]');
		frame!.style.width = `${RESIZED_WIDTH}px`;

		await expect.poll(path).toMatch(new RegExp(`L${RESIZED_WIDTH},`));
	});
});
