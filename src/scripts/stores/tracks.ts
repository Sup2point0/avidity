import { persisted } from "svelte-persisted-store";

import { Track } from "#scripts/types";


let raw_data = await import("../../data/tracks.json");
let tracks_data = process_tracks(raw_data);

export const Tracks = persisted<TracksData>("avid.tracks", tracks_data);


function process_tracks(tracks_data: object): TracksData
{
  let out = {};

  for (let [shard, data] of Object.entries(tracks_data)) {
    if (shard == "default") continue;

    try {
      out[shard] = new Track(shard, data);
    } catch {
      // skip for now
    }
  }

  return out;
}


interface TracksData
{
  [key: string]: Track;
}
