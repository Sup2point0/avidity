<script lang="ts">

import "#styles/essence.scss";

import Nav from "#parts/nav.svelte";
import TrackDetails from "#parts/track-details.svelte";
import PlaybackDetails from "#parts/playback-details.svelte";
import TrackControls from "#parts/track-controls.svelte";

</script>


<div id="page" class="ui-layout tomorrow-night-blue">
  <div class="bar">
    <Nav />
  </div>
  
  <div id="split">
    <div id="left">
      <TrackDetails />
    </div>
  
    <div id="core">
      <slot> Uh, something went wrong! </slot>
    </div>
  
    <div id="right">
      <PlaybackDetails />
    </div>
  </div>
  
  <div class="bar">
    <TrackControls />
  </div>
</div>


<style lang="scss">

#page {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--col-back);
  overflow: hidden;
  // overflow-y: scroll;
}

.ui-layout {
  .bar {
    flex: 0 0 auto;
  }

  #split {
    min-height: 0;
    max-height: inherit;
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: start;

    div {
      min-height: 0;
      max-height: inherit;
    }
  }

  #left, #right {
    flex-grow: 0.25;
    overflow: hidden;
    // overflow-y: scroll;
  }

  #core {
    flex: 0 1 auto;
    overflow: hidden;
    // overflow-y: scroll;
  }
}

</style>
