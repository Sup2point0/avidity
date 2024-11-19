<!-- @component PlaybackDetails

A pane for viewing and editing details of the selected track?.
-->

<script>

import { playback } from "#scripts/stores";

import TrackRow from "#parts/track-row.svelte";


$: tracks = $playback.queue.entries();

</script>


<div class="playback-queue">
  {#if tracks}
    {#each tracks as [i, track]}
      <TrackRow {track} ctx="queue" idx={i} />
    {/each}

  {:else}
    <p> No tracks in queue </p>

  {/if}
</div>


<style lang="scss">

.playback-queue {
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  padding: 1rem;
  background-color: var(--col-back-deut);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
}

</style>
