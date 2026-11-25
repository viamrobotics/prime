import type { StyleSpecification } from 'maplibre-gl';

import { TILE_SIZE } from './tile-size.ts';

export type GoogleMapsType = 'roadmap' | 'satellite';

/**
 * The Google Maps raster style. Its tiles use the `google://` protocol, so call
 * `registerGoogleMapsProtocol` before a map loads it.
 */
export const getGoogleMapsStyle = (
	apiKey: string,
	maxzoom: number,
	mapType: GoogleMapsType = 'roadmap'
): StyleSpecification => ({
	version: 8,
	sources: {
		google: {
			type: 'raster',
			tiles: [`google://${mapType}/{z}/{x}/{y}?key=${apiKey}`],
			tileSize: TILE_SIZE,
			attribution: '&copy; Google Maps',
			maxzoom
		}
	},
	layers: [
		{
			id: 'google',
			type: 'raster',
			source: 'google'
		}
	]
});
