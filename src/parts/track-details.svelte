<!-- @component TrackDetails

A pane for viewing and editing details of the selected track?.
-->

<script>

import { nav } from "#scripts/stores";
import { find_track, find_artist } from "#scripts/utils";

import PlaylistTag from "#parts/playlist-tag.svelte";

import { base } from "$app/paths";


$: track = find_track($nav.selected_track);

</script>


<div class="part">
  <img
    alt={track?.name ?? "?"}
    src="{base}/covers/{track?.cover}"
  >

  <h2 id="name"> {track?.name} </h2>
  <p id="artist"> {find_artist(track?.artist) ?? "?"} </p>

  <p id="plays"> {track?.plays} </p>

  {#each track?.lists ?? [] as playlist}
    <PlaylistTag {playlist} />
  {/each}
</div>


<style lang="scss">

@use './src/styles/mixins/ui' as *;


.part {
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  padding: 1rem;
  @include elevated-block;
}


img {
  max-width: 100%;
  aspect-ratio: 1;
}

p {
  color: var(--col-text);
}

h2#name {
  @include font-flavour;
  font-size: 125%;
}

p#artist {
  @include font-ui;
  font-size: 110%;
}

</style>
