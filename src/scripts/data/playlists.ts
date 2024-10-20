import { writable } from "svelte/store";

import { Playlist } from "#scripts/types";
import type { PlaylistsData } from "#scripts/types/interfaces";


let raw_data = await import("../../data/playlists.json");
let data = process_raw(raw_data)

export const Playlists = writable<PlaylistsData>(data);


function process_raw(raw_data: object): PlaylistsData
{
  let out = {};
  console.group("loading playlists data...");

  for (let [shard, name] of Object.entries(raw_data)) {
    if (shard == "default") continue;

    try {
      /* @ts-ignore */
      out[shard] = new Playlist(shard, name);
    } catch {
      console.error(`failed to load playlist \`${shard}\``);
    }
  }

  console.groupEnd();
  return out;
}
