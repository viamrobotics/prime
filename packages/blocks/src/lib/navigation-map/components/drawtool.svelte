<script lang='ts'>
  import { T, createRawEventDispatcher } from '@threlte/core'
  import { useMapLibreEvent, useMapLibre } from '$lib'
  import { MercatorCoordinate, LngLat, type MapMouseEvent } from 'maplibre-gl';
  import { view } from '../stores';

  type $$Events = {
    update: { width: number, height: number, center: LngLat }
  }

  const dispatch = createRawEventDispatcher<$$Events>();

  const { map } = useMapLibre()
  let downLngLat = new LngLat(0, 0)
  let down = new MercatorCoordinate(0, 0, 0)

  let dragging = false
  let width = 0
  let height = 0

  const handleMove = (event: MapMouseEvent) => {
    const move = MercatorCoordinate.fromLngLat(event.lngLat, 0)
    const scale = move.meterInMercatorCoordinateUnits()

    width = Math.abs(move.x - down.x) / scale
    height = Math.abs(move.y - down.y) / scale
  }

  useMapLibreEvent('mousedown', (event) => {
    if (event.originalEvent.shiftKey) {
      event.preventDefault()
      dragging = true
      downLngLat = event.lngLat
      down = MercatorCoordinate.fromLngLat(event.lngLat, 0)
    }
  })

  useMapLibreEvent('mouseup', () => {
    if (!dragging) return

    dragging = false

    const scale = down.meterInMercatorCoordinateUnits()
    const offset = new MercatorCoordinate(
      (width / 2) * scale,
      (height / 2) * scale,
    )

    down.x -= offset.x
    down.y -= offset.y

    const center = down.toLngLat()

    dispatch('update', { width, height, center })

    width = 0
    height = 0

    console.log(width,height)
  })

  $: if (dragging) {
    map.on('mousemove', handleMove)
  } else {
    map.off('mousemove', handleMove)
  }
</script>

<T.Group userData.lngLat={downLngLat}>
  <T.Mesh position.x={width / 2} position.z={height / 2}>
    {#if $view === '3D'}
        <T.BoxGeometry
        args={[width, height, 10]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {:else}
        <T.PlaneGeometry
          args={[width, height]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {/if}
    <T.MeshPhongMaterial color='red' />
  </T.Mesh>
</T.Group>
