<svelte:options immutable tag="v-accordion" />

<script lang="ts">
  import cx from 'classnames';
  import { addStyles } from '../lib/index';
  import { dispatcher } from '../lib/dispatch';
  import { htmlToBoolean } from '../lib/boolean';

  export let sections: { title: string; content: string; open?: string }[] = [];

  const dispatch = dispatcher();

  addStyles();

  let openSections: boolean[] = [];

  $: openSections = sections.map(section => htmlToBoolean(section.open, 'open') ? true : false);

  const toggleSection = (index: number) => {
    openSections[index] = !openSections[index];
    dispatch('toggle', { index, isOpen: openSections[index] });
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Enter') {
      toggleSection(index);
    }
  };
</script>

<div class="relative w-full" on:keydown={(event) => handleKeyDown(event, -1)}>
  {#each sections as section, index}
    <div
      class="p-4 flex items-center justify-between text-default cursor-pointer accordion-header"
      on:click={() => toggleSection(index)}
      on:keydown={(event) => handleKeyDown(event, index)}
    >
      {#if section.title}
        <h2 class="m-0 text-sm">
          <slot name="title">{section.title}</slot>
        </h2>
      {/if}

      <slot name="title" />

      <v-icon
        class={cx('transition-transform duration-200', {
          'rotate-0': !openSections[index],
          'rotate-180': openSections[index],
        })}
        name="chevron-down"
        size="2xl"
      />
    </div>

    <div
      class="text-black transition-all duration-500 accordion-content"
      class:visible={openSections[index]}
    >
      <slot name="content">{section.content}</slot>
    </div>
  {/each}
</div>
