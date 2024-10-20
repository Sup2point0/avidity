/// Exports `Tracks` store to provide data for all tracks.

import { writable, get } from "svelte/store";

import { changes } from "#scripts/stores";
import { Track } from "#scripts/types";


let raw_data = await import("../../data/tracks.json");
let tracks_data = process_raw(raw_data);
let data = hydrate_data(tracks_data);

export const Tracks = writable<TracksData>(data);


export interface TracksData
{
  [shard: string]: Track;
}


function process_raw(raw_data: object): TracksData
{
  let out: TracksData = {};
  console.group();

  for (let [shard, data] of Object.entries(raw_data)) {
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

  for (let [shard, data] of Object.entries(get(changes).tracks)) {
    for (let [key, val] of Object.entries(tracks_data)) {
      try {
        /* @ts-ignore */
        tracks_data[shard][key] = val;
      } catch {
        console.error(`failed to set \`${shard}.${key}\``);
      }
    }
  }

  console.groupEnd();
  return tracks_data;
}
