import { LngLat, MercatorCoordinate, type LngLatLike } from 'maplibre-gl';

export interface CartesianPoint {
	x: number;
	y: number;
}

/** The Web Mercator coordinate of a longitude and latitude, at sea level. */
export const lngLatToMercator = (lngLat: LngLatLike): MercatorCoordinate =>
	MercatorCoordinate.fromLngLat(lngLat, 0);

/**
 * A Mercator coordinate in meters. `scale` is Mercator units per meter, which defaults to the
 * coordinate's own latitude.
 */
export const mercatorToCartesian = (
	mercator: MercatorCoordinate,
	scale = mercator.meterInMercatorCoordinateUnits()
): CartesianPoint => ({ x: mercator.x / scale, y: mercator.y / scale });

/** A longitude and latitude in meters, through Mercator. */
export const lngLatToCartesian = (lngLat: LngLatLike, scale?: number): CartesianPoint =>
	mercatorToCartesian(lngLatToMercator(lngLat), scale);

/** The Mercator coordinate of a point in meters, at sea level. */
export const cartesianToMercator = (x: number, y: number, scale: number): MercatorCoordinate =>
	new MercatorCoordinate(x * scale, y * scale, 0);

/** The longitude and latitude of a point in meters, through Mercator. */
export const cartesianToLngLat = (x: number, y: number, scale: number): LngLat =>
	cartesianToMercator(x, y, scale).toLngLat();
