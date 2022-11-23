<script setup lang="ts">

import { lazy } from 'react';
import Monaco from './monaco.vue'

const selectedTab = $ref('Tab 1')

let value = $ref(1)
let rotate = $ref(0)
let vector = $ref({ x: 0, y: 0, z: 0 })

const handleRotate = (event: CustomEvent) => {
  console.log(event.detail.value, typeof event.detail.value)
  rotate = Number.parseFloat(event.detail.value)
}

const handleInput = (event: CustomEvent) => {
  console.log(event)
  value = event.detail.value
}

let lazyValue = $ref('')

setTimeout(() => {
  lazyValue = '1989-01-01'
}, 2000)

</script>

<template>
  <div class="flex flex-wrap justify-between gap-2">
    <v-input
      class="w-full"
      type="date"
      :value="lazyValue"
    />
    <v-input
      class="w-full"
      type="time"
    />
  </div>

  <main class="m-3 border border-black">
    <v-tabs
      tabs="Tab 1, Tab 2"
      :selected="selectedTab"
      @input="selectedTab = $event.detail.value"
    />

    <template v-if="selectedTab === 'Tab 1'">
      <v-table>
        <v-thead>
          <v-th>buttonz</v-th>
        </v-thead>

        <v-tbody>
          <v-tr v-for="i in [1,2,3,4,5]" :key="i">
            <div class="flex gap-2 p-2">
              <v-button icon="send" label="Hello" />
              <v-button icon="undo" label="hi" />
            </div>
          </v-tr>
        </v-tbody>
      </v-table>
    </template>
    
    <div v-else class="flex flex-col gap-3 p-3">
      <v-notify
        v-for="i in [0, 1, 2, 3, 4, 5]"
        :key="i"
        :title="'This is a warning'"
        variant="warning"
      />

      <v-input
        label="My input"
        :value="value"
        type="number"
        step="0.1"
        incrementor="slider"
        @input="handleInput"
      />
      
      <button>
        <v-icon name="edit" />
      </button>

      <section :key="i" v-for="i in [0, 1, 2, 3, 4, 5]">
        <v-icon name="trash" />
      </section>
    </div>

    <Monaco />

    <v-collapse class="p-3" title='Hello world?'>
      Hello world
    </v-collapse>
  </main>

  <div class="h-[300px] w-screen grid place-content-center">
    <div class="flex gap-2 items-center">
      <v-input
        type="number"
        incrementor="slider"
        :value="rotate"
        @input="handleRotate"
        step="0.1"
      />

      <v-vector-input
        .value="vector"
      />

      <svg class="h-full" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="12.5" />
        <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="10" />
        <line stroke-width="0.5" x1="25" y1="25" x2="25" y2="15" stroke="black" class="origin-center" :style="{ transform: `rotate(${rotate}deg)` }" />
      </svg>
    </div>
  </div>
</template>
