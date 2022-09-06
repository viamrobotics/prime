<script setup>

import '../src/main'
import { ref } from 'vue'
import Monaco from './monaco.vue'

const value = ref('bob')
const json = JSON.stringify({
  foo: 'bar',
  some: 'thing',
  yes: true,
  count: 10,
});

</script>

<template>
  <Monaco />
  <div style="display: flex; flex-direction: column; gap: 0.5rem">
    <v-table class="bg-blue">
      <v-thead>
        <v-th>buttonz</v-th>
      </v-thead>

      <v-tbody>
        <v-tr v-for="i in [1,2,3,4,5]" :key="i" style="display: flex; gap: 0.5rem">
          <v-button icon="send" label="Hello"></v-button>
          <v-button icon="undo" label="hi"></v-button>
        </v-tr>
      </v-tbody>
    </v-table>

    <v-input
      label="My input"
      :value="value"
      @input="value = $event.detail.value"
    />
  </div>

  <v-collapse open>
    Hello world
  </v-collapse>

  <v-dropdown match>
    
  </v-dropdown>
</template>

<style>
  .bg-blue { background: blue; }
</style>