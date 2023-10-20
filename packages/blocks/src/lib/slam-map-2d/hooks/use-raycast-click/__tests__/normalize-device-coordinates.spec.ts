import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { normalizeDeviceCoordinates } from '../normalize-device-coordinates';

describe('normalizeDeviceCoordinates', () => {
  const target = new THREE.Vector2();
  const mockElement = {
    clientWidth: 100,
    clientHeight: 100,
    getBoundingClientRect() {
      return { x: 50, y: 100 } as DOMRect
    },
  } as HTMLElement;
  
  it('should translate a pointer position on an offset element to NDC space', () => {
    // Click near top left
    normalizeDeviceCoordinates(mockElement, 51, 101, target);
    expect(target.x).toBeCloseTo(-0.98);
    expect(target.y).toBeCloseTo(0.98);

    // Click near top right
    normalizeDeviceCoordinates(mockElement, 149, 101, target);
    expect(target.x).toBeCloseTo(0.98);
    expect(target.y).toBeCloseTo(0.98);

    // Click near bottom left
    normalizeDeviceCoordinates(mockElement, 51, 199, target);
    expect(target.x).toBeCloseTo(-0.98);
    expect(target.y).toBeCloseTo(-0.98);

    // Click near bottom right
    normalizeDeviceCoordinates(mockElement, 149, 199, target);
    expect(target.x).toBeCloseTo(0.98);
    expect(target.y).toBeCloseTo(-0.98);
  });
});
