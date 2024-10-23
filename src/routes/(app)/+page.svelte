<script lang="ts">

import TrackRow from "#parts/track-row.svelte";

import play_exec from "#scripts";
import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";

</script>


{#each Object.keys($Tracks).slice(0, 4) as track}
  <TrackRow track={track} />
{/each}


<section>
  <h2> debug </h2>
  <pre>play_exec: {JSON.stringify(play_exec, null, 2)} </pre>
  <pre>$playback: {JSON.stringify($playback, null, 2)} </pre>
</section>


<style lang="scss">
  section {
    padding: 1rem;
    position: absolute;
    top: 0;
    right: 1rem;
    color: white;
    background-color: rgb(0 0 0 / 80%);

    > * {
      margin: 1rem;
      display: block;
    }
  }
</style>
