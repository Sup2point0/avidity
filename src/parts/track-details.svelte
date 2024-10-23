<!-- @component TrackDetails

A pane for viewing and editing details of the selected track?.
-->

<script>

import { Playlists, Artists } from "#scripts/data";
import { nav } from "#scripts/stores";
import { find_track, find_playlist, find_artist } from "#scripts/utils";

import { base } from "$app/paths";


$: track = find_track($nav.selected_track);

</script>


<div class="part">
  <img alt={track?.name ?? "?"}
    src="{base}/covers/{track?.cover}"
  >

  <h2 id="name"> {track?.name} </h2>
  <p id="artist"> {find_artist(track?.artist) ?? "?"} </p>

  <p id="plays"> {track?.plays} </p>

  {#each track?.lists ?? [] as playlist}
    <span class="playlist-tag">
      {find_playlist(playlist)?.name ?? "?"}
    </span>
  {/each}
</div>


<style lang="scss">

@use './src/styles/mixins/ui' as *;


.part {
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  @include elevated-block;
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
