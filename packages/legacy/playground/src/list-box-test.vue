<script setup lang="ts">

</script>

<template>
    <main class="m-3">
    
    <v-list-box
      left="Charmander,Pikachu,Venusaur"
      right="Nidoqueen,Butterfree,Ditto,Gyardos,Machamp"
      leftlabel="Team"
      rightlabel="Box 1"
      disabled="false"
    >
        <div 
            slot="left-empty">
                Your roster is empty
        </div>
        <div 
            slot="right-empty">
                This box is empty
        </div>
    </v-list-box>
    
    </main>
</template>
