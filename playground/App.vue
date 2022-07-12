<script setup>

import { ref } from 'vue'

const value = ref('bob')

</script>

<template>
  <div>
    <v-button label="Hello" />
    <v-input
      label="My input"
      :value="value"
      @input="value = $event.detail.value"
    />
  </div>
</template>
l