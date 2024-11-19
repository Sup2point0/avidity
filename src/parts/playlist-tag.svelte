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
  style:--col={data?.colour ?? "var(--col-flavour)"}
  on:click={() => {
    $nav.page = "lists";
    $nav.selected_playlist = playlist;
  }}
>
  {data?.name ?? playlist}
</button>


<style lang="scss">

.playlist-tag {
  min-width: 3em;
  padding: 0.5em 0.75em;
  @include font-ui;
  font-weight: 300;
  color: var(--col);
  // text-shadow: 0 0.05em 2px rgb(black, 80%);
  background-color: color-mix(in oklch, var(--col), black 5%);
  background-color: var(--col-card);
  border: none;
  border-radius: 1em;

  transition: background-color 0.12s ease-out;

  &:hover {
    background-color: var(--col-card-hover);
  }
}

</style>
