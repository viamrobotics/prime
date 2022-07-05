<svelte:options tag='v-slider' />

<style>
  :host { display: block }

  .slider .range:hover .handle-bg {
    transform: scale(1.5);
  }

  .slider .range.active .handle-bg {
    transform: scale(2.0);
  }

  .slider .range.active .floating,
  .slider .range:hover .floating {
    opacity: 1;
  }
</style>

<script lang='ts'>
  import { spring } from 'svelte/motion'
  import type { Spring } from 'svelte/motion'
  import cn from 'classnames'
  import { clamp, percentOf } from '../../lib/math'
  import { addStyles } from '../../lib/index'

  // dom references
  export let slider: HTMLElement

  // range slider props
  export let range: string | boolean = false
  export let min: string
  export let max: string
  export let step: string
  export let start: string
  export let end: string
  export let disabled = false
  export let discrete = true

  // formatting props
  export let suffix = ''

  addStyles()

  const springValues = { stiffness: 0.1, damping: 0.4 }

  let minNum: number
  let maxNum: number
  let stepNum: number
  let startValue: number
  let endValue: number | undefined
  let pipStep: number
  let pipCount: number

  $: pipStep = ((maxNum - minNum) / stepNum >= 100 ? (maxNum - minNum) / 20 : 1)
  $: pipCount = (maxNum - minNum) / stepNum
  $: pipVal = (val: number): number => minNum + val * stepNum * pipStep
  $: minNum = Number.parseFloat(min || '0')
  $: maxNum = Number.parseFloat(max || '100')
  $: stepNum = Number.parseFloat(step || '1')
  $: startValue = start ? Number.parseFloat(start) : (Number.parseFloat(min || '0') + Number.parseFloat(max || '100')) / 2
  $: endValue = end ? Number.parseFloat(end) : undefined

  // state management
  let valueLength = 0
  let focus = false
  let handleActivated = false
  let handlePressed = false
  let keyboardActive = false
  let activeHandle = -1
  let previousValue: number
  let sliderDimensions: DOMRect

  // copy the initial values in to a spring function which
  // will update every time the values array is modified

  let springPositions: Spring<number[]>

  $: {
    // trim the range so it remains as a min/max (only 2 handles)
    // and also align the handles to the steps
    startValue = alignValueToStep(startValue, minNum, maxNum)

    let arr = [startValue]

    if (endValue) {
      endValue = alignValueToStep(endValue, minNum, maxNum)
      arr.push(endValue)
    }

    arr = trimRange(arr)

    // check if the valueLength (length of values[]) has changed,
    // because if so we need to re-seed the spring function with the
    // new values array.
    if (valueLength !== arr.length) {
      // set the initial spring values when the slider initialises,
      // or when values array length has changed
      springPositions = spring(arr.map((v) => percentOf(v, minNum, maxNum, 2)), springValues)
    } else {
      // update the value of the spring function for animated handles
      // whenever the values has updated
      springPositions.set(arr.map((v) => percentOf(v, minNum, maxNum, 2))).catch((error) => console.error(error))
    }
    // set the valueLength for the next check
    valueLength = arr.length
  }

  /**
   * align the value with the steps so that it
   * always sits on the closest (above/below) step
   **/
  const alignValueToStep = (val: number, minVal: number, maxVal: number): number => {
    // sanity check for performance
    if (val <= minVal) {
      return minVal
    } else if (val >= maxVal) {
      return maxVal
    }

    // find the middle-point between steps
    // and see if the value is closer to the
    // next step, or previous step
    const remainder = (val - minVal) % stepNum
    let aligned = val - remainder
    if (Math.abs(remainder) * 2 >= stepNum) {
      aligned += remainder > 0 ? stepNum : -stepNum
    }
    // make sure the value is within acceptable limits
    aligned = clamp(aligned, minVal, maxVal)
    // make sure the returned value is set to the precision desired
    // this is also because javascript often returns weird floats
    // when dealing with odd numbers and percentages

    return Number.parseFloat(aligned.toFixed(2))
  }

  /**
   * normalise a mouse or touch event to return the
   * client (x/y) object for that event
   **/
  const normalisedClient = (event: MouseEvent | TouchEvent): MouseEvent | Touch => {
    return event.type.includes('touch')
      ? (event as TouchEvent).touches[0]!
      : event as MouseEvent
  }

  /**
   * check if an element is a handle on the slider
   **/
  const targetIsHandle = (el: HTMLElement): boolean => {
    const handles = [...slider.querySelectorAll('.handle')]
    const isHandle = handles.includes(el)
    const isChild = handles.some((e) => e.contains(el))
    return isHandle || isChild
  }

  /**
   * trim the values array based on whether the property
   * for 'range' is 'min', 'max', or truthy. This is because we
   * do not want more than one handle for a min/max range, and we do
   * not want more than two handles for a true range.
   **/
  const trimRange = (arr: number[]): number[] => {
    if (range === 'min' || range === 'max') {
      return arr.slice(0, 1)
    } else if (range) {
      return arr.slice(0, 2)
    } else {
      return arr
    }
  }

  const getSliderDimensions = () => {
    sliderDimensions = slider.getBoundingClientRect()
  }

  /**
   * helper to return closest handle to user interaction
   **/
  const getClosestHandle = (clientPos: Touch | MouseEvent): number => {
    // calculate the interaction position, percent and value
    const handlePos = clientPos.clientX - sliderDimensions.left
    const handlePercent = (handlePos / sliderDimensions.width) * 100
    const handleVal = ((maxNum - minNum) / 100) * handlePercent + minNum

    let closest = 0

    // if we have a range, and the handles are at the same
    // position, we want a simple check if the interaction
    // value is greater than return the second handle
    if (range && startValue === endValue) {
      return handleVal > endValue ? 1 : 0
    } else if (range) {
      closest = [startValue, endValue!].indexOf(
        [startValue, endValue!].sort((a, b) => Math.abs(handleVal - a) - Math.abs(handleVal - b))[0]!
      )
    }

    return closest
  }

  /**
   * take the interaction position on the slider, convert
   * it to a value on the range, and then send that value
   * through to the moveHandle() method to set the active
   * handle's position
   **/
  const handleInteract = (clientPos: { clientX: number; clientY: number }) => {
    // calculate the interaction position, percent and value
    const handlePos = clientPos.clientX - sliderDimensions.left
    const handlePercent = (handlePos / sliderDimensions.width) * 100
    const handleVal = ((maxNum - minNum) / 100) * handlePercent + minNum

    // move handle to the value
    moveHandle(activeHandle, handleVal)
  }

  /**
   * move a handle to a specific value, respecting the clamp/align rules
   **/
  const moveHandle = (i: number, value: number): number => {
    let index = i

    // align & clamp the value so we're not doing extra
    // calculation on an out-of-range value down below
    const alignedValue = alignValueToStep(value, minNum, maxNum)

    // use the active handle if handle index is not provided
    if (typeof index === 'undefined') {
      index = activeHandle
    }

    // if this is a range slider perform special checks
    if (range) {
      if (index === 0 && alignedValue > endValue!) {
        endValue = alignedValue
      } else if (index === 1 && alignedValue < startValue) {
        startValue = alignedValue
      }
    }

    // if the value has changed, update it
    if (index === 0 && startValue !== alignedValue) {
      startValue = alignedValue
    }

    if (index === 1 && endValue !== alignedValue) {
      endValue = alignedValue
    }

    // fire the change event when the handle moves,
    // and store the previous value for the next time
    if (previousValue !== alignedValue) {
      onChange()
      previousValue = alignedValue
    }

    if (index === 0) {
      start = startValue.toString()
    } else if (index === 1) {
      end = endValue!.toString()
    }

    return alignedValue
  }

  /**
   * helper to find the beginning range value for use with css style
   **/
  const rangeStart = (arr: number[]): number => {
    return range === 'min' ? 0 : arr[0]!
  }

  /**
   * helper to find the ending range value for use with css style
   **/
  const rangeEnd = (arr: number[]): number => {
    if (range === 'max') {
      return 0
    } else if (range === 'min') {
      return 100 - arr[0]!
    } else {
      return 100 - arr[1]!
    }
  }

  /**
   * when the user has unfocussed (blurred) from the
   * slider, deactivate all handles
   **/
  const handleSliderBlur = () => {
    if (keyboardActive) {
      focus = false
      handleActivated = false
      handlePressed = false
    }
  }

  /**
   * when the user focusses the handle of a slider
   * set it to be active
   **/
  const handleSliderFocus = (index: number) => {
    if (!disabled) {
      activeHandle = index
      focus = true
    }
  }

  /**
   * function to run when the user touches
   * down on the slider element anywhere
   * @param {event} e the event from browser
   **/
  const sliderInteractStart = (e: MouseEvent | TouchEvent) => {
    if (disabled) return

    getSliderDimensions()
    const el = e.target as HTMLElement
    const clientPos = normalisedClient(e)

    // set the closest handle as active
    focus = true
    handleActivated = true
    handlePressed = true
    activeHandle = getClosestHandle(clientPos)
    previousValue = alignValueToStep(activeHandle === 0 ? startValue : endValue!, minNum, maxNum)

    // for touch devices we want the handle to instantly
    // move to the position touched for more responsive feeling
    if (e.type === 'touchstart' && !el.matches('.pipVal')) {
      handleInteract(clientPos)
    }
  }

  const sliderInteractEnd = () => {
    handlePressed = false
  }

  /**
   * unfocus the slider if the user clicked off of
   * it, somewhere else on the screen
   **/
  const bodyInteractStart = (e: MouseEvent | TouchEvent) => {
    keyboardActive = false

    if (
      focus &&
      e.target !== slider &&
      !slider.contains(e.target as Node)
    ) {
      focus = false
    }
  }

  /**
   * send the clientX through to handle the interaction
   * whenever the user moves acros screen while active
   * @param {event} e the event from browser
   **/
  const bodyInteract = (e: MouseEvent | TouchEvent) => {
    if (disabled || !handleActivated) return

    focus = true
    handleInteract(normalisedClient(e))
  }

  /**
   * if user triggers mouseup on the body while
   * a handle is active (without moving) then we
   * trigger an interact event there
   **/
  const bodyMouseUp = (e: MouseEvent) => {
    if (!disabled) {
      const el = e.target as HTMLElement
      // this only works if a handle is active, which can
      // only happen if there was sliderInteractStart triggered
      // on the slider, already
      if (handleActivated && el && el === slider || slider.contains(el as Node)) {
        focus = true
        // don't trigger interact if the target is a handle (no need) or
        // if the target is a label (we want to move to that value from rangePips)
        if (!targetIsHandle(el) && !el.matches('.pipVal')) {
          handleInteract(normalisedClient(e))
        }
      }
    }
    handleActivated = false
    handlePressed = false
  }

  /**
   * if user triggers touchend on the body then we
   * defocus the slider completely
   **/
  const bodyTouchEnd = () => {
    handleActivated = false
    handlePressed = false
  }

  const bodyKeyDown = (e: KeyboardEvent) => {
    if (disabled) return

    if (e.target === slider || slider.contains(e.target as Node)) {
      keyboardActive = true
    }
  }

  const onChange = () => {
    if (disabled) return

    slider.dispatchEvent(new CustomEvent('input', {
      composed: true,
      bubbles: true,
      detail: {
        activeHandle,
        previousValue,
        value: activeHandle === 0 ? startValue : endValue,
        values: endValue
          ? [startValue, endValue].map((v) => alignValueToStep(v, minNum, maxNum))
          : undefined,
      },
    }))
  }
