<script lang="ts">

import { nav } from "#scripts/stores";

import { fade, fly } from "svelte/transition";
import { easeIn, easeOut } from "svelte/easing";

export let shard: string;
export let kind: "success" | "error" | undefined = undefined;
export let text: string;

</script>


<button
  on:click={() => $nav.notifs.splice($nav.notifs.indexOf(shard))}
  style:background-color={
      (kind == "error") ? "var(--col-deut)"
    : (kind == "success") ? "var(--col-prot)"
    : "var(--col-back-deut)"
  }
  in:fly={{ duration: 200, y: -50, easing: easeOut }}
  out:fade={{ duration: 200, easing: easeIn }}
>
  {text}
</button>


<style lang="scss">

button {
  min-width: 4rem;
  min-height: 2rem;

  @include font-ui;
  text-align: center;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 0 5px var(--col-shadow);

  &:hover, &:focus {
    transform: scale(1.02);
    filter: brightness(1.08);
  }

  &:click {
    transform: scale(0.92);
    filter: brightness(0.96);
  }
}

</style>
