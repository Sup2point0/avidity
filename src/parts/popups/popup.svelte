<script lang="ts">

import { nav } from "#scripts/stores";

import { fade } from "svelte/transition";
import { cubicOut } from "svelte/easing";

</script>


<div class="popup-overlay"
  on:click={() => $nav.popup = null}
  transition:fade={{ duration: 400, easing: cubicOut }}
>
  {#if $nav.popup == "credits"}
    <slot />
  {/if}
</div>


<style lang="scss">

.popup-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgb(black, 69%);
  backdrop-filter: blur(8px);
}

</style>
