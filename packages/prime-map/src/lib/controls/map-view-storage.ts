export interface StoredMapView {
	center: { lng: number; lat: number };
	zoom: number;
}

const isStoredMapView = (value: unknown): value is StoredMapView => {
	if (typeof value !== 'object' || value === null) return false;
	if (!('zoom' in value) || typeof value.zoom !== 'number') return false;
	if (!('center' in value) || typeof value.center !== 'object' || value.center === null) {
		return false;
	}
	const { center } = value;
	return (
		'lng' in center &&
		typeof center.lng === 'number' &&
		'lat' in center &&
		typeof center.lat === 'number'
	);
};

/** The map view saved under `key`, or `undefined` when none is saved or it does not parse. */
export const readMapView = (key: string): StoredMapView | undefined => {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) return undefined;
		const parsed: unknown = JSON.parse(raw);
		return isStoredMapView(parsed) ? parsed : undefined;
	} catch {
		return undefined;
	}
};

/** Saves the map view under `key`. A storage that refuses the write is skipped. */
export const writeMapView = (key: string, view: StoredMapView): void => {
	try {
		localStorage.setItem(key, JSON.stringify(view));
	} catch {
		// Storage can be full or disabled. The view then lasts only for this page.
	}
};
