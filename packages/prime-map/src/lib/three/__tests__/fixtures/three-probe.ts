import type { BufferGeometry, Camera, Line, Object3D, Scene } from 'three';

import type { useMapLibreThreeRaycast } from '../../useMapLibreThreeRaycast.svelte.ts';

export interface ThreeProbeState {
	scene: Scene;
	camera: Camera;
	point: Object3D;
	line: Line<BufferGeometry>;
	unplaced: Object3D;
	raycast: ReturnType<typeof useMapLibreThreeRaycast>;
}
