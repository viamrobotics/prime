/**
 * This plugin carries out two functions:
 * 
 * - It syncs the projection matrix of a mapbibre-gl camera to a THREE.Camera in order to render objects
 *   from the perspective of the map viewer.
 * 
 * - It manages the position of any THREE.Object3D that has a `userData.lngLat` property.
 */

import * as THREE from 'three';
import { useThrelte, useFrame } from '@threlte/core';
import { MercatorCoordinate } from 'maplibre-gl';
import type { LngLat } from '../types';
import { useMapLibre } from '$lib';
import { cameraMatrix } from '../stores';

export interface Props {
  lnglat?: LngLat;
}

// Uses the haversine formula for calculating approximate lng,lat distances.
const getOffsetInMeters = (center: LngLat, offset: LngLat) => {
  const earthRadius = 6_371_000;

  const lat1Rad = (center.lat * Math.PI) / 180;
  const lng1Rad = (center.lng * Math.PI) / 180;
  const lat2Rad = (offset.lat * Math.PI) / 180;
  const lng2Rad = (offset.lng * Math.PI) / 180;

  const latDiff = lat2Rad - lat1Rad;
  const lngDiff = lng2Rad - lng1Rad;

  const averageLatRadius = (lat1Rad + lat2Rad) / 2;

  const xOffset = earthRadius * lngDiff * Math.cos(averageLatRadius);
  const zOffset = earthRadius * latDiff;

  return [-xOffset, zOffset] as const;
};

export const lngLatPlugin = () => {
  const { scene, camera } = useThrelte();
  const { map } = useMapLibre();

  const scale = new THREE.Matrix4();

  let center = map.getCenter();
  let mercator = MercatorCoordinate.fromLngLat(center, 0);
  let mercatorScale = mercator.meterInMercatorCoordinateUnits();

  const cameraTransform = new THREE.Matrix4();
  const rotation = new THREE.Matrix4().multiplyMatrices(
    new THREE.Matrix4().makeRotationX(-0.5 * Math.PI),
    new THREE.Matrix4().makeRotationY(Math.PI)
  );

  useFrame(() => {
    scene.traverse((object) => {
      const { lngLat } = object.userData as { lngLat?: LngLat | undefined };

      if (!lngLat) {
        return;
      }

      const [x, z] = getOffsetInMeters(center, lngLat);
      object.position.set(x, 0, z);
    });

    scale.makeScale(mercatorScale, mercatorScale, -mercatorScale);
    cameraTransform
      .multiplyMatrices(scale, rotation)
      .setPosition(mercator.x, mercator.y, mercator.z);
    camera.current.projectionMatrix = cameraMatrix.multiply(cameraTransform);
  });

  map.on('move', () => {
    center = map.getCenter();
    mercator = MercatorCoordinate.fromLngLat(center, 0);
    mercatorScale = mercator.meterInMercatorCoordinateUnits();
  });
};
