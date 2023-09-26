<!--
  @component
  Helpers for orienting the user spacially within a map.
  Contains a grid and axes, with small grid spaces placed at 1m.
-->
<script lang="ts">
import { T } from '@threlte/core';
import { AxesHelper, GridHelper } from 'trzy';
import { renderOrder } from './render-order';
</script>

<!-- trzy.GridHelper is more performant by drawing the grid in a shader, and can have small and large cells. -->
<T
  is={GridHelper}
  renderOrder={renderOrder.grid}
  color="#ddd"
  rotation.x={Math.PI / 2}
/>

<!-- trzy.AxesHelper uses thick lines so that axes are more clearly displayed, and is dynamically resizable. -->
<T
  is={AxesHelper}
  renderOrder={renderOrder.axes}
  width={0.2}
  length={10_000}
/>

<T.AxesHelper
  renderOrder={renderOrder.axes}
  width={0.2}
  length={10_000}
  rotation.z={Math.PI}
/>
