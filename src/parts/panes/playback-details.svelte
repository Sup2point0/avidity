<!-- @component TrackDetails

A pane for viewing and editing details of the selected track?.
-->

<script>

import { playback } from "#scripts/stores";
import { find_track } from "#scripts/utils";

import TrackRow from "#parts/track-row.svelte";

</script>


<div class="part">
  {#each $playback.queue.entries() as [i, track]}
    <TrackRow {track} ctx="queue" idx={i} />
  {/each}
</div>


<style lang="scss">

.part {
  max-width: 40vw;
  flex-grow: 0.5;
  height: 100%;
  padding: 1rem;
  background-color: var(--col-back-prot);
  overflow-y: scroll;
}

</style>
