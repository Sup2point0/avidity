<script lang="ts">

import "#styles/essence.scss";

import Nav from "#parts/nav.svelte";
import TrackDetails from "#parts/track-details/index.svelte";
import PlaybackDetails from "#parts/playback-details/index.svelte";
import TrackControls from "#parts/track-controls/index.svelte";

</script>


<main class="avidity">
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

#ui-layout-split {
  width: 100%;
}

</style>
