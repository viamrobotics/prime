import * as THREE from 'three';
import { theme } from '@viamrobotics/prime-core/theme';

/*
 * this color map is greyscale. The color map is being used map probability values of a PCD
 * into different color buckets provided by the color map.
 * generated with: https://grayscale.design/app
 */
const colorMapGrey = [
  [240, 240, 240],
  [220, 220, 220],
  [200, 200, 200],
  [190, 190, 190],
  [170, 170, 170],
  [150, 150, 150],
  [40, 40, 40],
  [20, 20, 20],
  [10, 10, 10],
  [0, 0, 0],
].map(([red, green, blue]) =>
  new THREE.Vector3(red, green, blue).multiplyScalar(1 / 255)
);
const USER_GENERATED_POINT_COLOR = new THREE.Color(
  theme.extend.colors.cyberpunk
);
const SLAM_POSITION_POINT_COLOR = new THREE.Color(
  theme.extend.colors.hologram
);

/*
 * Find the desired color bucket for a given probability. This assumes the probability will be a value from 0 to 100
 * ticket to add testing: https://viam.atlassian.net/browse/RSDK-2606
 */
const probToColorMapBucket = (
  probability: number,
  numBuckets: number
): number => {
  const prob = Math.max(Math.min(100, probability * 255), 0);
  return Math.floor(((numBuckets - 1) * prob) / 100);
};

/*
 * Map the color of a pixel to a color bucket value.
 * probability represents the probability value normalized by the size of a byte(255) to be between 0 to 1.
 * ticket to add testing: https://viam.atlassian.net/browse/RSDK-2606
 */
const colorBuckets = (probability: number): THREE.Vector3 => {
  const bucket = probToColorMapBucket(probability, colorMapGrey.length);
  return colorMapGrey[bucket]!;
};

export const mapColorAttributeGrayscale = (colors: THREE.BufferAttribute) => {
  for (let i = 0; i < colors.count; i += 1) {
    /*
     * Probability is currently assumed to be held in the b part of the rgb field of the PCD map, on a scale of 0 to 100.
     * ticket to look into this further https://viam.atlassian.net/browse/RSDK-2605.
     *
     * User generated points that have been added to the pcd are marked as such by putting 100% probability in the r part of 
     * the rgb field. If that has been set, we will draw the point in cyberpunk instead of mapping it to its corresponding 
     * shade of gray to signal it is a user generated point.
     * 
     * SLAM positions have been added to the pcd are marked as such by putting 100% probability in the g part of the rgb field. 
     * If that has been set, we will draw the point in hologram instead of mapping it to its corresponding shade of gray to signal 
     * it is a SLAM position.
     */

    if (colors.getX(i) === 1) {
      colors.setXYZ(
        i,
        USER_GENERATED_POINT_COLOR.r,
        USER_GENERATED_POINT_COLOR.g,
        USER_GENERATED_POINT_COLOR.b
      );
      continue;
    }

    if (colors.getY(i) === 1) {
      colors.setXYZ(
        i,
        SLAM_POSITION_POINT_COLOR.r,
        SLAM_POSITION_POINT_COLOR.g,
        SLAM_POSITION_POINT_COLOR.b
      );
      continue;
    }

    const colorMapPoint = colorBuckets(colors.getZ(i) * 10);
    colors.setXYZ(i, colorMapPoint.x, colorMapPoint.y, colorMapPoint.z);
  }
};
