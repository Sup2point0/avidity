import type { Track } from "./track";
import type { Playlist } from "./playlist";
import type { Artist } from "./artist";


export interface TracksData
{
  [shard: string]: Track;
}


export interface PlaylistsData
{
  [shard: string]: Playlist;
}


export interface ArtistsData
{
  [shard: string]: Artist;
}
