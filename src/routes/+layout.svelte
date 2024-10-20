<script lang="ts">

import playback_executive from "#scripts";
import { Tracks } from "#scripts/data";
import { hydrate_data } from "#scripts/data/tracks";

import { onMount } from "svelte";


onMount(() => {
  Tracks.update(data => hydrate_data(data));
});


function on_keydown(event: KeyboardEvent)
{
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case " ":
        return playback_executive.play_next();
  
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
        return playback_executive.toggle_pause();

      case "ArrowLeft":
        return playback_executive.shift(-5);
      case "ArrowRight":
        return playback_executive.shift(+5);
  
      case "j":
        return playback_executive.shift(-10);
      case "l":
        return playback_executive.shift(+10);
    }
  }
}

</script>


<svelte:window on:keydown={on_keydown} />

<slot> Uh, something has gone <em>really</em> wrong! </slot>


<style lang="scss">

</style>
