<!-- @component HomePage

The home page for navigating to tracks or playlists.
-->

<script lang="ts">

import { Playlists } from "#scripts/data";

import Header from "#src/parts/panes/header.svelte";
import PlaylistBlock from "#parts/playlist-block.svelte";

</script>


<Header title="Playlists" />

<main>
  {#each Object.keys($Playlists) as playlist}
    <PlaylistBlock {playlist} />
  {/each}
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
