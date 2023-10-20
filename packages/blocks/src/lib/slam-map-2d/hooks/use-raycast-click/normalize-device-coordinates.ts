export const normalizeDeviceCoordinates = (
  element: HTMLCanvasElement,
  x: number,
  y: number,
  target: THREE.Vector2
) => {
  const rect = element.getBoundingClientRect();
  target.x = ((x - rect.x) / element.clientWidth) * 2 - 1;
  target.y = -(((y - rect.y) / element.clientHeight) * 2) + 1;
};
