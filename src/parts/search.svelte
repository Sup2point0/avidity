<!-- @component Search

A search bar with dropdown filters.
-->

<script lang="ts">

import { search } from "#scripts/data";

import { SearchFilter } from "#parts/search-filter.svelte";

import { fade } from "svelte/transition";


let expanded = false;

</script>


<search class="part">
  <!-- search bar -->
  <div class="row">
		<input type="search"
			bind:value={$search.value}
		/>

    <button class="ui"
      on:click={() => expanded = !expanded}
    >
      <span class="material-symbols-rounded">
        {#if expanded}
          up_arrow
        {:else}
          down_arrow
        {/if}
      </span>
    </button>
  </div>

  <!-- search filters -->
  {#if expanded}
    <table transition:fade={{ duration: 200 }}>
      <tr>
        <th> in </th>
        <td>
          <SearchFilter text="track" filter="in-track" />
          <SearchFilter text="artist" filter="in-artist" />
          <SearchFilter text="album" filter="in-album" />
          <SearchFilter text="playlist" filter="in-list" />
        </td>
      </tr>

      <tr>
        <th> sort by </th>
        <td>
          <select bind:value={$search.sort}>
            <option></option>
            <option>name</option>
            <option>plays</option>
          </select>
        </td>
      </tr>

      <tr>
        <th> group by </th>
        <td>
          <select bind:value={$search.group}>
            <option></option>
            <option>artist</option>
            <option>album</option>
          </select>
        </td>
      </tr>
    </table>
  {/if}
</search>


<style lang="scss">

.part {
  width: 100%;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}


table, tr, th, td {
  width: 100%;
  border: none;
}

</style>
