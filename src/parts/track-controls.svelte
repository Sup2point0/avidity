<!-- @component TrackControls

The global track playback control bar.
-->

<script>

import play_exec from "#scripts";
import { Artists } from "#scripts/data";
import { playback } from "#scripts/stores";
import { display_time } from "#scripts/utils";


$: track = play_exec.current;

</script>


<div class="part">
  <div class="track-controls">

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
          {#if $playback.paused}
            play_arrow
          {:else}
            pause
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
      <p> {track?.artist ? $Artists[track.artist] : "?"} </p>
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

@use './src/styles/mixins/ui' as *;


.part {
  width: 100%;
  min-height: 2rem;
  padding: 1rem 0;
  @include elevated-block;
}

.track-controls {
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
