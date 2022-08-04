<script setup>

import { ref } from 'vue'

const value = ref('bob')
const json = JSON.stringify({
  foo: 'bar',
  some: 'thing',
  yes: true,
  count: 10,
});

</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <div style="display: flex; gap: 0.5rem">
      <v-button icon="send" label="Hello"></v-button>
      <v-button icon="undo" label="Hello"></v-button>
    </div>

    <div style="display: flex; gap: 0.5rem">
      <v-button icon="send" label="Hello"></v-button>
      <v-button icon="undo" label="Hello"></v-button>
    </div>

    <v-input
      label="My input"
      :value="value"
      @input="value = $event.detail.value"
    />
  </div>
  <div style="width: 100%; height: 400px; border: 1px solid black; margin-top: 1rem;">
    <v-code-editor
      language="json"
      :value="json"
    />
  </div>
</template>

