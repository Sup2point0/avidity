<!-- @component HomePage

The home page for navigating to tracks or playlists.
-->

<script lang="ts">

import { Tracks, Playlists } from "#scripts/data";
import { prefs } from "#scripts/stores";

import TrackRow from "#parts/track-row.svelte";
import PlaylistBlock from "#parts/playlist-block.svelte";


$: tracks = sort_plays($Tracks);
$: playlists = sort_plays($Playlists);


function sort_plays(data) {
  let out = [...Object.values(data)];
  out.sort((prot, deut) => prot.plays - deut.plays);
  return out.slice(0, 3);
}

</script>


<main>
  <section>
    <h2> Recently Played </h2>
  </section>

  <section>
    <h2> Favourites </h2>

    {#each $prefs.favs as track}
      <TrackRow {track} />
    {/each}
  </section>

  <section>
    <h2> Most Played </h2>

    {#each tracks as track}
      <TrackRow {track} />
    {/each}

    {#each playlists as playlist}
      <PlaylistBlock {playlist} />
    {/each}
  </section>
</main>


<style lang="scss">

main {
  height: 100%;
  min-height: 0;
  padding: 1rem;
  z-index: 1;
  overflow-y: scroll;
  background-color: color-mix(in oklch, var(--col-back), transparent 4%);
  @include frost-blur;
  
  scrollbar-color: var(--col-text-deut) var(--col-back);
  scrollbar-width: thick;
}

</style>
