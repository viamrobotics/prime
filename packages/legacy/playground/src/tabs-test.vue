<script setup lang="ts">
import example from '../../src/stories/assets/cpp-code-example';

let selectedTab = $ref('Tab 2');
let jsonCodeExampleSrc = $ref(example);
setTimeout(() => {
  jsonCodeExampleSrc = JSON.stringify(
    'Secret: 7zmvldd8swsob2dcbh7y3r16ogvhnqg7bwonn6pmx9wxikg8" "http://localhost:8080/api/json1/config?id=6071ec36-31c4-4b5c-bc97-88df4933f2b0&client=true" -o /etc/viam.json',
    null,
    2
  );
  }, 4000);
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
        <div v-if="selectedTab === 'Tab 2'" >
          <v-code-snippet 
            language='json'
            theme='vs'
            :code=jsonCodeExampleSrc
          />
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
