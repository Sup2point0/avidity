import type { Track } from "./track";
import type { Playlist } from "./playlist";


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
  [shard: string]: string;
}
