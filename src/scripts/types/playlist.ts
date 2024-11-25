/**
 * Represents a playlist of tracks.
 */
export class Playlist
{
  public shard: string;
  public kind: "album" | "tag";
  public name: string;
  public colour: string;
  public cover: string | null;
  public tracks: string[];
  public featured: string | null;
  public plays: number;

  constructor(
    shard: string,
    data: any | undefined,
  )
  {
    this.shard = shard;

    this.kind = data?.kind ?? "tag"
    this.name = data?.name ?? shard;
    this.colour = data?.col ?? "var(--col-deut)";
    
    this.tracks = data?.tracks ?? [];
    this.featured = data?.featured ?? this.tracks.at(0) ?? null;
    this.cover = data?.cover ?? this.tracks.at(0);
    this.plays = data?.plays ?? 0;
  }
}
