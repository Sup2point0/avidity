<script lang="ts">

import play_exec from "#scripts";
import { Tracks } from "#scripts/data";
import { nav, playback } from "#scripts/stores";
import { hydrate_data } from "#scripts/data/tracks";

import { onMount } from "svelte";
import Popup from "#src/parts/popups/popup.svelte";
import Credits from "#src/parts/popups/credits.svelte";


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

<div class="tomorrow-night-blue">
  <!-- <div class="notifs">
    {#each $nav.notifs as notif}
      <Notif kind={notif.kind} text={notif.text} />
    {/each}
  </div> -->

  {#if $nav.popup}
    <Popup>
      <Credits />
    </Popup>
  {/if}

  <slot> Uh, something has gone <em>really</em> wrong! </slot>
</div>


<style lang="scss">

div.notifs {
  width: 100%;
  position: absolute;
  bottom: 0;
}

</style>
