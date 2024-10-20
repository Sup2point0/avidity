import { writable } from "svelte/store";

import { Playlist } from "#scripts/types";


let raw_data = await import("../../data/artists.json");
let data = process_raw(raw_data)

export const Playlists = writable<PlaylistsData>(data);


export interface PlaylistsData
{
  [shard: string]: Playlist;
}


function process_raw(raw_data: object): PlaylistsData
{
  let out = {};
  console.group();

  for (let [shard, name] of Object.entries(raw_data)) {
    if (shard == "default") continue;

    try {
      out[shard] = new Playlist(shard, name);
    } catch {
      console.error(`failed to load playlist \`${shard}\``);
    }
  }

  console.groupEnd();
  return out;
}
