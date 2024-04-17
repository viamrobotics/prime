<!-- @TODO(mp) Rip this out and make it our canonical loader. -->
<div class="container">
  {#each { length: 8 } as _, index}
    <div
      style="transform: rotate({index * 45}deg); animation-delay: {index *
        100}ms"
      class="pill bg-gray-8"
    />
  {/each}
</div>

<style>
.container {
  display: flex;
  align-items: center;
  margin: 0 0;
  width: 16px;
  padding: 1.5px;
  margin-left: -4px;
}
.pill {
  position: absolute;
  width: 3px;
  height: 1px;
  border-radius: 1px;
  transform-origin: 6.5px 0.5px;
  margin-top: -0.5px;
  animation: 0.8s linear 0s infinite fadeinout;
}

@keyframes fadeinout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
