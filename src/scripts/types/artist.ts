export class Artist
{
  public shard: string;
  public name: string;
  public cover: string | null;
  public plays: number;

  constructor(
    shard: string,
    data: any | undefined,
  )
  {
    this.shard = shard;
    this.name = data?.name ?? shard;
    this.cover = data?.cover ?? null;
    this.plays = data?.plays ?? 0;
  }
}
