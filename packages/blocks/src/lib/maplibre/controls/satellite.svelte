<!-- 
  @component
  Adds controls for toggling between a satellite and map view.
-->
<script lang="ts">
import { Button } from '@viamrobotics/prime-core';
import { useMapLibre } from '../hooks';

export let satellite = false;

const { map } = useMapLibre();

const onClick = () => {
  satellite = !satellite;
  map.setLayoutProperty(
    'satellite',
    'visibility',
    satellite ? 'visible' : 'none'
  );
};
</script>

<Button on:click={onClick}>
  {satellite ? 'Map' : 'Satellite'}
</Button>
