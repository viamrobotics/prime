import * as THREE from 'three';
import { useThrelte, useFrame } from '@threlte/core';
import { MercatorCoordinate } from 'maplibre-gl';
import type { LngLat } from '../types';
import { useMapLibre } from '$lib';
import { cameraMatrix } from '../stores';

export interface Props {
  lnglat?: LngLat;
}

const getOffsetInMeters = (center: LngLat, offset: LngLat) => {
  // Radius of the Earth in meters, approximately 6371 km
  const earthRadius = 6_371_000;

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (center.lat * Math.PI) / 180;
  const lng1Rad = (center.lng * Math.PI) / 180;
  const lat2Rad = (offset.lat * Math.PI) / 180;
  const lng2Rad = (offset.lng * Math.PI) / 180;

  // Calculate the differences in latitudes and longitudes
  const latDiff = lat2Rad - lat1Rad;
  const lngDiff = lng2Rad - lng1Rad;

  // Calculate the average latitude
  const avgLatRad = (lat1Rad + lat2Rad) / 2;

  // Calculate the x and z offsets in meters using local approximation
  const xOffset = earthRadius * lngDiff * Math.cos(avgLatRad);
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
