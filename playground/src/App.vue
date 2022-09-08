<script setup lang="ts">

import Monaco from './monaco.vue'

const value = $ref('bob')
const selectedTab = $ref('Tab 1')

</script>

<template>
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
        v-for="i in [0,1,2,3,4,5]"
        :key="i"
        :title="'This is a warning'"
        variant="warning"
        @click="() => { /* remove */ }"
      />

      <v-input
        label="My input"
        :value="value"
        @input="value = $event.detail.value"
      />
      
      <button>
        <v-icon name="edit" />
      </button>

      <section :key="i" v-for="i in [0,1,2,3,4,5]">
        <v-icon name="trash" @mouse-over="() => { /* remove */ }" />
      </section>
    </div>

    <Monaco />

    <v-collapse class="p-3" title='Hello world?'>
      Hello world
    </v-collapse>
  </main>
</template>
