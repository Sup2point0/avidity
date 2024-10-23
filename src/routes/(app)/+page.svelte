<script lang="ts">

import TrackRow from "#parts/track-row.svelte";

import play from "#scripts";
import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";

$: log = JSON.stringify($play, null, 2);

</script>


{#each Object.keys($Tracks) as track}
  <TrackRow track={track} />
{/each}


<section>
  <h2> debug </h2>
  <pre>$play: {log} </pre>
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
