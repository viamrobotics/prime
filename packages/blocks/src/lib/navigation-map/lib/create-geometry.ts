import type {
  Geometry,
  BoxGeometry,
  CapsuleGeometry,
  SphereGeometry,
  Shapes,
} from '$lib';
import { ViamObject3D } from '@viamrobotics/three';

export const createGeometry = (type: Shapes, size = 5): Geometry => {
  switch (type) {
    case 'box': {
      return {
        type,
        length: size * 2,
        width: size * 2,
        height: size * 2,
        pose: new ViamObject3D(),
      } satisfies BoxGeometry;
    }
    case 'sphere': {
      return {
        type,
        radius: size,
        pose: new ViamObject3D(),
      } satisfies SphereGeometry;
    }
    case 'capsule': {
      return {
        type,
        radius: size / 2,
        length: size,
        pose: new ViamObject3D(),
      } satisfies CapsuleGeometry;
    }
  }
};
