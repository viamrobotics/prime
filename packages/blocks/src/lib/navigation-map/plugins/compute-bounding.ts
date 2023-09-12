import * as THREE from 'three';
import { injectPlugin } from '@threlte/core';
import { boundingRadius } from '../stores';

interface Props {
  computeBounding: string;
}

export const computeBoundingPlugin = () =>
  injectPlugin<Props>('computeBounding', ({ ref, props }) => {
    let currentRef = ref as THREE.BufferGeometry;
    let currentProps = props;

    if (
      !(currentRef instanceof THREE.BufferGeometry) ||
      !currentProps.computeBounding
    ) {
      return;
    }

    const handleChange = () => {
      currentRef.computeBoundingSphere();
      const radius = currentRef.boundingSphere?.radius;

      if (radius) {
        boundingRadius[currentProps.computeBounding] = radius;
      }
    };

    return {
      onRefChange(nextRef: THREE.BufferGeometry) {
        currentRef = nextRef;
        handleChange();

        return () => {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete boundingRadius[currentProps.computeBounding];
        };
      },
      onPropsChange(nextProps) {
        currentProps = nextProps;
        handleChange();
      },
    };
  });
