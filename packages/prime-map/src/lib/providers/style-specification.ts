import type { StyleSpecification } from 'maplibre-gl';

import { DEFAULT_MAX_ZOOM } from './default-max-zoom.ts';
import { registerGoogleMapsProtocol } from './google-maps-protocol.ts';
import { getGoogleMapsStyle } from './google-maps-style.ts';
import { MapProviders, type MapProvider } from './map-provider.ts';
import { getOpenStreetMapStyle } from './open-street-map-style.ts';

const getGoogleMapsStyleOrFallback = async (
	apiKey: string | undefined,
	maxZoom: number,
	satelliteMode: boolean
): Promise<StyleSpecification> => {
	if (!apiKey) {
		console.warn('Google Maps API key is required, falling back to OpenStreetMap');
		return getOpenStreetMapStyle(maxZoom, satelliteMode);
	}

	try {
		const success = await registerGoogleMapsProtocol(apiKey);
		if (!success) {
			console.warn('Google Maps protocol registration failed, falling back to OpenStreetMap');
			return getOpenStreetMapStyle(maxZoom, satelliteMode);
		}

		return getGoogleMapsStyle(apiKey, maxZoom, satelliteMode ? 'satellite' : 'roadmap');
	} catch (error) {
		console.error('Failed to create Google Maps style, falling back to OpenStreetMap:', error);
		return getOpenStreetMapStyle(maxZoom, satelliteMode);
	}
};

/**
 * The style for a provider, showing satellite imagery when `satelliteMode` is set. Google Maps
 * without a working `apiKey` falls back to OpenStreetMap with a console warning.
 */
export const getStyleSpecification = async (
	provider: MapProvider,
	apiKey?: string,
	maxZoom = DEFAULT_MAX_ZOOM,
	satelliteMode = false
): Promise<StyleSpecification> => {
	switch (provider) {
		case MapProviders.googleMaps: {
			return getGoogleMapsStyleOrFallback(apiKey, maxZoom, satelliteMode);
		}
		case MapProviders.openStreet: {
			return getOpenStreetMapStyle(maxZoom, satelliteMode);
		}
	}
};
