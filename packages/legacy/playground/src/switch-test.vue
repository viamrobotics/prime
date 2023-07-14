
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
      data-testid='switch-default'
      label='default'
      tooltip='message'
    />
    <v-switch
      data-testid='switch-disabled-off'
      disabled='true'
      label='disabled'
      variant='annotated'
    />
    <v-switch
      data-testid='switch-disabled-on'
      disabled='true'
      value='on'
      label='disabled'
      variant='annotated'
    />
    <v-switch
      data-testid='switch-readonly-off'
      readonly='true'
      label='read only'
      variant='annotated'
    />
    <v-switch
      data-testid='switch-readonly-on'
      value='on'
      readonly='true'
      label='read only'
      variant='annotated'
    />
    <v-switch
      data-testid='switch-label-top'
      label='top'
    />
    <v-switch
      data-testid='switch-annotated'
      variant='annotated'
    />
  </main>
</template>
