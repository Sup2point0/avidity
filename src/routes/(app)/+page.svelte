<script lang="ts">

import { nav } from "#scripts/stores";

import HomePage from "./(pages)/home.svelte";
import TracksPage from "./(pages)/tracks.svelte";

</script>


{#if $nav.page === "tracks"}
  <TracksPage />
{:else}
  <HomePage />
{/if}


<!-- <section>
  <h2> debug </h2>
  <pre>play_exec: {JSON.stringify(play, null, 2)} </pre>
  <pre>$playback: {JSON.stringify($playback, null, 2)} </pre>
  <pre>nav: {JSON.stringify($nav, null, 2)}</pre>
</section> -->


<style lang="scss">

// TODO WIP
  section {
    padding: 1rem;
    position: absolute;
    bottom: 0;
    left: 1rem;
    color: white;
    background-color: rgb(0 0 0 / 90%);

    &:hover {
      display: none;
    }

    > * {
      margin: 1rem;
      display: block;
    }
  }
//

</style>
