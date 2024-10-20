<!-- @component TrackRow

A row representing a track in menus.
-->

<script lang="ts">

import playback_executive from "#scripts";
import { Tracks, Playlists, Artists } from "#scripts/data";
import { nav, playback } from "#scripts/stores";
import type { Track } from "#scripts/types";

import { base } from "$app/paths";

export let track: string;
export let ctx: "tracks" | "list" | "queue" = "tracks";


const data: Track = $Tracks[track];

</script>


<button class="track-row"
  on:click={() => $nav.selected_track = track}
>

  <section id="left">
		<div>
			<button class="ui rounded play-track" style:height="2rem"
				on:click={() => playback_executive.play_track(track)}
			>
				<span class="material-symbols-rounded"> play_arrow </span>
			</button>
		</div>
	
		<div>
			<p class="track-duration"> {data.duration ?? "--:--"} </p>
		</div>
	
		<div class="track-info">
			<h4 class="track-name"> {data.name ?? "?"} </h4>
			{#if !$nav.condensed_view}
				<p class="track-artist"> {data.artist? $Artists[data.artist] : "?"} </p>
			{/if}
		</div>

		{#if $nav.condensed_view}
			<p class="track-artist"> {data.artist? $Artists[data.artist] : "?"} </p>
		{/if}
  </section>

  <section id="playlist-tags">
    {#each data.lists ?? [] as playlist}
      <a class="playlist-tag" href="{base}/playlists/{playlist}">
        {$Playlists[playlist]?.name ?? "?"}
      </a>
    {/each}

    <button class="ui rounded" style:height="2rem"
      on:click={() => alert("This feature is under development!")}
    >
       <span class="material-symbols-rounded"> add </span>
    </button>
  </section>

  <section id="right">
    {#if ctx == "tracks" || ctx == "list"}
      <button class="ui rounded" style:height="2rem"
        on:click={() => $playback.queue.push(track)}
      >
        <span class="material-symbols-rounded"> add </span>
      </button>
    {/if}

    {#if ctx == "queue"}
      <button class="ui rounded" style:height="2rem"
        on:click={() => $playback.queue.remove(track)}
      >
        <span class="material-symbols-rounded"> delete </span>
      </button>
    {/if}
  </section>

</button>


<style lang="scss">

button.track-row {
  width: 100%;
  min-height: 2rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;

  @include font-ui;
  background-color: var(--col-card);
  border: none;

  &:hover {
    background-color: var(--col-card-hover);
  }

  &:click {
    background-color: var(--col-card-click);
  }
}

section {
  &#left {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
  }

  &#playlist-tags {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    gap: 0.25rem;
  }

  &#right {
    flex-grow: 0;
  }
}


button.track-row {
  button.play-track {
    opacity: 0;
    transition: opacity 80ms ease-out;
  }

  &:hover button.play-track {
    opacity: 1;
  }
}

.track-info {
	min-width: 4rem;
	flex-grow: 1;
  text-align: left;
}

.track-duration {
  color: var(--col-text-deut);
}
.track-name {
  @include font-flavour;
  font-size: 120%;
  color: white;
}
.track-artist {
  color: var(--col-text-prot);
}

a.playlist-tag {
  min-width: 3em;
  padding: 0.25em 0.5em;
  @include font-ui;
  background-color: var(--col-flavour);
  border-radius: 1em;
}

</style>
