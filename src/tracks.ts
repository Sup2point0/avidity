let tracksData = await import("./data/tracks.json");

export const Tracks = processTracks(tracksData);


function processTracks(tracksData: object)
{
  let out = {};

  for (let shard, data) in tracksData.entries() {
    try {
      out[shard] = new Track(shard, data);
    } catch {
      // skip for now
    }
  }

  return out;
}
