<!-- @component TrackRow

A row representing a track in menus.
-->

<script lang="ts">

import { nav, playback, Tracks, Playlists } from "#scripts/stores";
import type { Track } from "#scripts/types";

import { base } from "$app/paths";

export let track: string;
export let ctx: "tracks" | "list" | "queue" = "tracks";


const data: Track = $Tracks[track];

</script>


<button class="track-row"
  on:click={() => $nav.selectedTrack = track}
>

  <section class="left">
		<div>
			<button class="ui"
				on:click={() => $playback.current = track}
			>
				<span class="material-symbols-rounded"> play </span>
			</button>
		</div>
	
		<div>
			<p class="track-duration"> {data.duration ?? "--:--"} </p>
		</div>
	
		<div class="track-info">
			<h4 class="track-name"> {data.name ?? "?"} </h4>
			{#if !$nav.condensedView}
				<p class="track-artist"> {data.artist ?? "?"} </p>
			{/if}
		</div>

		{#if $nav.condensedView}
			<p class="track-artist"> {data.artist ?? "?"} </p>
		{/if}
  </section>

  <section class="playlist-tags">
    {#each data.lists ?? [] as playlist}
      <a class="playlist-tag" href="{base}/playlists/{playlist}">
        {$Playlists[playlist]?.name ?? "?"}
      </a>
    {/each}

    <button class="ui"
      on:click={() => alert("This feature is under development!")}
    >
       <span class="material-symbols-rounded"> add </span>
    </button>
  </section>

  <section class="right">
    {#if ctx == "tracks" || ctx == "list"}
      <button class="ui"
        on:click={() => $playback.queue.push(track)}
      >
        <span class="material-symbols-rounded"> add </span>
      </button>
    {/if}

    {#if ctx == "queue"}
      <button class="ui"
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--col-card);
  border: none;

  &:hover {
    background-color: var(--col-card-hover);
  }

  &:click {
    background-color: var(--col-card-click);
  }
}

section.left {
	flex-grow: 1;
}

section.playlist-tags {
  flex-grow: 1;
}

section.right {
	flex-grow: 0;
}

.track-info {
	min-width: 4rem;
	flex-grow: 1;
}

.track-duration {
  color: var(--col-text-deut);
}
.track-name {
  font-size: 120%;
  color: white;
}
.track-artist {
  color: var(--col-text-prot);
}

</style>
