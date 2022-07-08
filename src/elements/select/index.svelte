<svelte:options immutable={true} tag='v-select' />

<script lang='ts'>

import { addStyles } from '../../lib/index'

export let options = ''
export let selected = ''
export let open = false
export let placeholder = ''

let rootElement: HTMLElement
let parsedOptions: string[]
let selectedOption: string

$: parsedOptions = options.split(',').map((str) => str.trim())
$: selectedOption = parsedOptions.find(opt => opt === selected) || placeholder

addStyles()

const handleClick = (option: string) => {
  selected = option
  open = !open

  rootElement.dispatchEvent(new CustomEvent('select', {
    composed: true,
    bubbles: true,
    detail: {
      selected,
    },
  }))
}

const handleToggle = (event: CustomEvent<{open: boolean}>) => {
  open = event.detail.open
}

</script>

<v-collapse bind:this={rootElement} title={selectedOption} open={open} on:toggle={handleToggle}>
  <div class="flex flex-col gap-2 p-2">
    {#each parsedOptions as option (option)}
      <div
        class="cursor-pointer px-2 hover:bg-gray-100"
        on:click={() => handleClick(option)}
      >
        { option }
      </div>
    {/each}
  </div>
</v-collapse>
