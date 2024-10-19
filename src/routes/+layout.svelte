<script lang="ts">

import { playback_exec } from "#scripts/play";


function on_keydown(event)
{
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case " ":
        return playback_exec.playNext();
  
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
        return playback_exec.togglePause();

      case "ArrowLeft":
        return playback_exec.shift(-5);
      case "ArrowRight":
        return playback_exec.shift(+5);
  
      case "j":
        return playback_exec.shift(-10);
      case "l":
        return playback_exec.shift(+10);
    }
  }
}

</script>


<svelte:window on:keydown={on_keydown} />

<slot> Uh, something has gone <em>really</em> wrong! </slot>


<style lang="scss">

</style>
