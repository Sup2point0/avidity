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

  <div class="info">
    <h2 id="name"> {track?.name} </h2>
    <p id="artist"> {find_artist(track?.artist) ?? "?"} </p>
  </div>
  
  <div class="stats">
    <p id="plays"> {track?.plays} </p>
  </div>

  <div class="playlist-tags">
    {#each track?.lists ?? [] as playlist}
      <PlaylistTag {playlist} />
    {/each}
  </div>
</div>


<style lang="scss">

.part {
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  padding: 1rem;
  background-color: var(--col-back-deut);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  
  div {
    margin: 1rem 0;
  }
}

p {
  color: var(--col-text);
}


img {
  width: 100%;
  max-width: 20vw;
  aspect-ratio: 1;
}

h2#name {
  @include font-flavour;
  font-size: 125%;
}

p#artist {
  @include font-ui;
  font-size: 110%;
}

.playlist-tags {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
}

</style>
