/// Implements the `play` global for managing audio playback.

import { get } from "svelte/store";
import { base } from "$app/paths";

import { Tracks } from "#scripts/data";
import { playback } from "#scripts/stores";
import { Track } from "#scripts/types";
import { find_artist, find_playlist } from "#scripts/utils";


/**
 * Manages audio playback.
 */
class PlaybackExecutive
{
  audio: Audio | null = null;

  _current: Track | null = null;
  /**
   * The currently playing `Track` object. This is synced with `$playback.current` internally.
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

  /**
   * Get a property from `$playback`.
   */
  #sync_pull(prop: string)
  {
    this[prop] = get(playback)[prop];
  }

  /**
   * Set a property of `$playback`.
   */
  #sync_push(prop: string, val: any)
  {
    playback.update(s => {
      s[prop] = val;
      return s;
    })
  }

  /**
   * Load a `Track` into an `Audio` object.
   */
  #load(track: Track | null): Audio | null
  {
    if (!track) return null;

    try {
      return new Audio(`${base}/tracks/${track.file}`);
    } catch {
      console.warn(`Failed to load audio file for track \`${track.name}\`!`);
      return null;
    }
  }

  /**
   * Play the provided `Track`. All playback controls should interface through this method.
   */
  #play(track: Track | null)
  {
    if (track == null) return;

    this.audio?.pause();
    this.audio = this.#load(track);
    if (this.audio == null) return;

    this.audio.play();
    // this.audio.addEventListener("ended", this.play_next);

    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: find_artist(track.artist) ?? "unknown artist",
      album: find_playlist(track.album)?.name,
      artwork: track.cover ? [
        { src: `${base}/covers/${track.cover}` }
      ] : undefined,
    });
    navigator.mediaSession.playbackState = "playing";

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
    this.#sync_push("paused", false);
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
      navigator.mediaSession.playbackState = "playing";
    }
    else {
      this.audio.pause();
      this.#sync_push("paused", true);
      navigator.mediaSession.playbackState = "paused";
    }
  }

  /**
   * Play the current track from the start.
   */
  restart()
  {
    if (!this.audio) return;
    this.audio.currentTime = 0;
  }

  /**
   * Seek to a specific time in the currently playing track.
   */
  seek(time: number | undefined)
  {
    if (!this.audio) return;

    this.audio.currentTime = time ?? 0;
    if (this.audio.currentTime >= this.audio.duration) {
      this.play_next();
    }
  }

  /**
   * Move forwards or backwards in the currently playing track.
   */
  shift(delta: number | undefined)
  {
    if (!this.audio) return;

    this.seek(this.audio.currentTime + delta);
  }
}


function trySetHandler(event: string, handler)
{
  try {
    navigator.mediaSession.setActionHandler(event, handler);
  } catch {
    console.warn(`Failed to set action handler for \`mediaSession\` event \`${event}\`!`);
  }
}


/**
 * The global `PlaybackExecutive` instance for managing audio playback.
 */
export const play = new PlaybackExecutive();

if ("mediaSession" in navigator) {
  trySetHandler("play",
    () => play.play_current()
  );
  trySetHandler("pause",
    () => play.toggle_pause()
  );
  trySetHandler("previoustrack",
    () => play.restart()
  );
  trySetHandler("nexttrack",
    () => play.play_next()
  );
  trySetHandler("seekbackward",
    (details) => play.shift(details.seekOffset ?? -5)
  );
  trySetHandler("seekforward",
    (details) => play.shift(details.seekOffset ?? 5)
  );
  trySetHandler("seekforward",
    (details) => play.seek(details.seekTime)
  );
}
