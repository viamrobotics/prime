<script setup lang="ts">
let selectedTab = $ref('Tab 2');
const handleTabSelect = (event: CustomEvent<{ value: string }>) => {
  selectedTab = event.detail.value;
};
</script>

<template>
  <main class="m-3 flex flex-col gap-8">
    <!-- Selected Value -->
    <div>
      <v-tabs
        data-testid="tabs-selected-test"
        tabs="Tab 1, Tab 2, Tab 3"
        :selected="selectedTab"
        @input="handleTabSelect"
      />
      <div class="p-4">
        <div v-if="selectedTab === 'Tab 2'">
          <p>BROKEN & REMOVED</p>
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
