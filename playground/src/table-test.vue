<script setup lang="ts">

</script>

<template>
  <main class="m-3">
    <v-table 
      data-testid='table-auto' 
      class='table' 
      variant="auto"
      cols="5%, 15%, 20%, 25%, 35%"
    >
      <v-thead>
        <v-th><input type="checkbox"></v-th>
        <v-th>Name</v-th>
        <v-th>Address</v-th>
        <v-th>Overlylongunbrokenheader</v-th>
        <v-th>Phone</v-th>
      </v-thead>
      <v-tbody class="text-center">
        <v-tr>
          <v-td><input type="checkbox"></v-td>
          <v-td>hey</v-td>
          <v-td>whothehecknamedthisstreetanyway</v-td>
          <v-td>Someunbrokenlongtextthingamajig</v-td>
          <v-td>111-111-1111</v-td>
        </v-tr>
        <v-tr data-testid='table-row-auto' variant='auto'>
          <v-td><input type="checkbox"></v-td>
          <v-td>Average Joe</v-td>
          <v-td>123 Sesame Street</v-td>
          <v-td>short1</v-td>
          <v-td>222-222-2222</v-td>
        </v-tr>
        <v-tr data-testid='table-row-success' variant='success'>
          <v-td><input type="checkbox"></v-td>
          <v-td>Ms. Success</v-td>
          <v-td>Antarctica</v-td>
          <v-td>short2</v-td>
          <v-td>333-333-3333</v-td>
        </v-tr>
        <v-tr data-testid='table-row-disabled' variant='disabled'>
          <v-td><input type="checkbox"></v-td>
          <v-td>Mr. Disabled</v-td>
          <v-td>1 Don't Touch Me</v-td>
          <v-td>short3</v-td>
          <v-td>444-444-4444</v-td>
        </v-tr>
        <v-tr data-testid='table-row-error' variant='error'>
          <v-td><input type="checkbox"></v-td>
          <v-td>Error</v-td>
          <v-td>Mars</v-td>
          <v-td>short4</v-td>
          <v-td>555-555-5555</v-td>
        </v-tr>
      </v-tbody>
    </v-table>

    <v-table 
      data-testid='table-fixed' 
      class='table' 
      variant="fixed" 
      cols="5%, 15%, 20%, 25%, 35%"
    >
      <v-thead>
        <v-th><input type="checkbox"></v-th>
        <v-th>Name</v-th>
        <v-th>Address</v-th>
        <v-th>Overlylongunbrokenheader</v-th>
        <v-th>Phone</v-th>
      </v-thead>
      <v-tbody class="text-center">
        <v-tr>
          <v-td><input type="checkbox"></v-td>
          <v-td>hey</v-td>
          <v-td>whothehecknamedthisstreetanyway</v-td>
          <v-td>Someunbrokenlongtextthingamajig</v-td>
          <v-td>111-111-1111</v-td>
        </v-tr>
      </v-tbody>
    </v-table>
  </main>
</template>
