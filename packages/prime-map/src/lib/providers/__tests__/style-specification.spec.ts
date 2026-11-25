import { afterEach, describe, expect, it, vi } from 'vitest';

import { registerGoogleMapsProtocol } from '../google-maps-protocol.ts';
import { MapProviders } from '../map-provider.ts';
import { getStyleSpecification } from '../style-specification.ts';

vi.mock('../google-maps-protocol.ts', () => ({
	registerGoogleMapsProtocol: vi.fn()
}));

const tilesOf = (source: unknown) =>
	typeof source === 'object' && source !== null && 'tiles' in source ? source.tiles : undefined;

const maxZoomOf = (source: unknown) =>
	typeof source === 'object' && source !== null && 'maxzoom' in source ? source.maxzoom : undefined;

describe('getStyleSpecification', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.mocked(registerGoogleMapsProtocol).mockReset();
	});

	it('returns the OpenStreetMap style with a hidden satellite layer', async () => {
		const style = await getStyleSpecification(MapProviders.openStreet);

		expect(style.version).toBe(8);
		expect(Object.keys(style.sources)).toEqual(['osm', 'satellite']);
		expect(style.layers.map((layer) => layer.id)).toEqual(['osm', 'satellite']);
		expect(style.layers[1]).toMatchObject({ layout: { visibility: 'none' } });
	});

	it('defaults every source to a max zoom of 21', async () => {
		const style = await getStyleSpecification(MapProviders.openStreet);

		expect(maxZoomOf(style.sources.osm)).toBe(21);
		expect(maxZoomOf(style.sources.satellite)).toBe(21);
	});

	it('passes the max zoom to every source', async () => {
		const style = await getStyleSpecification(MapProviders.openStreet, undefined, 15);

		expect(maxZoomOf(style.sources.osm)).toBe(15);
		expect(maxZoomOf(style.sources.satellite)).toBe(15);
	});

	it('returns the Google Maps road map style once the protocol registers', async () => {
		vi.mocked(registerGoogleMapsProtocol).mockResolvedValue(true);

		const style = await getStyleSpecification(MapProviders.googleMaps, 'test_api_key');

		expect(registerGoogleMapsProtocol).toHaveBeenCalledWith('test_api_key');
		expect(Object.keys(style.sources)).toEqual(['google']);
		expect(style.layers).toHaveLength(1);
		expect(tilesOf(style.sources.google)).toEqual([
			'google://roadmap/{z}/{x}/{y}?key=test_api_key'
		]);
	});

	it('asks Google Maps for satellite tiles in satellite mode', async () => {
		vi.mocked(registerGoogleMapsProtocol).mockResolvedValue(true);

		const style = await getStyleSpecification(MapProviders.googleMaps, 'key', 21, true);

		expect(tilesOf(style.sources.google)).toEqual(['google://satellite/{z}/{x}/{y}?key=key']);
	});

	it('falls back to OpenStreetMap without a Google Maps API key', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const style = await getStyleSpecification(MapProviders.googleMaps);

		expect(Object.keys(style.sources)).toEqual(['osm', 'satellite']);
		expect(registerGoogleMapsProtocol).not.toHaveBeenCalled();
		expect(warn).toHaveBeenCalledOnce();
	});

	it('falls back to OpenStreetMap when the protocol does not register', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		vi.mocked(registerGoogleMapsProtocol).mockResolvedValue(false);

		const style = await getStyleSpecification(MapProviders.googleMaps, 'bad_key');

		expect(Object.keys(style.sources)).toEqual(['osm', 'satellite']);
	});

	it('falls back to OpenStreetMap when registering the protocol throws', async () => {
		const error = vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.mocked(registerGoogleMapsProtocol).mockRejectedValue(new Error('offline'));

		const style = await getStyleSpecification(MapProviders.googleMaps, 'key');

		expect(Object.keys(style.sources)).toEqual(['osm', 'satellite']);
		expect(error).toHaveBeenCalledOnce();
	});
});
