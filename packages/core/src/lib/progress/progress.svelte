<script lang="ts">
import cx from 'classnames';
export let size: 'small' | 'medium' | 'large' = 'small';
export let variant: 'dark' | 'light' = 'dark';
</script>

<div
  class={cx('container flex h-4 w-4 items-center justify-center p-[1.5px]', {
    '': size === 'small',
    'scale-[1.125]': size === 'medium',
    'scale-[1.5]': size === 'large',
  })}
>
  <div class="translate-x-[-6.5px]">
    {#each { length: 8 } as _, index}
      <div
        style="
            transform: rotate({index * 45}deg);
            animation-delay: {index * 100}ms;
          "
        class="pill absolute -mt-[0.5px] h-px w-[3px] rounded-[1px] {variant ===
        'dark'
          ? 'bg-gray-8'
          : 'bg-white'}"
      />
    {/each}
  </div>
</div>

<style>
.pill {
  transform-origin: 6.5px 0.5px;
  animation: 0.8s linear 0s infinite fadeout;
}

@keyframes fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
