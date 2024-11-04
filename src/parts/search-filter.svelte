<!-- @component SearchFilter

A button that activates a search filter.
-->

<script lang="ts">

import { search } from "#scripts/stores";

export let text: string;
export let filter: string | undefined = undefined;


$: active = $search[filter];

</script>


<button class="part" class:active
  on:click={() => {if (filter) {
    $search[filter] = !active;
  }}
>
  {text}
</button>


<style lang="scss">

.part {
  min-width: 2rem;
  padding: 0.5em 1em;

  @include font-ui;
  background-color: var(--col-card);
  border-radius: 0.5em;

  &.active {
    background-color: var(--col-card-hover);
    border-radius: 0.25em;
  }

  &:hover, &:focus {
    background-color: var(--col-card-click);
  }

  &:active {
    background-color: var(--col-prot);
  }
}

</style>
