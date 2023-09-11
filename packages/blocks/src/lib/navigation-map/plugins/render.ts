import * as THREE from 'three';
import { injectPlugin, useFrame, useThrelte } from '@threlte/core';
import {
  MercatorCoordinate,
  LngLatBounds,
  type LngLat,
  type Map,
} from 'maplibre-gl';
import { cameraMatrix } from '../stores';

const { clamp } = THREE.MathUtils;

export const world = new THREE.Group();
const rotation = new THREE.Euler();
const rotationMatrix = new THREE.Matrix4();
const scale = new THREE.Vector3();

// Viam's coordinate system.
world.rotateY(-Math.PI / 2);
world.rotateX(-Math.PI / 2);
world.rotateZ(Math.PI / 2);

let cursor = 0;

export const scenes: {
  ref: THREE.Mesh;
  matrix: THREE.Matrix4;
}[] = [];

const objects: {
  id: number;
  start: () => void;
  stop: () => void;
  lngLat: LngLat;
}[] = [];

export const setFrameloops = (map: Map) => {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  // Add margins, clamp to min and max lng,lat.
  sw.lng = clamp(sw.lng - 5, -90, 90);
  sw.lat = clamp(sw.lat - 5, -90, 90);

  ne.lng = clamp(ne.lng + 5, -90, 90);
  ne.lat = clamp(ne.lat + 5, -90, 90);

  const viewportBounds = new LngLatBounds(sw, ne);

  for (const { lngLat, start, stop } of objects) {
    if (viewportBounds.contains(lngLat)) {
      start();
    } else {
      stop();
    }
  }
};

export interface Props {
  lnglat?: LngLat;
}

export const renderPlugin = () =>
  injectPlugin<Props>('lnglat', ({ ref, props }) => {
    let currentRef = ref as THREE.Mesh;
    let currentProps = props;

    if (
      !(currentRef instanceof THREE.Mesh) ||
      currentProps.lnglat === undefined
    ) {
      return;
    }

    const matrix = new THREE.Matrix4();
    const modelMatrix = new THREE.Matrix4();

    const sceneObj = { ref: currentRef, matrix };
    scenes.push(sceneObj);

    const updateModelMatrix = (lngLat: LngLat) => {
      const mercator = MercatorCoordinate.fromLngLat(lngLat);
      const scaleScalar = mercator.meterInMercatorCoordinateUnits();
      scale.set(scaleScalar, -scaleScalar, scaleScalar);

      rotation.copy(currentRef.rotation);
      rotation.x += Math.PI / 2;

      rotationMatrix.makeRotationFromEuler(rotation);

      modelMatrix
        .makeTranslation(mercator.x, mercator.y, mercator.z)
        .scale(scale)
        .multiply(rotationMatrix);
    };

    updateModelMatrix(currentProps.lnglat);

    const { start, stop } = useFrame(
      () => matrix.copy(cameraMatrix).multiply(modelMatrix),
      { order: 1 }
    );

    const { scene } = useThrelte();

    currentRef.matrixAutoUpdate = false;
    currentRef.matrixWorldAutoUpdate = false;

    scene.remove(currentRef);

    cursor += 1;

    objects.push({
      id: cursor,
      lngLat: currentProps.lnglat,
      start,
      stop,
    });

    const id = cursor;

    return {
      onRefChange(nextRef: THREE.Mesh) {
        currentRef = nextRef;
        sceneObj.ref = nextRef;

        if (currentProps.lnglat) {
          updateModelMatrix(currentProps.lnglat);
        }

        return () => {
          stop();
          const index = objects.findIndex((object) => object.id === id);
          objects.splice(index, 1);
          scenes.splice(scenes.indexOf(sceneObj), 1);
        };
      },
      onPropsChange(nextProps) {
        currentProps = nextProps;

        if (currentProps.lnglat === undefined) {
          return;
        }

        const { lngLat } = objects.find((object) => object.id === id)!;
        lngLat.lng = currentProps.lnglat.lng;
        lngLat.lat = currentProps.lnglat.lat;

        updateModelMatrix(currentProps.lnglat);
      },
      pluginProps: ['lnglat'],
    };
  });
