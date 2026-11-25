import { LngLat } from 'maplibre-gl';
import { describe, expect, it } from 'vitest';

import {
	cartesianToLngLat,
	cartesianToMercator,
	lngLatToCartesian,
	lngLatToMercator,
	mercatorToCartesian
} from '../projection.ts';

const office = new LngLat(-73.984_421, 40.771_811_6);

describe('lngLatToMercator', () => {
	it('puts the origin at the center of the Mercator square', () => {
		const mercator = lngLatToMercator(new LngLat(0, 0));

		expect(mercator.x).toBeCloseTo(0.5);
		expect(mercator.y).toBeCloseTo(0.5);
		expect(mercator.z).toBe(0);
	});

	it('moves east toward larger x and north toward smaller y', () => {
		const mercator = lngLatToMercator(new LngLat(90, 45));

		expect(mercator.x).toBeCloseTo(0.75);
		expect(mercator.y).toBeLessThan(0.5);
	});

	it('takes a plain { lng, lat } object', () => {
		expect(lngLatToMercator({ lng: 90, lat: 0 }).x).toBeCloseTo(0.75);
	});
});

describe('mercatorToCartesian', () => {
	it('divides by the given scale', () => {
		const mercator = lngLatToMercator(new LngLat(0, 0));

		expect(mercatorToCartesian(mercator, 0.25)).toEqual({ x: 2, y: 2 });
	});

	it('defaults the scale to the coordinate latitude', () => {
		const mercator = lngLatToMercator(office);
		const scale = mercator.meterInMercatorCoordinateUnits();

		expect(mercatorToCartesian(mercator)).toEqual({ x: mercator.x / scale, y: mercator.y / scale });
	});
});

describe('lngLatToCartesian', () => {
	it('measures one degree of longitude at the equator as about 111.2 km on the maplibre-gl sphere', () => {
		const scale = lngLatToMercator(new LngLat(0, 0)).meterInMercatorCoordinateUnits();
		const west = lngLatToCartesian(new LngLat(0, 0), scale);
		const east = lngLatToCartesian(new LngLat(1, 0), scale);

		expect(east.x - west.x).toBeCloseTo(111_195.08, 1);
		expect(east.y - west.y).toBeCloseTo(0);
	});
});

describe('cartesianToMercator', () => {
	it('multiplies by the scale at sea level', () => {
		const mercator = cartesianToMercator(2, 4, 0.125);

		expect(mercator.x).toBe(0.25);
		expect(mercator.y).toBe(0.5);
		expect(mercator.z).toBe(0);
	});
});

describe('cartesianToLngLat', () => {
	it('inverts lngLatToCartesian at the same scale', () => {
		const scale = lngLatToMercator(office).meterInMercatorCoordinateUnits();
		const { x, y } = lngLatToCartesian(office, scale);
		const lngLat = cartesianToLngLat(x, y, scale);

		expect(lngLat.lng).toBeCloseTo(office.lng, 9);
		expect(lngLat.lat).toBeCloseTo(office.lat, 9);
	});
});
