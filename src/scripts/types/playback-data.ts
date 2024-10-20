import { get } from "svelte/store";

import { Track } from "./track";
import { Tracks } from "#scripts/data";


export class PlaybackData
{
  current: Track | null = null;
  queue: string[] = [];

  next_track(): Track | null
  {
    if (this.queue.length) {
      let next = this.queue.shift() ?? null;
      this.current = next ? get(Tracks)[next] : null;
      return this.current;
    }
    return null;
  }
}
