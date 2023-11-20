<!--
  @component An AxesHelper with thick lines.
-->
<script lang="ts">
import { T } from '@threlte/core';
import { view } from '../stores';

/** The thickness of all axes */
export let thickness = 0.05;

/** The length of all axes */
export let length = 10;
</script>

<T.Mesh
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  rotation.z={Math.PI / 2}
  position.x={-length / 2}
  renderOrder={10}
>
  <!-- Don't depth test these materials: we always want them to render on top. -->
  <T.MeshBasicMaterial
    color="red"
    depthTest={false}
  />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>

<T.Mesh
  visible={$view === '3D'}
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  position.y={length / 2}
  renderOrder={10}
>
  <T.MeshBasicMaterial
    color="blue"
    depthTest={false}
  />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>

<T.Mesh
  scale.y={length}
  scale.x={thickness}
  scale.z={thickness}
  rotation.x={-Math.PI / 2}
  position.z={length / 2}
  renderOrder={10}
>
  <T.MeshBasicMaterial
    color="green"
    depthTest={false}
  />
  <T.CylinderGeometry args={[1, 1, 1]} />
</T.Mesh>
