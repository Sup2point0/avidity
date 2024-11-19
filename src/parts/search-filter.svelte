<!-- @component SearchFilter

A button that activates a search filter.
-->

<script lang="ts">

import { search } from "#scripts/stores";

export let text: string;
export let filter: string | undefined = undefined;


$: active = $search[filter];

</script>


<button class="search-filter" class:active
  on:click={() => {if (filter) {
    $search[filter] = !active;
  }}}
>
  {text}
</button>


<style lang="scss">

.search-filter {
  min-width: 2rem;
  padding: 0.5em 1em;
  display: inline-block;

  @include font-ui;
  background-color: var(--col-card);
  border: none;
  border-radius: 1em;
  transition: background-color 0.12s ease-out;

  &.active {
    background-color: var(--col-card-hover);
    border-radius: 0.75em;
  }

  &:hover, &:focus {
    background-color: var(--col-card-click);
  }

  &:active {
    background-color: var(--col-prot);
  }
}

</style>
