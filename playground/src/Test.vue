<script setup lang="ts">
import PillTest from'./pill-test.vue'
import BreadcrumbsTest from './breadcrumb-test.vue';
import NotifyTest from './notify-test.vue'
import IconTest from './icon-test.vue'
import CollapseTest from './collapse-test.vue'

</script>

<template>
  <main>
    <v-collapse title="Click to find out!">
      <p>You found out!</p>
    </v-collapse>

    <v-multiselect
      label="Trinkets"
      options="Jolly logins, Sleeping hogins, Sticky bogins, Fiendish dogins"
      placeholder="Select some Bobbinses"
    />

    <v-select
      label="Bobbins"
      options="Jolly logs, Sleeping hogs, Sticky bogs, Fiendish dogs"
      placeholder="Select a Bobbins"
    />

    <v-list-box
      left="Charmander,Pikachu,Venusaur"
      right="Nidoqueen,Butterfree,Ditto,Gyardos,Machamp"
      leftlabel="Team"
      rightlabel="Box 1"
      disabled="false"
    >
      <div slot="left-empty">Your roster is empty</div>
      <div slot="right-empty">This box is empty</div>
    </v-list-box>
    <PillTest/>
    <BreadcrumbsTest /> 
    <NotifyTest />
    <IconTest />
    <CollapseTest />
  </main>
</template>
