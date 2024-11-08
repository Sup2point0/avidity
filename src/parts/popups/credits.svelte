<script lang="ts">

import { nav } from "#scripts/stores";

import { fade } from "svelte/transition";


function desync(offset: number): object
{
  return {
    duration: 200,
    delay: 100 + offset,
  };
}

</script>


<aside class="part">
  <button class="exit ui rounded"
    on:click={() => $nav.popup = null}
  >
    <span class="material-symbols-rounded"> close </span>
  </button>

  <div class="sec">
    <h3 id="avidity" in:fade={desync(0)}>
      avidity
    </h3>
    <p in:fade={desync(100)}>
      by <a target="_blank" href="https://github.com/Sup2point0">Sup#2.0</a>
    </p>
  </div>

  <div class="sec">
    <p in:fade={desync(200)}>
      Built with <a target="_blank" href="https://svelte.dev">Svelte</a>/<a target="_blank" href="https://svelte.dev/docs/kit/introduction">Kit</a>
    </p>
  
    <p in:fade={desync(300)}>
      Colours from <a target="_blank" href="https://github.com/Sup2point0/vividity">vividity</a>
    </p>
  </div>

  <div class="block">
    <a class="link-button" target="_blank"
      href="https://github.com/Sup2point0/avidity"
      in:fade={desync(400)}
    >
      View Source on GitHub
    </a>
  </div>
</aside>


<style lang="scss">

.part {
  width: 90%;
  max-width: 800px;
  height: 80%;
  max-height: 600px;

  @include font-ui;
  background-color: var(--col-back);
  box-shadow: 0 0 20px var(--col-shadow);
}

</style>
