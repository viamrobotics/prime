<svelte:options immutable={true} tag='v-select' />

<script lang='ts'>

// import cx from 'classnames'
import { addStyles } from '../../lib/index'

export let options: string = ''
export let selected: string = ''
export let open: boolean = false
export let placeholder: string = ''

let rootElement: HTMLElement
let parsedOptions: string[] 

$: parsedOptions = options.split(',').map((str) => str.trim())

addStyles()
const handleClick = (option: string) => {
  selected = option
  open = !open

  rootElement.dispatchEvent(new CustomEvent('select', {
    composed: true,
    bubbles: true,
    detail: {
      selected: selected
    },
  }))
}

let selectedOption: string

$: selectedOption = parsedOptions.find(opt => opt === selected) || placeholder

const handleToggle = (event: CustomEvent) => {
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
