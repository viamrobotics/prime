<!--
  @component
  Helpers for orienting the user spacially within a map.
  Contains a grid and axes, with small grid spaces placed at 1m.
-->
<script lang="ts">
import { T } from '@threlte/core';
import { Grid } from '@threlte/extras';
import { renderOrder } from './render-order';
import AxesHelper from './axes-helper.svelte';
</script>

<Grid
  infiniteGrid
  fadeDistance={150}
  renderOrder={renderOrder.grid}
  plane="xy"
  rotation.x={Math.PI / 2}
  cellColor="#ddd"
  sectionColor="#ccc"
  position.z={-0.1}
/>

<AxesHelper
  width={0.2}
  length={10_000}
/>

<T.Group rotation.z={Math.PI}>
  <AxesHelper
    width={0.2}
    length={10_000}
  />
</T.Group>
