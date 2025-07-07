import { describe, it, expect, vi } from 'vitest';

// Mock maplibre-gl module to avoid URL.createObjectURL issues
vi.mock('maplibre-gl', () => ({
  LngLat: class {
    constructor(
      public lng: number,
      public lat: number
    ) {}
  },
  Map: vi.fn(),
  NavigationControl: vi.fn(),
  GeolocateControl: vi.fn(),
  FullscreenControl: vi.fn(),
  ScaleControl: vi.fn(),
}));

import { getStyleSpecification } from '../style';
import { MapProviders } from '../types';

describe('MapLibre Provider', () => {
  describe('getStyle', () => {
    it('should return OpenStreetMap style for open-streets provider', () => {
      const style = getStyleSpecification('open-street');

      expect(style.version).toBe(8);
      expect(style.sources).toHaveProperty('osm');
      expect(style.sources).toHaveProperty('satellite');
      expect(style.layers).toHaveLength(2);
    });

    it('should return Google Maps style for google-maps provider with valid API key', () => {
      const style = getStyleSpecification(
        MapProviders.googleMaps,
        'test_api_key'
      );

      expect(style.version).toBe(8);
      expect(style.sources).toHaveProperty('google-maps');
      expect(style.sources).toHaveProperty('satellite');
      expect(style.layers).toHaveLength(2);
    });

    it('should fallback to OpenStreetMap when Google Maps API key is not configured', () => {
      const style = getStyleSpecification(MapProviders.googleMaps);

      expect(style.version).toBe(8);
      expect(style.sources).toHaveProperty('osm');
      expect(style.sources).toHaveProperty('satellite');
    });
  });
});
