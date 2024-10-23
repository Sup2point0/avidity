<!-- @component PlaylistTag
 
A coloured tag representing a playlist a track belongs to.
-->

<script lang="ts">

import { nav } from "#scripts/stores";
import { find_playlist } from "#scripts/utils";

export let playlist: string;


let data = find_playlist(playlist);

</script>


<button class="part"
  style:--col={data?.colour ?? "var(--col-flavour)"}
  on:click={() => {
    $nav.page = "lists";
    $nav.selected_playlist = playlist;
  }}
>
  {data?.name ?? playlist}
</button>


<style lang="scss">

button.part {
  min-width: 3em;
  padding: 0.4em 0.8em;
  @include font-ui;
  background-color: var(--col);
  border: none;
  border-radius: 1em;

  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: var(--col-prot);
  }
}

</style>
