
import { MercatorCoordinate, LngLat } from 'maplibre-gl';

export const toPrecisionLevel = (number: number, decimals: number): number => {
  const multiplier = 10 ** decimals;
  return Math.floor(number * multiplier) / multiplier;
};

export const lngLatToMercator = (lngLat: LngLat): MercatorCoordinate => {
  return MercatorCoordinate.fromLngLat(lngLat, 0);
}

export const mercatorToCartesian = (mercator: MercatorCoordinate) => {
  const scale = mercator.meterInMercatorCoordinateUnits();
  return { x: mercator.x / scale, y: mercator.y / scale };
}

export const lngLatToCartesian = (lngLat: LngLat): { x: number, y: number } => {
  const mercator = lngLatToMercator(lngLat);
  return mercatorToCartesian(mercator);
}

export const cartesianToMercator = (x: number, y: number, scale: number) => {
  return new MercatorCoordinate(x * scale, y * scale, 0)
}

export const cartesianToLngLat = (x: number, y: number, scale: number) => {
  const mercator = cartesianToMercator(x, y, scale)
  return mercator.toLngLat();
}
