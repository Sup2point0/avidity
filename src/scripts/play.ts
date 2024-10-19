/// Implements `playback_exec` singleton for managing audio playback.

import { get } from "svelte/store";

import { playback, Tracks } from "#scripts/stores";

import { base } from "$app/paths";


class playback_executive
{
  playing: Audio | null = null;

  get elapsed(): number | null {
    return this.playing?.currentTime;
  }

  get displayed_duration(): string {
    return this.#display_time(this.playing?.duration);
  }

  get displayed_elapsed(): string {
    return this.#display_time(this.elapsed);
  }


  #display_time(t: number | null): string
  {
    if (t === null) return "--:--";

    let mins = Math.floor(t / 60);

    let secs = (t % 60).toString();
    if (secs.length < 2) {
      secs = "0" + secs;
    }

    return `${mins}:${secs}`;
  }

  #play(track: string | null)
  {
    if (track == null) return;

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
      s.current = track;
      return s;
    });

    this.#play(track)
  }
}


export const playback_exec = new playback_executive();
