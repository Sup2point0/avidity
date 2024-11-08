<script lang="ts">

import play_exec from "#scripts";
import { Tracks } from "#scripts/data";
import { nav, playback } from "#scripts/stores";
import { hydrate_data } from "#scripts/data/tracks";

import Credits from "#parts/popups/credits.svelte";

import { onMount } from "svelte";
import { fade } from "svelte/transition";
import { easeIn, easeOut } from "svelte/easing";


setInterval(() => {
  $playback.elapsed = play_exec.elapsed;
}, 250);


onMount(() => {
  $Tracks = hydrate_data($Tracks);
});


function on_keydown(event: KeyboardEvent)
{
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case " ":
        return play_exec.play_next();
  
      case "f":
      case "/":
        return;  // TODO focus search
    }
  }
  else {
    switch (event.key) {
      case " ":
      case "k":
        if (event.repeat) return;
        return play_exec.toggle_pause();

      case "ArrowLeft":
        return play_exec.shift(-5);
      case "ArrowRight":
        return play_exec.shift(+5);
  
      case "j":
        return play_exec.shift(-10);
      case "l":
        return play_exec.shift(+10);
    }
  }
}

</script>


<svelte:window on:keydown={on_keydown} />

<!-- <div class="notifs">
  {#each $nav.notifs as notif}
    <Notif kind={notif.kind} text={notif.text} />
  {/each}
</div> -->

{#if $nav.popup}
  <div class="popup-overlay"
    on:click={() => $nav.popup = null}
    transition:fade={{ duration: 400, easing: easeIn }}
  >
    {#if $nav.popup == "credits"}
      <Credits />
    {/if}
  </div>
{/if}

<slot> Uh, something has gone <em>really</em> wrong! </slot>


<style lang="scss">

div.notifs {
  width: 100%;
  position: absolute;
  bottom: 0;
}

div.popup-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(black, 69%);
  filter: blur(8px);
}

</style>
