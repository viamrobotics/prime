import { MercatorCoordinate } from 'maplibre-gl';
import type { LngLat } from '$lib';

export const toPrecisionLevel = (number: number, decimals: number): number => {
  const multiplier = 10 ** decimals;
  return Math.floor(number * multiplier) / multiplier;
};

export const mercatorToCartesian = (
  mercator: MercatorCoordinate,
  scale = mercator.meterInMercatorCoordinateUnits()
) => {
  return { x: mercator.x / scale, y: mercator.y / scale };
};

export const lngLatToCartesian = (
  lngLat: LngLat,
  scale?: number
): { x: number; y: number } => {
  const mercator = MercatorCoordinate.fromLngLat(lngLat, 0);
  return mercatorToCartesian(mercator, scale);
};

export const cartesianToLngLat = (x: number, y: number, scale: number) => {
  const mercator = new MercatorCoordinate(x * scale, y * scale, 0);
  return mercator.toLngLat();
};
