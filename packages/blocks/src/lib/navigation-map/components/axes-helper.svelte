<script lang="ts">
import * as THREE from 'three';
import { T } from '@threlte/core';

export let thickness = 0.05;
export let length = 10;
</script>

<T.Mesh
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  rotation.z={Math.PI / 2}
  position.x={-length / 2}
>
  <T is={new THREE.MeshBasicMaterial({ color: 'red' })} />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>

<T.Mesh
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  position.y={length / 2}
>
  <T is={new THREE.MeshBasicMaterial({ color: 'green' })} />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>

<T.Mesh
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  rotation.x={-Math.PI / 2}
  position.z={length / 2}
>
  <T is={new THREE.MeshBasicMaterial({ color: 'blue' })} />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>
