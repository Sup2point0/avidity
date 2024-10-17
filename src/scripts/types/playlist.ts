import type { Track } from "./track";


export class Playlist
{
  public shard: string;
  public name: string;
  public tracks: Track[];

  constructor(
    shard: string,
    name: string | undefined,
  )
  {
    this.shard = shard;
    this.name = name ?? shard;
    this.tracks = [];
  }
}
