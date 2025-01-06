<script lang="ts">
import { clickOutside } from '$lib/click-outside';
import { Icon } from '$lib/icon';
import { goto } from '$app/navigation';

interface VersionOption {
  label: string;
  timeAgo?: string;
  description?: string;
  href: string;
}

export let options: VersionOption[] = [];

let isOpen = false;

const toggleDropdown = () => {
  isOpen = !isOpen;
};

const closeDropdown = () => {
  isOpen = false;
};

export let selectedOption: string | undefined = undefined;
$: selected = selectedOption ?? options[0]?.label ?? 'Latest Version';

let activeIndex = -1;

const handleSelect = async (label: string, href: string) => {
  selected = label;
  closeDropdown();
  await goto(href);
};

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ': {
      if (!isOpen) {
        event.preventDefault();
        isOpen = true;
      } else if (activeIndex >= 0) {
        event.preventDefault();
        const option = options[activeIndex];
        if (option) {
          void handleSelect(option.label, option.href);
        }
      }
      break;
    }
    case 'Escape': {
      if (isOpen) {
        event.preventDefault();
        closeDropdown();
      }
      break;
    }
    case 'ArrowDown': {
      event.preventDefault();
      if (isOpen) {
        activeIndex = Math.min(activeIndex + 1, options.length - 1);
      } else {
        isOpen = true;
      }
      break;
    }
    case 'ArrowUp': {
      event.preventDefault();
      if (isOpen) {
        activeIndex = Math.max(activeIndex - 1, 0);
      } else {
        isOpen = true;
      }
      break;
    }
  }
};
</script>

<div
  class="group/select-input relative flex w-48"
  use:clickOutside={closeDropdown}
>
  <button
    class="relative z-[2] h-7.5 w-full grow appearance-none border py-1.5 pl-2 pr-1 text-xs leading-tight outline-none border-light bg-white group-hover/select-input:border-gray-6"
    on:click={toggleDropdown}
    on:keydown={handleKeydown}
    type="button"
  >
    <div class="flex items-center justify-between">
      <span class="block truncate text-xs">
        {selected}
      </span>
      <Icon
        name="chevron-down"
        cx={['text-gray-6 transition-transform', { 'rotate-180': isOpen }]}
      />
    </div>
  </button>

  {#if isOpen}
    <nav
      class="absolute top-[34px] z-[1] w-full overflow-auto border border-gray-6 bg-white shadow-sm focus:outline-none"
    >
      {#each options as { label, timeAgo, description, href }, i}
        <a
          {href}
          class="relative flex select-none items-center px-2 py-1.5 hover:bg-gray-1 {i === activeIndex ? 'bg-gray-1' : ''}"
          role="menuitem"
          on:click={async () => handleSelect(label, href)}
        >
          <div>
            <div class="flex items-center text-xs">
              <span class="block truncate font-normal">{label}</span>
              {#if timeAgo}
                <span class="ml-1 text-gray-6">({timeAgo})</span>
              {/if}
            </div>
            {#if description}
              <span class="block truncate text-[0.625rem] text-gray-6">{description}</span>
            {/if}
          </div>
        </a>
      {/each}
    </nav>
  {/if}
</div>
