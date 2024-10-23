/// Implements the `$play` store for managing audio playback.

import { writable, get } from "svelte/store";
import { base } from "$app/paths";

import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";
import { Track } from "#scripts/types";


/**
 * Manages audio playback.
 */
class PlaybackExecutive
{
  _current: Track | null = null;
  paused: boolean = true;
  audio: Audio | null = null;

  /**
   * The currently playing `Track` object. This is synced with `$playback.current` internally.
   */
  get current(): Track | null {
    return this._current;
  }
  set current(shard: string | null) {
    if (!shard) {
      this._current = null;
      this.paused = true;
    } else {
      this._current = get(Tracks)[shard];
    }
  }

  get elapsed(): number | null {
    return this.audio?.currentTime;
  }

  // == INTERNAL == //

  constructor()
  {
    this.#sync();
    this.audio = this.#load(this.current);
  }

  #sync()
  {
    this.current = get(playback).current;
  }

  #load(track: Track | null): Audio | null
  {
    if (!track) return null;

    try {
      return new Audio(`${base}/tracks/${track.file}`);
    } catch {
      return null;
    }
  }

  /**
   * Play the provided `Track`.
   */
  #play(track: Track | null)
  {
    if (track == null) return;
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }

    this.audio = this.#load(track);
    this.paused = false;
    this.audio.play();
    this.audio.addEventListener("ended", this.play_next);
  }

  // == START == //

  /**
   * Play the current track in `$playback`.
   */
  play_current()
  {
    this.#sync();
    this.#play(this.current);
  }

  /**
   * Play the next track in `$playback.queue`.
   */
  play_next()
  {
    playback.update(s => {
      let next: string | null;
      if (s.queue.length) {
        next = s.queue.shift() ?? null;
        s.current = next;
      } else {
        return s;
      }

      return s;
    });

    if (get(playback)) {
      this.play_current();
    } else {
      this.audio = null;
    }
  }

  /**
   * Play a track given its `shard`.
   */
  play_track(shard: string): boolean
  {
    playback.update(s => {
      s.current = shard;
      return s;
    });

    this.play_current();
    return true;
  }

  // == MOVE == //

  /**
   * Pause or play the current track.
   */
  toggle_pause()
  {
    if (this.audio?.paused) {
      this.audio.play();
      this.paused = false;
    }
    else {
      this.audio.pause();
      this.paused = true;
    }
  }

  /**
   * Play the current track from the start.
   */
  restart(): boolean
  {
    if (this.audio) {
      this.audio.currentTime = 0;
      this.paused = false;
      return true;
    }
    return false;
  }

  /**
   * Move forwards or backwards in the currently playing track.
   */
  shift(delta: number)
  {
    if (this.audio) {
      this.audio.currentTime += delta;
    }
  }
}


export const play = writable<PlaybackExecutive>(new PlaybackExecutive());
