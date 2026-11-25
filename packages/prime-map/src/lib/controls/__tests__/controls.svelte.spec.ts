import type { ComponentProps } from 'svelte';
import type { Map } from 'maplibre-gl';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';

import '../../../../test/tailwind.css';
import { blockMapNetwork } from '../../../../test/map-network.ts';
import ControlsMap from './fixtures/ControlsMap.svelte';

const LOAD_TIMEOUT = { timeout: 10_000 };
const STORAGE_KEY = 'prime-map-test-view';

type ControlsProps = Omit<ComponentProps<typeof ControlsMap>, 'onCreate'>;

const renderMap = async (props: ControlsProps) => {
	const onCreate = vi.fn<(map: Map) => void>();
	const screen = render(ControlsMap, { props: { ...props, onCreate } });
	await vi.waitFor(() => expect(onCreate).toHaveBeenCalled(), LOAD_TIMEOUT);
	const [map] = onCreate.mock.calls[0];
	return { screen, map };
};

beforeEach(() => {
	blockMapNetwork();
	vi.spyOn(console, 'error').mockImplementation(() => {});
	localStorage.removeItem(STORAGE_KEY);
});

afterEach(() => {
	vi.restoreAllMocks();
	localStorage.removeItem(STORAGE_KEY);
});

describe('SatelliteControls', () => {
	it('shows and hides the OpenStreetMap satellite layer', async () => {
		const { map } = await renderMap({ parts: ['satellite'] });
		const checkbox = page.getByRole('checkbox', { name: 'Satellite' });

		await userEvent.click(checkbox);
		await vi.waitFor(() =>
			expect(map.getLayoutProperty('satellite', 'visibility')).toBe('visible')
		);
		await expect.element(checkbox).toBeChecked();

		await userEvent.click(checkbox);
		await vi.waitFor(() => expect(map.getLayoutProperty('satellite', 'visibility')).toBe('none'));
	});
});

describe('NavigationControls', () => {
	it('adds the zoom buttons and removes them on unmount', async () => {
		const { screen } = await renderMap({ parts: ['navigation'] });

		await expect.element(page.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();

		await screen.rerender({ parts: [] });

		expect(document.querySelector('.maplibregl-ctrl-zoom-in')).toBeNull();
	});

	it('turns the map back to north and flat from the compass', async () => {
		const { map } = await renderMap({ parts: ['navigation'] });
		map.jumpTo({ bearing: 45, pitch: 30 });

		await page.getByRole('button', { name: 'Drag to rotate map, click to reset north' }).click();

		await vi.waitFor(() => {
			expect(map.getBearing()).toBe(0);
			expect(map.getPitch()).toBe(0);
		}, LOAD_TIMEOUT);
	});

	it('leaves out the zoom buttons when showZoom is false', async () => {
		await renderMap({ parts: ['navigation'], showZoom: false });

		await expect
			.element(page.getByRole('button', { name: 'Drag to rotate map, click to reset north' }))
			.toBeInTheDocument();
		expect(document.querySelector('.maplibregl-ctrl-zoom-in')).toBeNull();
	});
});

describe('FollowControls', () => {
	it('is disabled until both lng and lat are set', async () => {
		await renderMap({ parts: ['follow'] });

		await expect.element(page.getByRole('checkbox', { name: 'Follow' })).toBeDisabled();
	});

	it('centers the map on the point while following', async () => {
		const { map } = await renderMap({ parts: ['follow'], lng: 12, lat: 34 });

		await userEvent.click(page.getByRole('checkbox', { name: 'Follow' }));

		await vi.waitFor(() => {
			expect(map.getCenter().lng).toBeCloseTo(12);
			expect(map.getCenter().lat).toBeCloseTo(34);
		});
	});

	it('follows a point on the equator and the prime meridian', async () => {
		const { map } = await renderMap({ parts: ['follow'], lng: 0, lat: 0 });
		map.jumpTo({ center: [10, 10] });

		await userEvent.click(page.getByRole('checkbox', { name: 'Follow' }));

		await vi.waitFor(() => {
			expect(map.getCenter().lng).toBeCloseTo(0);
			expect(map.getCenter().lat).toBeCloseTo(0);
		});
	});

	it('stops following on a wheel over the map', async () => {
		const { map } = await renderMap({ parts: ['follow'], lng: 12, lat: 34, following: true });
		const checkbox = page.getByRole('checkbox', { name: 'Follow' });
		await expect.element(checkbox).toBeChecked();

		map.fire('wheel');

		await expect.element(checkbox).not.toBeChecked();
	});
});

describe('CenterControls', () => {
	it('shows the map center', async () => {
		const { map } = await renderMap({ parts: ['center'] });

		map.jumpTo({ center: [8, 9] });

		await expect.element(page.getByRole('spinbutton', { name: 'Lat' })).toHaveValue(9);
		await expect.element(page.getByRole('spinbutton', { name: 'Lng' })).toHaveValue(8);
	});

	it('moves the map to a typed latitude', async () => {
		const { map } = await renderMap({ parts: ['center'] });

		await userEvent.fill(page.getByRole('spinbutton', { name: 'Lat' }), '20');

		expect(map.getCenter().lat).toBeCloseTo(20);
	});

	it('saves the view under storageKey on move and restores it on the next mount', async () => {
		const first = await renderMap({ parts: ['center'], storageKey: STORAGE_KEY });
		first.map.jumpTo({ center: [3, 4], zoom: 6 });
		first.screen.unmount();

		const { map } = await renderMap({ parts: ['center'], storageKey: STORAGE_KEY });

		expect(map.getCenter().lng).toBeCloseTo(3);
		expect(map.getCenter().lat).toBeCloseTo(4);
		expect(map.getZoom()).toBeCloseTo(6);
	});

	it('saves nothing without a storageKey', async () => {
		const setItem = vi.spyOn(Storage.prototype, 'setItem');
		const { map } = await renderMap({ parts: ['center'] });

		map.jumpTo({ center: [3, 4], zoom: 6 });

		expect(setItem).not.toHaveBeenCalled();
	});
});

describe('MapLibreMarker', () => {
	it('adds a rotated marker and removes it on unmount', async () => {
		const { screen } = await renderMap({ parts: ['marker'], lng: 1, lat: 1 });

		const marker = document.querySelector<HTMLElement>('.maplibregl-marker');
		expect(marker).not.toBeNull();
		expect(marker?.style.transform).toContain('rotateZ(45deg)');

		await screen.rerender({ parts: [] });

		expect(document.querySelector('.maplibregl-marker')).toBeNull();
	});
});

describe('DirectionalMarker', () => {
	it('draws the arrow as the marker element', async () => {
		await renderMap({ parts: ['directional-marker'] });

		await vi.waitFor(() => {
			expect(document.querySelectorAll('.maplibregl-marker')).toHaveLength(1);
			expect(document.querySelector('.maplibregl-marker svg path')).not.toBeNull();
		});
	});
});
