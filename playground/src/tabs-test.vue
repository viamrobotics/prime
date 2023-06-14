<script setup lang="ts">
import example from '../../src/stories/assets/json-code-example';

let selectedTab = $ref('Tab 1');
let jsonCodeExampleSrc = $ref(example);
setTimeout(() => {
  jsonCodeExampleSrc = JSON.stringify(
    {
      name: 'Jason',
      age: 50,
      loves_lasagna: true,
    },
    null,
    2
  );
  }, 2000);
const handleTabSelect = (event: CustomEvent<{ value: string }>) => {
  selectedTab = event.detail.value;
};
</script>

<template>
  <main class="flex flex-col gap-8 m-3">

    <!-- Selected Value -->
    <div>
      <v-tabs
        data-testid="tabs-selected-test"
        tabs="Tab 1, Tab 2, Tab 3"
        :selected="selectedTab"
        @input="handleTabSelect"
      />
      <div class="p-4">
        <div v-if="selectedTab === 'Tab 1'" >
          <v-code-snippet 
            language='json'
            theme='vs'
            :code=jsonCodeExampleSrc
          />

          {{ jsonCodeExampleSrc }}
        </div>
        <p v-else>{{ selectedTab }}</p>
      </div>
    </div>

    <!-- Focus KeyDown Test -->
    <v-tabs
      data-testid="tabs-key-enter-test"
      class="mt-2"
      tabs="Tab X, Tab Y, Tab Z"
      selected="Tab Z"
    />

  </main>
</template>
