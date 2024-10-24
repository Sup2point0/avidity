<!-- @component Nav

The global navigation bar.
-->

<script>

import { shard, nav } from "#scripts/stores";
import { save_napkin } from "#scripts";

</script>


<!-- svelte-ignore component_name_lowercase -->
<nav class="part">
  <div>
    <span id="nav-title">
      avidity
    </span>
    <span id="nav-credits">
      by <a target="_blank" href="https://github.com/Sup2point0">Sup#2.0</a>
    </span>
  </div>

  <div>
    {#if $shard.valid}
      <button class="ui" on:click={save_napkin}>
        <span class="material-symbols-rounded"> backup </span>
      </button>

    {:else}
      <button class="ui" on:click={() => {
        $nav.popup = "shard";
      }}>
        <span class="material-symbols-rounded"> key </span>
      </button>

    {/if}

    <button class="ui">
      <!-- github icon -->
    </button>
  </div>
</nav>


<style lang="scss">

.part {
  width: 100%;
  min-height: 4rem;
  margin: 0;
  padding: 0.5rem 1rem;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @include elevated-block;
}

span {
  @include font-flavour;
}

</style>
