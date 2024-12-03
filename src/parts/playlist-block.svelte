<!-- @component PlaylistBlock

A card for selecting a playlist.
-->

<script lang="ts">

import play_exec from "#scripts";
import { nav } from "#scripts/stores";
import { Playlist } from "#scripts/types";
import { find_track, find_playlist } from "#scripts/utils";

import { base } from "$app/paths";

export let playlist: Playlist | string | null;


const data = (typeof(playlist) == "string" ? find_playlist(playlist) : playlist);
const track_count = data?.tracks?.length;
const cover = data?.cover ?? find_track(data?.featured)?.cover ?? "void.png";


function select_playlist() {
  $nav.page = "list";
  $nav.selected_playlist = data?.shard;
  $nav.selected_track = data?.featured;
}

</script>


{#if playlist}

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="playlist-block"
  on:click={select_playlist}
  on:keydown={event => {
    if (event.key === "Enter") {
      select_playlist();
    } else if (event.key === "Space") {
      play_exec.play_list(shard);
    }
  }}
>
  <img class="playlist-cover"
    alt={playlist.name}
    src="{base}/covers/{cover}"
  />

  <div class="layout">
    <div class="playlist-info">
      <h3> {playlist.name} </h3>
      <p> {track_count} </p>
    </div>

    <button class="ui play"
      on:click={() => { play_exec.play_list(shard); }}
    >
      <span class="material-symbols-rounded">
        play_arrow
      </span>
    </button>
  </div>
</div>

{/if}


<style lang="scss">

.playlist-block {
  padding: 1rem;
  display: inline-block;
  flex-grow: 0;

  @include font-ui;
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    background-color: color-mix(in oklch, var(--col-back-deut), transparent 50%);
  }

  &:active {
    background-color: var(--col-back-deut);
  }
}

.layout {
  margin-top: 1rem;
  display: flex;
}


img.playlist-cover {
  min-width: 6rem;
  max-width: 15vw;
  aspect-ratio: 1;
}

.playlist-info {
  flex-grow: 1;
  text-align: left;

  h3 {
    @include font-flavour;
    color: var(--col-text);
    font-size: 150%;
  }

  p {
    color: var(--col-text-deut);
  }
}

button {
}

</style>
