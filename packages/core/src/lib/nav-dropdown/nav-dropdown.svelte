<script lang="ts">
import { clickOutside } from '$lib/click-outside';
import { Icon } from '$lib/icon';
import { createHandleKey } from '$lib/keyboard';
import { Floating, matchWidth } from '$lib/floating';

interface VersionOption {
  label: string;
  detail?: string;
  description?: string;
  href: string;
}

export let options: VersionOption[] = [];
export let selectedHref: string;

let isOpen = false;
let activeIndex = -1;
let buttonElement: HTMLButtonElement;

$: selected =
  options.find((opt) => opt.href === selectedHref)?.label ?? 'Latest Version';

const toggleDropdown = () => {
  isOpen = !isOpen;
};

const closeDropdown = () => {
  isOpen = false;
};

const handleKeydown = createHandleKey({
  Enter: () => {
    if (!isOpen) {
      isOpen = true;
    } else if (activeIndex >= 0) {
      const selectedOption = options[activeIndex];
      if (selectedOption) {
        window.location.href = selectedOption.href;
        closeDropdown();
      }
    }
  },
  ' ': () => {
    if (!isOpen) {
      isOpen = true;
    } else if (activeIndex >= 0) {
      closeDropdown();
    }
  },
  Escape: () => {
    if (isOpen) {
      closeDropdown();
    }
  },
  ArrowDown: () => {
    if (isOpen) {
      activeIndex = Math.min(activeIndex + 1, options.length - 1);
    } else {
      isOpen = true;
    }
  },
  ArrowUp: () => {
    if (isOpen) {
      activeIndex = Math.max(activeIndex - 1, 0);
    } else {
      isOpen = true;
    }
  },
});
</script>

<div class="group/select-input flex w-48">
  <button
    bind:this={buttonElement}
    class="relative z-[2] h-7.5 w-full grow appearance-none border border-light bg-white py-1.5 pl-2 pr-1 text-xs leading-tight outline-none group-hover:border-gray-6"
    on:click={toggleDropdown}
    on:keydown={handleKeydown}
    type="button"
    aria-haspopup="menu"
    aria-expanded={isOpen}
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
    <Floating
      referenceElement={buttonElement}
      placement="bottom-start"
      offset={4}
      size={matchWidth}
      auto
    >
      <div
        class="w-full overflow-auto border border-gray-6 bg-white shadow-sm focus:outline-none"
        role="menu"
        use:clickOutside={closeDropdown}
      >
        {#each options as { label, detail, description, href }, i}
          <a
            {href}
            class="relative flex items-center px-2 py-1.5 hover:bg-gray-1"
            class:bg-gray-1={i === activeIndex}
            role="menuitem"
            aria-current={i === activeIndex ? 'page' : 'false'}
          >
            <div class="flex flex-col">
              <div class="flex items-center text-xs">
                <span class="block truncate font-normal">{label}</span>
                {#if detail}
                  <span class="ml-1 text-gray-6">({detail})</span>
                {/if}
              </div>
              {#if description}
                <span class="block truncate text-[0.625rem] text-gray-6"
                  >{description}</span
                >
              {/if}
            </div>
          </a>
        {/each}
      </div>
    </Floating>
  {/if}
</div>
