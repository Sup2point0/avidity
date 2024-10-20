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

  // == INTERNAL == //

  /**
   * Play the provided `Track`.
   */
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

  // == START == //

  /**
   * Play the current track in `$playback`.
   */
  play_current()
  {
    this.#play(get(playback).current);
  }

  /**
   * Play the next track in `$playback.queue`.
   */
  play_next()
  {
    let next = get(playback).next_track()
    if (next) {
      this.#play(next);
    } else {
      this.playing = null;
    }
  }

  /**
   * Play a track given its `shard`.
   */
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

  // == MOVE == //

  /**
   * Pause or play the current track.
   */
  toggle_pause()
  {
    if (this.playing?.paused) {
      this.playing.pause();
    } else if (this.playing) {
      this.playing.play();
    }
  }

  /**
   * Play the current track from the start.
   */
  restart(): boolean
  {
    if (this.playing) {
      this.playing.currentTime = 0;
      return true;
    }
    return false;
  }

  /**
   * Move forwards or backwards in the currently playing track.
   */
  shift(delta: number)
  {
    if (this.playing) {
      this.playing.currentTime += delta;
    }
  }
}


export const playback_executive = new PlaybackExecutive();
