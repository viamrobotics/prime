import * as THREE from 'three';

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
     * Probability is currently assumed to be held in the rgb field of the PCD map, on a scale of 0 to 100.
     * ticket to look into this further https://viam.atlassian.net/browse/RSDK-2605
     */
    const colorMapPoint = colorBuckets(colors.getZ(i) * 10);
    colors.setXYZ(i, colorMapPoint.x, colorMapPoint.y, colorMapPoint.z);
  }
};
