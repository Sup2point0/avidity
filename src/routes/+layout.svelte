<script lang="ts">

import { playbackExec } from "#scripts/play";

import Nav from "#parts/nav.svelte";


function onKeydown(event)
{
  if (event.repeat) return;
}

function onKeyup(event)
{
  if (event.repeat) return;
}

</script>


<svelte:window
  on:keydown={onKeydown}
  on:keyup={onKeyup}
/>


<div id="ui-layout-page">

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

</div>


<style lang="scss">

#ui-layout-split {
  width: 100%;
  height: 
  display: flex;
  flex-direction: row;
}

</style>
