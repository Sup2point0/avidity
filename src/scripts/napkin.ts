import { get } from "svelte/store";

import { shard, Tracks } from "#scripts/stores";


const SOURCE = "https://npkn.io";


export async function save_napkin(): Promise<Response>
{
  if (!get(shard)) {
    throw new Error();
  }

  let data = {
    "shard": get(shard),
    "tracks": get(Tracks).map(
      track => track.export_data()
    ),
    "lists": get(Playlists).map(
      playlist => playlist.export_data()
    ),
  };

  try {
    let response = await fetch(SOURCE, {
      method: "PUT",
      body: data,
    });
    return response;
  }
  catch (error) {
    throw error; // TODO special handling?
  }
}
