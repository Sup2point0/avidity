/// Exports `Tracks` object to provide data for all tracks.

import { get } from "svelte/store";

import { changes } from "#scripts/stores";
import { Track } from "#scripts/types";


let raw_data = await import("../../data/tracks.json");
let tracks_data = process_raw(raw_data);

export const Tracks: TracksData = hydrate_data(tracks_data);


interface TracksData
{
  [shard: string]: Track;
}


function process_raw(raw_data: object): TracksData
{
  let out = {};
  console.group();

  for (let [shard, data] of Object.entries(tracks_data)) {
    if (shard == "default") continue;

    try {
      out[shard] = new Track(shard, data);
    } catch {
      console.error(`failed to load track \`${shard}\``);
    }
  }

  console.groupEnd();
  return out;
}


function hydrate_data(tracks_data: TracksData): TracksData
{
  console.group();

  for (let [shard, data] of get(changes).tracks {
    for (let [key, val] of data) {
      try {
        tracks_data[shard][key] = val;
      } catch {
        console.error(`failed to set \`${shard}.${key}\``);
      }
    }
  }

  console.groupEnd();
  return tracks_data;
}
