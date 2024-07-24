<!--
  @component
  Helpers for orienting the user spacially within a map.
  Contains a grid and axes, with small grid spaces placed at 1m.
-->
<script lang="ts">
import { Grid } from '@threlte/extras';
import { renderOrder } from './render-order';
import { AxesHelper } from '../index';
</script>

<Grid
  infiniteGrid
  fadeDistance={150}
  renderOrder={renderOrder.grid}
  rotation.x={Math.PI / 2}
  cellColor="#ddd"
  sectionColor="#ccc"
  sectionThickness={1.5}
  position.z={-0.1}
/>

<AxesHelper length={10_000} />

<AxesHelper
  rotation.z={Math.PI}
  length={10_000}
/>
