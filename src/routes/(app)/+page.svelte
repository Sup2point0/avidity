<script lang="ts">

import TrackRow from "#parts/track-row.svelte";

import play_exec from "#scripts";
import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";

</script>


<main>
  {#each Object.keys($Tracks) as track}
    <TrackRow track={track} />
  {/each}
</main>


<section>
  <h2> debug </h2>
  <pre>play_exec: {JSON.stringify(play_exec, null, 2)} </pre>
  <pre>$playback: {JSON.stringify($playback, null, 2)} </pre>
</section>


<style lang="scss">

main {
  height: 100%;
  min-height: 0;
  z-index: 1;
  overflow-y: scroll;
  
  scrollbar-color: var(--col-text-deut) var(--col-back);
  scrollbar-width: thick;
}

  section {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    left: 1rem;
    color: white;
    background-color: rgb(0 0 0 / 90%);

    &:hover {
      display: none;
    }

    > * {
      margin: 1rem;
      display: block;
    }
  }
</style>
