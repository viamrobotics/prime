<script setup lang="ts">
import { useFloating } from '@floating-ui/vue';
import { ref } from "vue";

let showMenu = $ref<boolean>(false)

const parent = ref<HTMLElement>();
const child = ref<HTMLElement>();
const { floatingStyles } = useFloating(parent, child, {placement: 'bottom-start'});

const handleSelect = (event: any) => {
  console.log('select', event.detail.value)
}

</script>

<template>
  <main>
    <v-context-menu
      data-testid="context-menu-default"
    >
      <v-context-menu-item
        data-testid="context-menu-item-1"
        label="label 1"
      />
      <v-context-menu-separator />
      <v-context-menu-item
        data-testid="context-menu-item-2"
        label="label 2"
        variant="primary"
      />
      <v-context-menu-item
        data-testid="context-menu-item-3"
        icon="trash"
        label="label 3"
      />
      <v-context-menu-item
        icon="close"
        label="danger"
        variant="danger"
      />
    </v-context-menu>


    <!-- Context menu with floating UI example -->
    <div
      ref="parent"
      @click="showMenu = !showMenu"
    >
      hi there this is the parent
    </div>
    <v-context-menu 
      v-if="showMenu" 
      ref="child"
      :style="floatingStyles"
      @click="showMenu = false"
    >
      <v-context-menu-item 
        icon="send"
        label="and this is this child"
        @select="handleSelect"
      />
      <v-context-menu-item-separator />
      <v-context-menu-item 
        label="label really long item words really really really long"
        @select="handleSelect"
      />
      <v-context-menu-item 
        icon="close"
        label="label"
        variant="danger"
        @select="handleSelect"
      />
    </v-context-menu>
  </main>
</template>
