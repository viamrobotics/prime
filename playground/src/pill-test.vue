<script setup lang="ts">

</script>

<template>
  <main class="m-3">
    <v-pill
      data-testid="default"
    />
    <v-pill
      data-testid="Value"
      value='one'
    />
    <v-pill
        data-testid="Removable:default"
    />
    <v-pill
    data-testid="Removable:true"
      removable="true"
    />
    <v-pill
    data-testid="Removable:false"
      removable="false"
    />
    <v-pill
    data-testid="Disabled:true"
    disabled="true"
    />
    <v-pill
    data-testid="Disabled:false"
    disabled="false"
    />
    <v-pill
    data-testid="Readonly:true"
    readonly="true"
    />
    <v-pill
    data-testid="Readonly:false"
    readonly="false"
    />
  </main>
</template>
