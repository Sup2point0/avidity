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
    data: any | undefined,
  )
  {
    this.shard = shard;
    this.name = data?.name ?? shard;
    this.artist = data?.artist;
    this.album = data?.album;
    this.lists = data?.lists ?? [];
    this.file = data?.file;
    this.duration = data?.duration;
    this.plays = data?.plays ?? 0;
  }
}
