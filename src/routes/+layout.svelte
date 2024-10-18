<script lang="ts">

import { playbackExec } from "#scripts/play";

import Nav from "#parts/nav.svelte";


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
  
      case "j:
        return playbackExec.shift(-10);
      case "l":
        return playbackExec.shift(+10);
    }
  }
}

</script>


<svelte:window on:keydown={onKeydown} />


<main id="ui-layout-page">
  <Nav>
  
  <div id="ui-layout-split">
    <section style:flex-grow={0.5}>
      <TrackDetails>
    </section>
  
    <section style:flex-grow={1}>
      <slot> Uh, something went wrong! </slot>
    </section>
  
    <section style:flex-grow={0.5}>
      <PlaybackDetails>
    </section>
  </div>
  
  <TrackControls>
</main>


<style lang="scss">

#ui-layout-split {
  width: 100%;
  height: 
  display: flex;
  flex-direction: row;
}

</style>
