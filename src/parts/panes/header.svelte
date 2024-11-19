<script lang="ts">

export let title: string;

</script>


<header>
  <h1> {title} </h1>
</header>


<style lang="scss">

header {
  padding: 1rem 2rem;
  background-color: color-mix(in oklch, var(--col-back), transparent 4%);
  @include frost-blur;

  h1 {
    @include font-ui;
    font-size: 250%;
    color: var(--col-text);
  }
}

</style>
