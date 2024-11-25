<!-- @component HomePage

The home page for navigating to tracks or playlists.
-->

<script lang="ts">

import PlaylistBlock from "#parts/playlist-block.svelte";

</script>


<main>
  
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
