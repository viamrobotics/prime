<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { uniqueId } from '@viamrobotics/prime-core';

const club = uniqueId();
const door = uniqueId();
const bouncer = uniqueId();
const first = uniqueId();
const second = uniqueId('real');
const third = uniqueId('fake');
</script>

<Meta title="APIs/uniqueId" />

<Story name="Example">
  <div class="flex gap-0.5">
    <div
      id={club}
      title={club}
      class="flex h-80 w-40 items-center justify-center bg-slate-700 text-white"
    >
      Club PRIME
    </div>

    <div
      id={door}
      title={door}
      class="h-20 w-4 bg-red-900"
    />

    <div class="flex flex-col gap-2">
      <div
        id={bouncer}
        title={bouncer}
        class="flex h-20 w-20 items-center justify-center bg-black text-white"
      >
        Bouncer
      </div>
      <div
        id={first}
        title={first}
        class="flex h-20 w-20 items-center justify-center bg-red-300"
      >
        Patron
      </div>
      <div
        id={second}
        title={second}
        class="flex h-20 w-20 items-center justify-center bg-blue-300"
      >
        Patron
      </div>
      <div
        id={third}
        title={third}
        class="flex h-20 w-20 items-center justify-center bg-yellow-300"
      >
        Patron
      </div>
    </div>
  </div>
</Story>
