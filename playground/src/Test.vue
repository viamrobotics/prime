<script setup lang="ts">
import BadgeTest from './badge-test.vue'

</script>

<template>
  <main class="m-3">
    <v-collapse title="Click to find out!">
      <p>You found out!</p>
    </v-collapse>

    <v-multiselect
      label="Trinkets"
      options="Jolly logins, Sleeping hogins, Sticky bogins, Fiendish dogins"
      placeholder="Select some Bobbinses"
    />

    <v-select
      label="Bobbins"
      options="Jolly logs, Sleeping hogs, Sticky bogs, Fiendish dogs"
      placeholder="Select a Bobbins"
    />

    <BadgeTest />

  </main>
</template>
