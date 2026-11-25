import type { MapEventType } from 'maplibre-gl';

import { useMapLibre } from './useMapLibre.svelte.ts';

/**
 * Listens to an event on the enclosing `<MapLibre>` map until the calling component unmounts.
 * Call it during the initialization of a component rendered inside one.
 */
export const useMapLibreEvent = <T extends keyof MapEventType>(
	event: T,
	listener: (ev: MapEventType[T]) => void
): void => {
	const context = useMapLibre();

	$effect(() => {
		const map = context.map;
		map.on(event, listener);
		return () => {
			map.off(event, listener);
		};
	});
};
