<!-- @component PlaybackDetails

A pane for viewing and editing details of the selected track?.
-->

<script>

import { playback } from "#scripts/stores";

import TrackRow from "#parts/track-row.svelte";


$: tracks = $playback.queue.entries();

</script>


<div class="playback-queue">
  {#each tracks as [i, track]}
    <TrackRow {track} ctx="queue" idx={i} />
  {/each}
</div>


<style lang="scss">

.playback-queue {
  min-width: 20vw;
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  padding: 1rem;
  background-color: color-mix(in oklch, var(--col-back-deut), transparent 4%);
  @include frost-blur;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  &:empty::after {
    content: "No tracks in queue";
    @include font-ui;
    color: var(--col-text-deut);
    margin-top: 1rem;
  }
}

</style>
