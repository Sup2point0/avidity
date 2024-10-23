/// Implements the `play_exec` store for managing audio playback.

import { get } from "svelte/store";
import { base } from "$app/paths";

import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";
import { Track } from "#scripts/types";


/**
 * Manages audio playback.
 * 
 * Synchronisation with $playback is managed through `.#sync_` methods.
 */
class PlaybackExecutive
{
  audio: Audio | null = null;

  _current: Track | null = null;
  /**
   * The currently playing `Track` object.
   * 
   * This is synced with `playback.current` internally.
   */
  get current(): Track | null {
    return this._current;
  }
  set current(shard: string | null) {
    if (!shard) {
      this._current = null;
      this.#sync_push("current", null);
      this.#sync_push("paused", false);
    } else {
      this._current = get(Tracks)[shard];
      this.#sync_push("current", shard);
    }
  }

  get elapsed(): number | null {
    return this.audio?.currentTime ?? null;
  }


  // == INTERNAL == //

  constructor()
  {
    this.#sync_pull("current");
    this.audio = this.#load(this.current);

    let elapsed = get(playback).elapsed;
    if (elapsed) {
      this.audio.currentTime = elapsed;
    }
  }

  #sync_pull(prop: string)
  {
    this[prop] = get(playback)[prop];
  }

  #sync_push(prop: string, val: any)
  {
    playback.update(s => {
      s[prop] = val;
      return s;
    })
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

    this.audio?.pause();
    this.audio = this.#load(track);
    this.audio.play();
    this.audio.addEventListener("ended", this.play_next);

    this.#sync_push("paused", false);
  }

  /**
   * Clear current playback.
   */
  #clear()
  {
    this.audio?.pause();
    this.audio = null;
    this.current = null;
  }


  // == START == //

  /**
   * Play the current track in `$playback`.
   */
  play_current()
  {
    this.#sync_pull("current");
    this.#play(this.current);
  }

  /**
   * Play the next track in `$playback.queue`.
   */
  play_next()
  {
    let next: string | null = null;

    playback.update(s => {
      if (s.queue.length) {
        next = s.queue.shift() ?? null;
        s.current = next;
      }
      return s;
    });

    if (next) {
      this.play_current();
    } else {
      this.#clear();
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
      this.#sync_push("paused", false);
    }
    else {
      this.audio.pause();
      this.#sync_push("paused", true);
    }
  }

  /**
   * Play the current track from the start.
   */
  restart(): boolean
  {
    if (this.audio) {
      this.audio.currentTime = 0;
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


export const play = new PlaybackExecutive();
