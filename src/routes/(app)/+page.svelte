<script lang="ts">

import { Tracks } from "#scripts/data";
import { playback, search } from "#scripts/stores";
import { find_track, filter_tracks } from "#scripts/utils";

import TrackRow from "#parts/track-row.svelte";


$: tracks = Object.keys($Tracks).map(shard => find_track(shard));
$: filtered = $search.dirty ? filter_tracks(tracks, $search) : tracks;

</script>


<main>
  {#each filtered as track}
    <TrackRow track={track} />
  {/each}
</main>


<style lang="scss">

main {
  height: 100%;
  min-height: 0;
  z-index: 1;
  overflow-y: scroll;
  
  scrollbar-color: var(--col-text-deut) var(--col-back);
  scrollbar-width: thick;
}
</style>
