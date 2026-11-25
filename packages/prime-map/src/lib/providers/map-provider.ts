export const MapProviders = {
	openStreet: 'open-street',
	googleMaps: 'google-maps'
} as const;

export type MapProvider = (typeof MapProviders)[keyof typeof MapProviders];
