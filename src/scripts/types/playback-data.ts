import { Track } from "./track";


export class PlaybackData
{
  current: Track | null = null;
  queue: string[] = [];
}
