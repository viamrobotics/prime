<script lang="ts">
import { clickOutside } from '$lib/click-outside';
import { Icon } from '$lib/icon';
import { createHandleKey } from '$lib/keyboard';
import { Floating, matchWidth } from '$lib/floating';

interface NavOption {
  label: string;
  detail?: string;
  description?: string;
  href: string;
}

export let options: NavOption[] = [];
export let selectedHref: string;

let isOpen = false;
let activeIndex = -1;
let buttonElement: HTMLButtonElement | undefined;

const toggleDropdown = () => {
  isOpen = !isOpen;
  activeIndex = isOpen ? 0 : -1;
};

const closeDropdown = () => {
  isOpen = false;
};

const handleMenuItemKeydown = createHandleKey({
  Escape: () => {
    closeDropdown();
    buttonElement?.focus();
    activeIndex = -1;
  },
});

const handleClickOutside = (element: Element) => {
  if (!buttonElement?.contains(element)) {
    closeDropdown();
  }
};

$: if (isOpen) {
  buttonElement?.focus();
}
</script>

<div class="group flex w-48">
  <button
    bind:this={buttonElement}
    class="relative z-[2] h-7.5 w-full grow appearance-none border border-light bg-white py-1.5 pl-2 pr-1 text-xs leading-tight outline-none group-hover:border-gray-6"
    on:click={toggleDropdown}
    type="button"
    aria-haspopup="menu"
    aria-expanded={isOpen}
  >
    <div class="flex items-center justify-between">
      <span class="block truncate text-xs">
        {options.find((opt) => opt.href === selectedHref)?.label ??
          'Latest Version'}
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
        use:clickOutside={handleClickOutside}
      >
        {#each options as { label, detail, description, href }, i}
          <a
            {href}
            class="relative flex flex-col px-2 py-1.5 hover:bg-gray-1 focus:bg-gray-1 focus:outline-none"
            class:bg-gray-1={i === activeIndex}
            role="menuitem"
            aria-current={href === selectedHref ? 'page' : 'false'}
            on:click={closeDropdown}
            on:keydown={handleMenuItemKeydown}
            on:focus={() => {
              activeIndex = i;
            }}
            on:blur={() => {
              activeIndex = -1;
            }}
            tabindex="0"
          >
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
          </a>
        {/each}
      </div>
    </Floating>
  {/if}
</div>
