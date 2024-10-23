<script lang="ts">

import "#styles/essence.scss";

import Nav from "#parts/nav.svelte";
import TrackDetails from "#parts/track-details.svelte";
// import PlaybackDetails from "#parts/playback-details/index.svelte";
import TrackControls from "#parts/track-controls.svelte";

</script>


<main class="tomorrow-night-blue">
  <Nav />
  
  <div class="ui-layout" id="split">
    <section class="ui-layout" id="left">
      <TrackDetails />
    </section>
  
    <section class="ui-layout" id="core">
      <slot> Uh, something went wrong! </slot>
    </section>
  
    <section class="ui-layout" id="right">
      <!-- <PlaybackDetails /> -->
    </section>
  </div>
  
  <TrackControls />
</main>


<style lang="scss">

main {
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--col-back);
}

.ui-layout {
  &#split {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: start;
  }

  &#left {
    flex-grow: 0.25;
    overflow-y: hidden;
  }

  &#core {
    flex-grow: 1;
    overflow-y: hidden;
  }

  &#right {
    flex-grow: 0.25;
    overflow-y: hidden;
  }
}

</style>
