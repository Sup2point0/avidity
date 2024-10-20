export class Track
{
  shard: string;
  name: string;
  artist: string | null = null;
  album: string | null = null;
  lists: string[] = [];
  file: string;
  duration: number;
  plays: number = 0;

  constructor(
    shard: string,
    data: any | undefined,
  )
  {
    this.shard = shard;
    this.name = data?.name ?? shard;
    this.artist = data?.artist ?? null;
    this.album = data?.album ?? null;
    this.lists = data?.lists ?? [];
    this.file = data?.file;
    this.duration = data?.duration ?? 0;
    this.plays = data?.plays ?? 0;
  }
}
