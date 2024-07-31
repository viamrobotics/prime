/* eslint-disable max-classes-per-file */
import { LatheGeometry, Path } from 'three';

/**
 * An alternate definition of a THREE.CapsuleGeometry: the length
 * represents the entire length of the capsule, including the rounded ends,
 * rather than just the midsection, which is the default THREE.CapsuleGeometry definition.
 */
export class LengthCapsuleGeometry extends LatheGeometry {
  override type = 'CapsuleGeometry';

  constructor(radius = 1, length = 1, capSegments = 4, radialSegments = 8) {
    const path = new Path();
    const midsectionLength = length - 2 * radius;

    path.absarc(
      0,
      -midsectionLength / 2 - radius / 2,
      radius,
      Math.PI * 1.5,
      0
    );

    path.absarc(0, midsectionLength / 2 + radius / 2, radius, 0, Math.PI * 0.5);

    super(path.getPoints(capSegments), radialSegments);
  }
}
