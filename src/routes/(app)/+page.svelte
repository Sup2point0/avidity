<script lang="ts">

import TrackRow from "#parts/track-row.svelte";

import playback_executive from "#scripts";
import { playback } from "#scripts/stores";

</script>


<TrackRow track="dawn" />
<TrackRow track="day" />
<TrackRow track="terabyte" />


<section>
  <h2> debug </h2>
  <pre>playback_executive: {JSON.stringify(playback_executive, null, 2)} </pre>
  <pre>$playback: {JSON.stringify($playback, null, 2)} </pre>
</section>


<style lang="scss">
  section {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    background-color: rgb(0 0 0 / 80%);

    > * {
      margin: 1rem;
      display: block;
    }
  }
</style>
