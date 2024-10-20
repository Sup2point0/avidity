/// Implements the `playback_executive` singleton for managing audio playback.

import { get } from "svelte/store";
import { base } from "$app/paths";

import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";
import { Track } from "#scripts/types";


class PlaybackExecutive
{
  playing: Audio | null = null;

  get elapsed(): number | null {
    return this.playing?.currentTime;
  }


  #play(track: Track | null)
  {
    if (track == null) return;
    if (this.playing && !this.playing.paused) {
      this.playing.pause();
    }

    this.playing = new Audio(`${base}/tracks/${track.file}`);
    this.playing.play();
    this.playing.addEventListener("ended", this.play_next);
  }


  toggle_pause()
  {
    if (this.playing?.paused) {
      this.playing.pause();
    } else if (this.playing) {
      this.playing.play();
    }
  }

  restart(): boolean
  {
    if (this.playing) {
      this.playing.currentTime = 0;
      return true;
    }
    return false;
  }

  play_current()
  {
    this.#play(get(playback).current);
  }

  play_next()
  {
    let next = get(playback).next_track()
    if (next) {
      this.#play(next);
    } else {
      this.playing = null;
    }
  }

  play_track(shard: string): boolean
  {
    let track: Track = get(Tracks)[shard];
    if (track == null) {
      return false;
    }

    playback.update(s => {
      s.current = track;
      return s;
    });

    this.#play(track);
    return true;
  }
}


export const playback_executive = new PlaybackExecutive();
