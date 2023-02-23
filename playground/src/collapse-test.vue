<script setup lang="ts">

</script>

<template>
  <main class="m-3">
    <v-collapse
      data-testid="collapse"
      title='Robots...'
    >
      <div slot='title'>(title)</div>
      <div slot='header'>(header)</div>
      <div>...are pretty cool!</div>
    </v-collapse>

    <v-collapse
      data-testid="collapse-open"
      open="true"
    >
    </v-collapse>

    <v-collapse
      data-testid="collapse-closed"
      open="false"
    >
    </v-collapse>
  </main>
</template>
