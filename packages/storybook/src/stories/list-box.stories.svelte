<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ListBox } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Label" />

<Story name="Default">
  <ListBox
    left="Charmander,Pikachu,Venusaur"
    right="Nidoqueen,Butterfree,Ditto,Gyardos,Machamp"
    leftlabel="Team"
    rightlabel="Box 1"
    disabled={false}
    height="200px"
    suffix={false}
  ></ListBox>
</Story>

<Story name="EmptyState">
  <ListBox
    left=""
    right=""
    leftlabel="Team"
    rightlabel="Box 1"
    disabled={false}
    height="200px"
    suffix={false}
  >
    <div slot="left-empty">Left empty state</div>
    <div slot="right-empty">Right empty state</div>
  </ListBox>
</Story>

<Story name="WithSuffix">
  <ListBox
    left="Charmander Fire,Pikachu Electric,Venusaur Grass"
    right="Nidoqueen Poison,Butterfree Poison/Bug,Ditto Normal,Gyardos Water/Dragon,Machamp Fighting"
    leftlabel="Team"
    rightlabel="Box 1"
    disabled={false}
    height="200px"
    suffix={true}
  ></ListBox>
</Story>
