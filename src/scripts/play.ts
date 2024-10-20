/// Implements the `playback_executive` singleton for managing audio playback.

import { get } from "svelte/store";
import { base } from "$app/paths";

import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";


class PlaybackExecutive
{
  playing: Audio | null = null;

  get elapsed(): number | null {
    return this.playing?.currentTime;
  }


  #play(track: string | null)
  {
    if (track == null) return;
    if (this.playing && !this.playing.paused) {
      this.playing.pause();
    }

    let data = get(Tracks)[track];
    this.playing = new Audio(`${base}/tracks/${data.file}`);
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

  play_track(track: string)
  {
    playback.update(s => {
      s.current = get(Tracks)[track];
      return s;
    });

    this.#play(track);
  }
}


export const playback_executive = new PlaybackExecutive();