</script>

<div
  bind:this={slider}
  class={cn('slider relative rounded-full h-2 m-4 mt-7 transition-opacity duration-200 select-none pip-labels bg-gray-100', {
    'opacity-50': disabled,
  })}
  class:range
  class:focus
  class:min={range === 'min'}
  class:max={range === 'max'}
  on:mousedown={sliderInteractStart}
  on:mouseup={sliderInteractEnd}
  on:touchstart|preventDefault={sliderInteractStart}
  on:touchend|preventDefault={sliderInteractEnd}
>
  {#each endValue ? [startValue, endValue] : [startValue] as value, index}
    <span
      role='slider'
      class='range absolute block h-5 w-5 top-1 bottom-auto -translate-x-1/2 -translate-y-1/2 z-[2]'
      class:active={focus && activeHandle === index}
      class:press={handlePressed && activeHandle === index}
      data-handle={index}
      on:blur={handleSliderBlur}
      on:focus={() => handleSliderFocus(index)}
      style='left: {$springPositions[index]}%; z-index: {activeHandle === index ? 3 : 2}'
      aria-valuemin={range === true && index === 1 ? startValue : minNum}
      aria-valuemax={range === true && index === 0 ? endValue : maxNum}
      aria-valuenow={value}
      aria-valuetext={value?.toString()}
      aria-orientation='horizontal'
      aria-disabled={disabled}
      {disabled}
      tabindex='{ disabled ? -1 : 0 }'
    > 
      <span class='handle-bg absolute left-0 top-0 rounded-full opacity-50 h-full w-full transition-transform bg-gray-400' />

      <span class='absolute left-0 top-0 block rounded-full h-full w-full shadow-lg bg-gray-400' />

      <span class={cn(
        'floating text-white block absolute left-1/2 bottom-3/4 -translate-x-1/2 -translate-y-1/2',
        'py-1 px-1.5 rounded text-base text-center opacity-0 pointer-events-none whitespace-nowrap transition duration-200 bg-[#99a2a2]',
        {
          '-translate-y-1': !focus || activeHandle !== index,
        }
      )}>
        {value}

        {#if suffix}
          <span class='floating-suffix'>{suffix}</span>
        {/if}
      </span>
    </span>
  {/each}

  {#if range}
    <span
      class='rangeBar absolute block transition duration-200 rounded-2xl h-2 top-0 select-none z-[1] bg-gray-200'
      style='left: {rangeStart($springPositions)}%; right: {rangeEnd($springPositions)}%' />
  {/if}

  <div 
    class='absolute h-2 left-0 right-0' 
    class:disabled
    class:focus 
  >
    <small class='absolute bottom-full left-0 mb-2 whitespace-nowrap'>
      {minNum}
      
      {#if suffix}
        <span class='pipVal-suffix'>{suffix}</span>
      {/if}
    </small>

    {#if discrete}
      {#each Array.from({ length: pipCount + 1 }) as _, i}
        {#if pipVal(i) !== minNum && pipVal(i) !== maxNum}
          <span
            class='absolute h-[3px] w-[3px] top-[calc(50%-1.5px)] whitespace-nowrap transition bg-gray-400 rounded-full'
            style='left: {percentOf(pipVal(i), minNum, maxNum, 2)}%;'
          />
        {/if}
      {/each}
    {/if}

    <small class='absolute bottom-full right-0 mb-2 whitespace-nowrap'>
      {maxNum}
      
      {#if suffix}
        <span class='pipVal-suffix'>{suffix}</span>
      {/if}
    </small>

  </div>
</div>

<svelte:window
  on:mousedown={bodyInteractStart}
  on:touchstart={bodyInteractStart}
  on:mousemove={bodyInteract}
  on:touchmove={bodyInteract}
  on:mouseup={bodyMouseUp}
  on:touchend={bodyTouchEnd}
  on:keydown={bodyKeyDown}
/>
