<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Icon from '$lib/icon/icon.svelte';
import Pill from '$lib/pill.svelte';
import Tooltip from '$lib/tooltip.svelte';

let buttonClickedTimes = 0;
</script>

<div class="container mx-auto my-4 p-4 flex flex-col gap-8">
  <div>
    <!-- Badge -->
    <Badge
      variant="gray"
      label="Inactive"
    />
    <Badge
      variant="green"
      label="Active"
    />
    <Badge
      variant="orange"
      label="Danger"
    />
    <Badge
      variant="red"
      label="Unhealthy"
    />
    <Badge
      variant="blue"
      label="Info"
    />
  </div>

  <!-- Breadcrumbs -->
  <Breadcrumbs crumbs={['Chocolate Chip', 'Oatmeal Raisin']} />

  <div class="flex gap-4">
    <!-- Button -->
    <Button
      variant="success"
      label="Console log"
      on:click={() => {
        buttonClickedTimes += 1;
        // eslint-disable-next-line no-console
        console.log(`button clicked ${buttonClickedTimes} times!`);
      }}
    />
    <Button
      variant="success"
      disabled
      label="testing 2"
    />
    <Button
      label="testing 3"
      width="full"
    />
  </div>

  <div class="flex gap-4">
    <!-- Pill -->
    <Pill />
    <Pill value="Foo" />
    <Pill
      readonly
      value="Bar"
    />
    <Pill
      disabled
      value="Baz"
    />
  </div>

  <div>
    <!-- Tooltip -->
    <Tooltip>
      This element has a top tooltip.
      <!-- TODO (APP-2290): Uncomment this when Icon is added -->
      <!-- <Icon
        slot="icon"
        name="information-outline"
      /> -->
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="left">
      This element has a left tooltip.
      <!-- TODO (APP-2290): Uncomment this when Icon is added -->
      <!-- <Icon
        slot="icon"
        name="information-outline"
      /> -->
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="right">
      This element has a right tooltip.
      <!-- TODO (APP-2290): Uncomment this when Icon is added -->
      <!-- <Icon
        slot="icon"
        name="information-outline"
      /> -->
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="bottom">
      This element has a bottom tooltip.
      <!-- TODO (APP-2290): Uncomment this when Icon is added -->
      <!-- <Icon
        slot="icon"
        name="information-outline"
      /> -->
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>
  </div>

  <div class="flex gap-4">
    <!-- Icons -->
    <p class='text-danger-dark'>
      <Icon
      name='cog' 
      size='xs' 
      />
    </p>
    
    <p class='text-warning-bright'>
      <Icon
      name='cog' 
      size='sm' 
      />
    </p>

    <p class='text-danger-dark'>
      <Icon
      name='cog' 
      size='base' 
      />
    </p>
    
    <p class='text-warning-bright'>
      <Icon
      name='cog' 
      size='lg' 
      />
    </p>
    
    <p class='text-danger-dark'>
      <Icon
      name='cog' 
      size='xl' 
      />
    </p>
    
    <p class='text-warning-bright'>
      <Icon
      name='cog' 
      size='2xl' 
      />
    </p>
    
    <p class='text-danger-dark'>
      <Icon
      name='cog' 
      size='3xl' 
      />
    </p>
    
    <p class='text-warning-bright'>
      <Icon
      name='cog' 
      size='4xl' 
      />
    </p>
  </div>
</div>