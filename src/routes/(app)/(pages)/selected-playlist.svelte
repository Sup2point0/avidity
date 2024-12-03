<script lang="ts">

import { nav } from "#scripts/stores";
import { find_playlist } from "#scripts/utils";

import Header from "#parts/panes/header.svelte";
import TrackRow from "#parts/track-row.svelte";


$: playlist = find_playlist($nav.selected_playlist);

</script>


<Header title={playlist?.name ?? "Playlist"} />

<main>
  <div class="tracks">
    {#each playlist?.tracks ?? [] as track}
      {#if track}
        <TrackRow track={track} />
      {/if}
    {/each}
  </div>
</main>


<style lang="scss">

main {
  flex-grow: 1;
  min-height: 0;
  z-index: 1;
  overflow-y: scroll;

  background-color: color-mix(in oklch, var(--col-back), transparent 4%);
  @include frost-blur;
  
  scrollbar-color: var(--col-text-deut) var(--col-back);
  scrollbar-width: thick;
}

.tracks {
  padding-bottom: 8rem;
}

</style>
