<!-- @component SearchControls

A search bar with dropdown filters.
-->

<script lang="ts">

import { search } from "#scripts/stores";

import SearchFilter from "#parts/search-filter.svelte";

import { fade } from "svelte/transition";


let expanded = false;

</script>


<search class="search-controls">
  <!-- search bar -->
  <div class="row">
		<input type="search"
      placeholder="Search"
			bind:value={$search.value}
		/>

    <button class="ui"
      on:click={() => expanded = !expanded}
    >
      <span class="material-symbols-rounded">
        {#if expanded}
          keyboard_arrow_up
        {:else}
          keyboard_arrow_down
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
          <SearchFilter text="name" filter="name" />
          <SearchFilter text="artist" filter="artist" />
          <SearchFilter text="album" filter="album" />
          <SearchFilter text="playlist" filter="list" />
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

.search-controls {
  width: 100%;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: color-mix(in oklch, var(--col-back), transparent 20%);
  @include frost-blur;
}

.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}


input {
  width: min(80%, 30em);
  margin-right: 1rem;
  padding: 0.5em 1.5em;
  @include font-ui;
  font-size: 150%;
  background-color: color-mix(in oklch, var(--col-back-deut), transparent 40%);
  border: none;
  border-radius: 0.5em;
  outline: none;
}


table, tr, th, td {
  border: none;
}

tr {
  padding: 1rem 0;
}

td {
  padding: 0 1em;
}

th {
  @include font-ui;
  color: var(--col-text-deut);
  text-align: left;
}

</style>
