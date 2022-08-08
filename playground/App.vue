<script setup>

import '../src/main'
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
    <v-table>
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
  <div style="width: 100%; height: 400px; border: 1px solid black; margin-top: 1rem;">
    <v-code-editor
      language="json"
      :value="json"
    />
  </div>

  <v-collapse open>
    Hello world
  </v-collapse>

  <v-dropdown match>
    
  </v-dropdown>
</template>

