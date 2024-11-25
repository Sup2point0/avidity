<!-- @component PlaylistBlock

A card for selecting a playlist.
-->

<script lang="ts">

import play_exec from "#scripts";
import { nav } from "#scripts/stores";
import { find_playlist } from "#scripts/utils";

import { base } from "$app/paths";

export let shard: string;


const playlist = find_playlist(shard);
const track_count = playlist?.tracks?.length;
const cover = playlist?.cover ?? "void.png";

</script>


{#if playlist}
  <button class="playlist-block"
    on:click={() => { $nav.selected_playlist = shard; }}
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

      <button class="play"
        on:click={() => { play_exec.play_list(shard); }}
      >
        <span class="material-symbols-rounded">
          play_arrow
        </span>
      </button>
    </div>
  </button>
{/if}


<style lang="scss">

button {
  
  border: none;
  outline: none;
}

</style>
