export class Track
{
  /// INTERNAL
  shard: string;
  file: string;
  cover: string | null;
  duration: number | null;
  plays: number;

  /// EXTERNAL
  name: string;
  artist: string | null;
  album: string | null;
  lists: string[];

  constructor(
    shard: string,
    data: any,
  )
  {
    this.shard = shard;
    this.file = data.file;
    this.cover = data.cover ?? null;
    this.duration = data.duration ?? null;
    this.plays = data.plays ?? 0;
    
    this.name = data.name ?? shard;
    this.artist = data.artist ?? null;
    this.album = data.album ?? null;
    this.lists = data.lists ?? [];
  }
}
