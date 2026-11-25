import type { LngLat, Map } from 'maplibre-gl';

import { getContext, setContext } from 'svelte';

import type { MapProvider } from '../providers/map-provider.ts';

const MAP_LIBRE_KEY = Symbol('prime-map');

export interface MapSize {
	width: number;
	height: number;
}

/** What `useMapLibre` returns to the children of a `<MapLibre>`. Every field is reactive. */
export interface MapLibreContext {
	/** The map instance. Children mount after it loads, so it is always set for them. */
	readonly map: Map;
	/** The camera center. It follows the camera and writes through `bind:center`. */
	readonly center: LngLat;
	/** The camera zoom. It follows the camera and writes through `bind:zoom`. */
	readonly zoom: number;
	readonly maxZoom: number;
	/** The canvas size in CSS pixels, updated on each resize. */
	readonly size: MapSize;
	readonly mapProvider: MapProvider;
	readonly apiKey: string | undefined;
	/** Whether satellite view shows. Writing it switches the map and writes through `bind:satellite`. */
	satellite: boolean;
}

interface Binding<T> {
	get: () => T;
	set: (value: T) => void;
}

interface MapLibreOptions {
	center: Binding<LngLat>;
	zoom: Binding<number>;
	satellite: Binding<boolean>;
	maxZoom: () => number;
	mapProvider: () => MapProvider;
	apiKey: () => string | undefined;
}

/** The context plus the writes only `<MapLibre>` makes. */
export interface MapLibreProvider extends MapLibreContext {
	attach: (map: Map) => void;
	setSize: (size: MapSize) => void;
}

export const provideMapLibre = (options: MapLibreOptions): MapLibreProvider => {
	let map = $state.raw<Map>();
	let size = $state.raw<MapSize>({ width: 0, height: 0 });

	const context: MapLibreProvider = {
		get map() {
			if (map === undefined) {
				throw new Error('The map is read before <MapLibre> created it.');
			}
			return map;
		},
		get center() {
			return options.center.get();
		},
		get zoom() {
			return options.zoom.get();
		},
		get maxZoom() {
			return options.maxZoom();
		},
		get size() {
			return size;
		},
		get mapProvider() {
			return options.mapProvider();
		},
		get apiKey() {
			return options.apiKey();
		},
		get satellite() {
			return options.satellite.get();
		},
		set satellite(value) {
			options.satellite.set(value);
		},
		attach: (value) => {
			map = value;
		},
		setSize: (value) => {
			size = value;
		}
	};

	setContext(MAP_LIBRE_KEY, context);

	return context;
};

/**
 * The context of the enclosing `<MapLibre>`. Call it during the initialization of a component
 * rendered inside one.
 */
export const useMapLibre = (): MapLibreContext => {
	const context = getContext<MapLibreContext | undefined>(MAP_LIBRE_KEY);

	if (!context) {
		throw new Error(
			'useMapLibre is a context sensitive hook that must be used inside a <MapLibre> component.'
		);
	}

	return context;
};
