export class Track
{
  shard: string;
  name: string;
  artist: string | null;
  album: string | null;
  lists: string[];
  file: string;
  duration: number | null;
  plays: number;

  constructor(
    shard: string,
    data: any,
  )
  {
    this.shard = shard;
    this.name = data.name ?? shard;
    this.artist = data.artist ?? null;
    this.album = data.album ?? null;
    this.lists = data.lists ?? [];
    this.file = data.file;
    this.duration = data.duration ?? null;
    this.plays = data.plays ?? 0;
  }
}
