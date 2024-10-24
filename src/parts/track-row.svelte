<!-- @component TrackRow

A row representing a track in menus.
-->

<script lang="ts">

import play_exec from "#scripts";
import { Playlists, Artists } from "#scripts/data";
import { nav, playback } from "#scripts/stores";
import { find_track } from "#scripts/utils";
import type { Track } from "#scripts/types";

import PlaylistTag from "#parts/playlist-tag.svelte";

export let track: string;
export let ctx: "tracks" | "list" | "queue" = "tracks";
export let idx: number | undefined = undefined;


const data: Track | null = find_track(track);

</script>


<div class="part"
  on:click={() => $nav.selected_track = track}
>

  <div class="left">
		<div>
			<button class="ui rounded play-track" style:height="2rem"
				on:click={() => play_exec.play_track(track)}
			>
				<span class="material-symbols-rounded"> play_arrow </span>
			</button>
		</div>
	
		<div>
			<p class="track-duration"> {data?.duration ?? "--:--"} </p>
		</div>
	
		<div class="track-info">
			<h4 class="track-name"> {data?.name ?? "?"} </h4>
			{#if !$nav.condensed_view}
				<p class="track-artist"> {data?.artist? $Artists[data?.artist] : "?"} </p>
			{/if}
		</div>

		{#if $nav.condensed_view}
			<p class="track-artist"> {data?.artist? $Artists[data?.artist] : "?"} </p>
		{/if}
  </div>

  {#if ctx != "queue"}
    <div class="playlist-tags">
      {#each data?.lists ?? [] as playlist}
        <PlaylistTag {playlist} />
      {/each}
    </div>
    
    <button class="ui rounded" style:height="2rem"
      on:click={() => alert("This feature is under development!")}
    >
      <span class="material-symbols-rounded"> add </span>
    </button>
  {/if}

  <div class="right">
    {#if ctx == "tracks" || ctx == "list"}
      <button class="ui rounded" style:height="2rem"
        on:click={() => $playback.queue.push(track)}
      >
        <span class="material-symbols-rounded"> playlist_add </span>
      </button>
    {/if}

    {#if ctx == "queue"}
      <button class="ui rounded" style:height="2rem"
        on:click={() => $playback.queue.splice(idx, 1)}
      >
        <span class="material-symbols-rounded"> delete </span>
      </button>
    {/if}
  </div>

</div>


<style lang="scss">

.part {
  cursor: pointer;
  
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

div {
  &.left {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
  }

  &.playlist-tags {
    flex: 1 1 auto;
    max-width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: start;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  &.right {
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

</style>
