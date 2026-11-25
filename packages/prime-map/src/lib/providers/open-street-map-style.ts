import type { StyleSpecification } from 'maplibre-gl';

import { TILE_SIZE } from './tile-size.ts';

/** The id of the USGS imagery layer in the OpenStreetMap style. */
export const SATELLITE_LAYER_ID = 'satellite';

/**
 * The OpenStreetMap raster style, with a USGS imagery layer shown only when `satellite` is set.
 * Satellite view toggles the `satellite` layer's `visibility`.
 */
export const getOpenStreetMapStyle = (maxzoom: number, satellite = false): StyleSpecification => ({
	version: 8,
	sources: {
		osm: {
			type: 'raster',
			tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
			tileSize: TILE_SIZE,
			attribution: '&copy; OpenStreetMap Contributors',
			maxzoom
		},
		satellite: {
			type: 'raster',
			tiles: [
				'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}'
			],
			tileSize: TILE_SIZE,
			attribution: '&copy; USGS National Map Services',
			maxzoom
		}
	},
	layers: [
		{
			id: 'osm',
			type: 'raster',
			source: 'osm'
		},
		{
			id: SATELLITE_LAYER_ID,
			type: 'raster',
			source: 'satellite',
			layout: {
				visibility: satellite ? 'visible' : 'none'
			}
		}
	]
});
