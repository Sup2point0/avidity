<!-- @component HomePage

The home page for navigating to tracks or playlists.
-->

<script lang="ts">

import { Playlists } from "#scripts/data";

import PlaylistBlock from "#parts/playlist-block.svelte";

</script>


<main>
  {#each Object.keys($Playlists) as shard}
    <PlaylistBlock {shard} />
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
