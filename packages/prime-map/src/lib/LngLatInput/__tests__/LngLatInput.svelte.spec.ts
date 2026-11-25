import type { LngLat } from 'maplibre-gl';

import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import LngLatInput from '../LngLatInput.svelte';

const field = (name: 'Lat' | 'Lng') => page.getByRole('spinbutton', { name });

const lastPair = (oninput: ReturnType<typeof vi.fn<(lngLat: LngLat) => void>>) => {
	const [lngLat] = oninput.mock.lastCall ?? [];
	return lngLat;
};

describe('LngLatInput', () => {
	it('names the pair "Latitude, longitude" by default', async () => {
		render(LngLatInput, { props: { oninput: vi.fn() } });

		await expect
			.element(page.getByRole('group', { name: 'Latitude, longitude' }))
			.toBeInTheDocument();
	});

	it('names the pair from label', async () => {
		render(LngLatInput, { props: { label: 'Obstacle', oninput: vi.fn() } });

		await expect.element(page.getByRole('group', { name: 'Obstacle' })).toBeInTheDocument();
	});

	it('shows lat and lng in their fields', async () => {
		render(LngLatInput, { props: { lng: 10, lat: 20, oninput: vi.fn() } });

		await expect.element(field('Lat')).toHaveValue(20);
		await expect.element(field('Lng')).toHaveValue(10);
	});

	it('calls oninput with the typed latitude and the current longitude', async () => {
		const oninput = vi.fn<(lngLat: LngLat) => void>();
		render(LngLatInput, { props: { lng: 10, lat: 20, oninput } });

		await userEvent.fill(field('Lat'), '45');

		expect(lastPair(oninput)?.lat).toBe(45);
		expect(lastPair(oninput)?.lng).toBe(10);
	});

	it('calls oninput with the typed longitude and the current latitude', async () => {
		const oninput = vi.fn<(lngLat: LngLat) => void>();
		render(LngLatInput, { props: { lng: 10, lat: 20, oninput } });

		await userEvent.fill(field('Lng'), '-70');

		expect(lastPair(oninput)?.lng).toBe(-70);
		expect(lastPair(oninput)?.lat).toBe(20);
	});

	it('fills a missing coordinate with 0', async () => {
		const oninput = vi.fn<(lngLat: LngLat) => void>();
		render(LngLatInput, { props: { oninput } });

		await userEvent.fill(field('Lat'), '5');

		expect(lastPair(oninput)?.lng).toBe(0);
	});

	it('does not call oninput for an empty field', async () => {
		const oninput = vi.fn<(lngLat: LngLat) => void>();
		render(LngLatInput, { props: { lng: 10, lat: 20, oninput } });

		await userEvent.fill(field('Lat'), '');

		expect(oninput).not.toHaveBeenCalled();
	});

	it('marks both fields readonly when readonly is set', async () => {
		render(LngLatInput, { props: { lng: 10, lat: 20, readonly: true, oninput: vi.fn() } });

		await expect.element(field('Lat')).toHaveAttribute('readonly');
		await expect.element(field('Lng')).toHaveAttribute('readonly');
	});
});
