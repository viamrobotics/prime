<script setup lang="ts">

</script>

<template>
  <main class="m-3">
    <v-collapse
      data-testid="collapse-default"
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

    <v-collapse
      data-testid="collapse-breadcrumbs-badge"
      title='A word on bread'
    >
      <v-breadcrumbs slot='title' crumbs='sourdough,ciabatta'></v-breadcrumbs>
      <v-badge slot='header' label='FRESH'></v-badge>
      <div>How do you tell how good bread is without tasting it? Not the smell, not the look, but the sound of the crust. Listen. Symphony of crackle.</div>
    </v-collapse>
  </main>
</template>
