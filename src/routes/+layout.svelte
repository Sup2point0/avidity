<script lang="ts">

import { playbackExec } from "#scripts/play";

import Nav from "#parts/nav.svelte";
import TrackDetails from "#parts/track-details/index.svelte";
import PlaybackDetails from "#parts/playback-details/index.svelte";
import TrackControls from "#parts/track-controls/index.svelte";


function onKeydown(event)
{
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case " ":
        return playbackExec.playNext();
  
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
        return playbackExec.togglePause();

      case "ArrowLeft":
        return playbackExec.shift(-5);
      case "ArrowRight":
        return playbackExec.shift(+5);
  
      case "j":
        return playbackExec.shift(-10);
      case "l":
        return playbackExec.shift(+10);
    }
  }
}

</script>


<svelte:window on:keydown={onKeydown} />


<main>
  <Nav />
  
  <div id="ui-layout-split">
    <section style:flex-grow={0.5}>
      <TrackDetails />
    </section>
  
    <section style:flex-grow={1}>
      <slot> Uh, something went wrong! </slot>
    </section>
  
    <section style:flex-grow={0.5}>
      <PlaybackDetails />
    </section>
  </div>
  
  <TrackControls />
</main>


<style lang="scss">

main {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
}

</style>
