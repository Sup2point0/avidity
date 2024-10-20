<script>

import playback_executive from "#scripts";
import { Artists } from "#scripts/data";
import { playback } from "#scripts/stores";
import { display_time } from "#scripts/utils";


$: track = $playback.current;

</script>


<div class="part">
  <div class="track-controls">

    <section id="playback-controls">
      <button class="ui rounded" style:height="2rem"
        on:click={playback_executive.restart}
        disabled={!track}
      >
        <span class="material-symbols-rounded"> arrow_left </span>
      </button>

      <button class="ui rounded" style:height="2rem"
        on:click={playback_executive.toggle_pause}
        disabled={!track}
      >
        <span class="material-symbols-rounded">
          {#if playback_executive.playing == null || playback_executive.playing?.paused}
            play_arrow
          {:else}
            pause
          {/if}
        </span>
      </button>

      <button class="ui rounded" style:height="2rem"
        on:click={playback_executive.play_next}
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
        <p> {display_time(playback_executive.elapsed)} </p>
        <meter
          min={0} max={1}
          value={playback_executive.playing ? (playback_executive.elapsed / track.duration) : 0}
        >
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
  padding: 0.5rem 0;
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
