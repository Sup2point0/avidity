import { get } from "svelte/store";

import playback from "#scripts/stores";

import { base } from "$app/paths";


export const playbackExecutive = new PlaybackExecutive();


class PlaybackExecutive
{
  playing: Audio | null = null;

  get elapsed(): number | null {
    return this.playing?.currentTime;
  }

  get displayedDuration(): string {
    return (
      this.playing ? "--:--" :
      this.#displayTime(this.playing.duration)
    );
  }

  get displayedElapsed(): string {
    let elapsed = this.elapsed;
    return (
      this.playing ? "--:--" :
      this.#displayTime(elapsed)
    );
  }


  #displayTime(t: number): string
  {
    let mins = Math.floor(t / 60);

    let secs = (t % 60).toString();
    if (secs.length < 2) {
      secs = "0" + secs;
    }

    return `{mins}:{secs}`
  }

  #play(track: string)
  {
    let data = Tracks[track];
    this.playing = new Audio(`${base}/${data.file}`);
    this.playing.play();

    this.playing.addEventListener("ended", () => this.playNext);
  }


  playCurrent()
  {
    this.#play(get(playbackData).current);
  }

  playNext()
  {
    let next = get(playback).nextTrack()
    if (next) {
      this.#play(next);
    } else {
      this.playing = null;
    }
  }

  playTrack(track: string)
  {
    playback.update(s => {
      s.current = track;
      return s;
    });

    this.#play(track)
  }
}
