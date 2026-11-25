export interface LngLatValue {
	lng: number;
	lat: number;
}

const isLngLatValue = (value: unknown): value is LngLatValue =>
	typeof value === 'object' &&
	value !== null &&
	'lng' in value &&
	typeof value.lng === 'number' &&
	'lat' in value &&
	typeof value.lat === 'number';

/**
 * The position an object's `userData.lngLat` asks for: one point, a list of points for a line,
 * or `undefined` when it holds neither.
 */
export const readLngLatUserData = (value: unknown): LngLatValue | LngLatValue[] | undefined => {
	if (Array.isArray(value)) {
		return value.every(isLngLatValue) ? value : undefined;
	}
	return isLngLatValue(value) ? value : undefined;
};
