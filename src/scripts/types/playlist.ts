import type { Track } from "./track";


export class Playlist
{
  public shard: string;
  public name: string;
  public colour: string;
  public tracks: Track[];

  constructor(
    shard: string,
    data: any | undefined,
  )
  {
    this.shard = shard;
    this.name = data?.name ?? shard;
    this.colour = data?.colour ?? "var(--col-deut)"
    this.tracks = [];
  }
}
