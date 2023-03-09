
<script setup lang="ts">

</script>

<template>
  <main>
    <v-switch
      data-testid='switch-on'
      value='on'
    />
    <v-switch
      data-testid='switch-off'
      value='off'
    />
    <v-switch
      label='switch me!'
      data-testid='switch-default'
    />
    <v-switch
      disabled='true'
      label='disabled'
      data-testid='switch-disabled'
    />
    <v-switch
      readonly='true'
      label='read only'
      data-testid='switch-read-only'
    />
    <v-switch
      label='left'
      labelposition='left'
      data-testid='switch-label-left'
    />
    <v-switch
      label='top'
      labelposition='top'
      data-testid='switch-label-top'
    />
    <div id="emit-value"></div>
  </main>
</template>