import type { StyleSpecification } from 'maplibre-gl';
import { MapProviders, type MapProvider } from './types';
import { DEFAULT_MAX_ZOOM } from './zoom';

const tileSize = 256;

const getGoogleMapsStyle = (
  apiKey: string,
  maxzoom: number
): StyleSpecification => ({
  version: 8,
  sources: {
    [MapProviders.googleMaps]: {
      type: 'raster',
      tiles: [
        `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${apiKey}`,
      ],
      tileSize,
      attribution: '&copy; Google Maps',
      maxzoom,
    },
    satellite: {
      type: 'raster',
      tiles: [
        `https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&key=${apiKey}`,
      ],
      tileSize: 256,
      attribution: '&copy; Google Maps',
      maxzoom,
    },
  },
  layers: [
    {
      id: MapProviders.googleMaps,
      type: 'raster',
      source: MapProviders.googleMaps,
    },
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      layout: {
        visibility: 'none',
      },
    },
  ],
});

const getOpenStreetMapStyle = (maxzoom: number): StyleSpecification => ({
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom,
    },
    satellite: {
      type: 'raster',
      tiles: [
        'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize,
      attribution: '&copy; USGS National Map Services',
      maxzoom,
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      layout: {
        visibility: 'none',
      },
    },
  ],
});

export const getStyleSpecification = (
  provider: MapProvider,
  apiKey?: string,
  maxZoom?: number
): StyleSpecification => {
  const maxzoom = maxZoom ?? DEFAULT_MAX_ZOOM;
  switch (provider) {
    case MapProviders.googleMaps: {
      if (!apiKey) {
        // eslint-disable-next-line no-console
        console.warn('Google Maps API key is required');
        return getOpenStreetMapStyle(maxzoom);
      }
      return getGoogleMapsStyle(apiKey, maxzoom);
    }
    case MapProviders.openStreet: {
      return getOpenStreetMapStyle(maxzoom);
    }
  }
};
