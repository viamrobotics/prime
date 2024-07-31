import { Vector2 } from 'three';

export const normalizeDeviceCoordinates = (
  element: HTMLElement,
  x: number,
  y: number,
  target: Vector2
) => {
  if (element.clientWidth === 0 || element.clientHeight === 0) {
    throw new Error(
      'normalizeDeviceCoordinates cannot operate on a dimensionless element'
    );
  }
  const rect = element.getBoundingClientRect();
  target.x = ((x - rect.x) / element.clientWidth) * 2 - 1;
  target.y = -(((y - rect.y) / element.clientHeight) * 2) + 1;
};
