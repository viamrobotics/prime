import { Camera, Matrix4, Line, BufferGeometry, Vector3, Scene } from 'three';
import { MercatorCoordinate, type LngLat } from 'maplibre-gl';
import { useMapLibre } from '../hooks';
import { lngLatToCartesian, mercatorToCartesian } from '../math';
import { onMount } from 'svelte';

/**
 *
 * A plugin to integrate Three.js scenes into a Maplibre map.
 *
 * It syncs the projection matrix of a mapbibre-gl camera to a THREE.Camera in order to render objects
 * from the perspective of the map viewer. The camera is set to look at the current center of the visible map.
 *
 * It also manages the position of any THREE.Object3D that has a `userData.lngLat` property. The position
 * is determined by calculating the difference of the map's center lng,lat and the object's lng,lat and then
 * making an approximate transform to an x,z plane offset in meters.
 *
 * The userData.lngLat property must be a maplibre LngLat object, or in the case of a THREE.Line, a LngLat[].
 *
 * @param scene A THREE.Scene instance.
 * @param cameraSignal This should only be a THREE.Camera instance. Perspective and Orthographic cameras make projection defaults that will not work with Maplibre.
 * @param renderFn A callback that runs on each map draw. Use it to render your scene.
 */
export const useMapLibreThreeRenderer = (
  scene: Scene,
  cameraSignal: { current: Camera },
  renderFn: (scene: Scene, camera: Camera) => void
) => {
  const { map } = useMapLibre();
  const cameraTransform = new Matrix4();
  const cameraMatrix = new Matrix4();
  const scale = new Matrix4();
  const rotation = new Matrix4().multiplyMatrices(
    new Matrix4().makeRotationX(-0.5 * Math.PI),
    new Matrix4().makeRotationY(Math.PI)
  );

  onMount(() => {
    map.addLayer({
      id: 'scene-layer',
      type: 'custom',
      renderingMode: '3d',
      render(_, viewProjectionMatrix) {
        const center = map.getCenter();
        const mercator = MercatorCoordinate.fromLngLat(center, 0);
        const mercatorScale = mercator.meterInMercatorCoordinateUnits();
        const { x: cx, y: cy } = mercatorToCartesian(mercator, mercatorScale);

        scale.makeScale(mercatorScale, mercatorScale, -mercatorScale);
        cameraTransform
          .multiplyMatrices(scale, rotation)
          .setPosition(mercator.x, mercator.y, mercator.z);

        cameraSignal.current.projectionMatrix = cameraMatrix
          .fromArray(viewProjectionMatrix)
          .multiply(cameraTransform);

        scene.traverse((object) => {
          const { lngLat } = object.userData as {
            lngLat?: LngLat | LngLat[] | undefined;
          };

          if (lngLat === undefined) {
            return;
          }

          if (Array.isArray(lngLat)) {
            if (object instanceof Line) {
              (object.geometry as BufferGeometry).setFromPoints(
                lngLat.map((value) => {
                  const { x: ox, y: oy } = lngLatToCartesian(
                    value,
                    mercatorScale
                  );
                  return new Vector3(cx - ox, 0, cy - oy);
                })
              );
              object.computeLineDistances();
            }
          } else {
            const { x: ox, y: oy } = lngLatToCartesian(lngLat, mercatorScale);
            object.position.set(cx - ox, 0, cy - oy);
          }
        });

        renderFn(scene, cameraSignal.current);
        map.triggerRepaint();
      },
    });

    return () => {
      map.removeLayer('scene-layer');
    };
  });
};
