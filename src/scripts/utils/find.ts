import { get } from "svelte/store";

import { Tracks, Playlists, Artists } from "#scripts/data";
import type { Track, Playlist } from "#scripts/types";


export function find_track(shard: string | null | undefined): Track | null
{
  return shard ? (get(Tracks)[shard] ?? null) : null;
}


export function find_playlist(shard: string | null | undefined): Playlist | null
{
  return shard ? (get(Playlists)[shard] ?? null) : null;
}


export function display_artist(shard: string | string[] | null | undefined): string
{
  if (Array.isArray(shard)) {
    return (shard
      .map((shard) => display_artist(shard))
      .join("<span class=\"separator\">/</span>")
    );
  } else {
    return shard ? (get(Artists)[shard]?.name ?? shard) : "unkown artist";
  }
}
