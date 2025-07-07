import type { StyleSpecification } from 'maplibre-gl';
import { MapProviders, type MapProvider } from './types';

const tileSize = 256;
const maxzoom = 20;

const getGoogleMapsStyle = (apiKey: string): StyleSpecification => ({
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

const getOpenStreetMapStyle = (): StyleSpecification => ({
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
  apiKey?: string
): StyleSpecification => {
  switch (provider) {
    case 'google-maps': {
      if (!apiKey) {
        // eslint-disable-next-line no-console
        console.warn('Google Maps API key is required');
        return getOpenStreetMapStyle();
      }
      return getGoogleMapsStyle(apiKey);
    }
    case 'open-street': {
      return getOpenStreetMapStyle();
    }
  }
};

// Legacy export for backward compatibility
export const style = getOpenStreetMapStyle();
