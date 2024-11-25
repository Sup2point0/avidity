<!-- @component TracksPage

The page for selecting a track to play.
-->

<script lang="ts">

import { Tracks } from "#scripts/data";
import { search, searchDirty } from "#scripts/stores";
import { find_track, filter_tracks } from "#scripts/utils";

import Header from "#src/parts/panes/header.svelte";
import SearchControls from "#src/parts/search-controls.svelte";
import TrackRow from "#parts/track-row.svelte";


$: tracks = Object.keys($Tracks).map(shard => find_track(shard));
$: filtered = searchDirty ? filter_tracks(tracks, $search) : tracks;

</script>


<Header title="Tracks" />

<main>
  <SearchControls />

  <div class="tracks">
    {#each filtered as track}
      {#if track}
        <TrackRow track={track} />
      {/if}
    {/each}
  </div>
</main>


<style lang="scss">

main {
  height: 100%;
  min-height: 0;
  z-index: 1;
  overflow-y: scroll;
  background-color: color-mix(in oklch, var(--col-back), transparent 4%);
  @include frost-blur;
  
  scrollbar-color: var(--col-text-deut) var(--col-back);
  scrollbar-width: thick;
}

</style>
