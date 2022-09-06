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

const open = ref(false)

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
    
    <v-button
      label='open'
      @click='open = true'
    />

    <v-input
      label="My input"
      :value="value"
      @input="value = $event.detail.value"
    />

    <v-modal
      :open="open ? 'true' : 'false'"
      title="Are you sure you want to click?"
      @close="open = false"
    >
      <h5>I like:</h5>
      <ul>
        <li>Ponies</li>
        <li>Myself after therapy</li>
      </ul>
      <v-button slot='action' label='Click me' />
    </v-modal>
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