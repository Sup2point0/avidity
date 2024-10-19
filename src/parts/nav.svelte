<!-- @component Nav

The global navigation bar.
-->

<script>

import { shard, nav } from "#scripts/stores";
import { save_napkin } from "#scripts";

</script>


<nav>
  <section>
    <span id="nav-title">
      avidity
    </span>
    <span id="nav-credits">
      by <a target="_blank" href="https://github.com/Sup2point0">Sup#2.0</a>
    </span>
  </section>

  <section>
    {#if $shard.valid}
      <button class="ui" on:click={save_napkin}>
        <span class="material-symbols-rounded">
          sync
        </span>
      </button>

    {:else}
      <button class="ui" on:click={() => {
        $nav.popup = "shard";
      }}>
        <span class="material-symbols-rounded">
          user
        </span>
      </button>

    {/if}

    <button class="ui">
      <!-- github icon -->
    </button>
  </section>
</nav>


<style lang="scss">

nav {
  width: 100%;
  margin: 0;
  padding: 0.5rem 1rem;
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--col-back-prot);
  box-shadow: 0 0 4px rgb(black, 20%);
}

span {
  @include font-flavour;
}

</style>
