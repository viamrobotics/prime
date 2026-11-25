<script lang="ts">
	import { onMount } from 'svelte';
	import { BufferGeometry, Camera, Line, Object3D, Scene } from 'three';

	import { useMapLibreThreeRaycast } from '../../useMapLibreThreeRaycast.svelte.ts';
	import { useMapLibreThreeRenderer } from '../../useMapLibreThreeRenderer.svelte.ts';
	import type { ThreeProbeState } from './three-probe.ts';

	interface Props {
		onReady: (state: ThreeProbeState) => void;
		render: (scene: Scene, camera: Camera) => void;
	}

	const { onReady, render }: Props = $props();

	const scene = new Scene();
	const camera = new Camera();

	const point = new Object3D();
	point.userData.lngLat = { lng: 0.001, lat: 0 };

	const line = new Line(new BufferGeometry());
	line.userData.lngLat = [
		{ lng: 0, lat: 0 },
		{ lng: 0.001, lat: 0.001 }
	];

	const unplaced = new Object3D();
	unplaced.position.set(7, 7, 7);

	scene.add(point, line, unplaced);

	useMapLibreThreeRenderer(scene, { current: camera }, (...args) => render(...args));
	const raycast = useMapLibreThreeRaycast({ current: camera });

	onMount(() => {
		onReady({ scene, camera, point, line, unplaced, raycast });
	});
</script>
