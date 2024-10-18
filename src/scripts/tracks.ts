import { Track } from "#scripts/types";


let tracksData = await import("../data/tracks.json");

export const Tracks = processTracks(tracksData);


function processTracks(tracksData: object): TracksData
{
  let out = {};

  for (let [shard, data] of Object.entries(tracksData)) {
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
