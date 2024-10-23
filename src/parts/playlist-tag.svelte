<!-- @component PlaylistTag
 
A coloured tag representing a playlist a track belongs to.
-->

<script lang="ts">

import { nav } from "#scripts/stores";
import { find_playlist } from "#scripts/utils";

export let playlist: string;


let data = find_playlist(playlist);

</script>


<button class="playlist-tag"
  style:background-color={data?.colour ?? "var(--col-flavour)"}
  on:click={() => {
    $nav.page = "lists";
    $nav.selected_playlist = playlist;
  }}
>
  {data?.name ?? playlist}
</button>
