<!-- @component TrackControls

The global track playback control bar.
-->

<script>

import play_exec from "#scripts";
import { Artists } from "#scripts/data";
import { playback } from "#scripts/stores";
import { find_track, display_artist, display_time } from "#scripts/utils";


$: track = find_track($playback.current);

</script>


<div class="track-controls outer">
  <div class="track-controls inner">

    <section id="playback-controls">
      <button class="ui rounded" style:height="2rem"
        on:click={() => play_exec.restart()}
        disabled={!track}
      >
        <span class="material-symbols-rounded"> arrow_left </span>
      </button>

      <button class="ui rounded" style:height="2rem"
        on:click={() => play_exec.toggle_pause()}
        disabled={!track}
      >
        <span class="material-symbols-rounded">
          {#if $playback.paused === false}
            pause
          {:else}
            play_arrow
          {/if}
        </span>
      </button>

      <button class="ui rounded" style:height="2rem"
        on:click={() => play_exec.play_next()}
        disabled={!track}
      >
        <span class="material-symbols-rounded"> arrow_right </span>
      </button>
    </section>

    <section id="track-details">
      <h4> {track?.name ?? "?"} </h4>
      <p> {@html display_artist(track?.artist)} </p>
    </section>

    <section id="playback-details">
      <div id="playback-progress">
        <p> {display_time($playback.elapsed)} </p>
        <!-- <meter
          min={0} max={1}
          value={play_exec.playing ? (play_exec.elapsed / track.duration) : 0}
        > -->
        <p> {display_time(track?.duration)} </p>
      </div>
    </section>

  </div>
</div>


<style lang="scss">

.track-controls.outer {
  width: 100%;
  min-height: 2rem;
  padding: 1rem 0;
  position: relative;
  z-index: 3;
  background-color: color-mix(in oklch, var(--col-back-prot), transparent 16%);
  @include ui-block;
}

.track-controls.inner {
  margin: auto;
  width: 90%;
  height: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

section#playback-controls {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

section#track-details {
  flex-grow: 1;

  > * {
    display: block;
  }

  h4 {
    @include font-flavour;
    color: var(--col-text);
  }
  p {
    @include font-ui;
    color: var(--col-text-deut);
  }
}

section#playback-details {
  flex-grow: 0.5;

  #playback-progress {
    p {
      @include font-ui;
    }
  }
}


button {
  height: 1.5rem;
  aspect-ratio: 1;
}

</style>
