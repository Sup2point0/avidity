<script lang="ts">

import "#styles/essence.scss";

import { nav } from "#scripts/stores";
import { find_track } from "#scripts/utils";

import Nav from "#parts/panes/nav.svelte";
import TrackDetails from "#parts/panes/track-details.svelte";
import PlaybackDetails from "#parts/panes/playback-details.svelte";
import TrackControls from "#src/parts/panes/track-controls.svelte";


$: track = find_track($nav.selected_track);
$: image = track && `url(/covers/${track?.artist}/${track?.cover})`;

</script>


<div id="page" class="ui-layout"
  style:background-image={image}
>
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
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
    align-items: stretch;

    div {
      min-height: 0;
      max-height: inherit;
    }
  }

  #left {
    flex-grow: 0.25;
    overflow: hidden;
  }

  #core {
    flex: 1 1 auto;
    overflow: hidden;
  }

  #right {
    flex-grow: 0.5;
    overflow: hidden;
  }
}

</style>
