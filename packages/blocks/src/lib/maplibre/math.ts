import { MercatorCoordinate, LngLat } from 'maplibre-gl';

export const lngLatToMercator = (lngLat: LngLat): MercatorCoordinate => {
  return MercatorCoordinate.fromLngLat(lngLat, 0);
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

export const cartesianToMercator = (x: number, y: number, scale: number) => {
  return new MercatorCoordinate(x * scale, y * scale, 0);
};

export const cartesianToLngLat = (x: number, y: number, scale: number) => {
  const mercator = new MercatorCoordinate(x * scale, y * scale, 0);
  return mercator.toLngLat();
};
