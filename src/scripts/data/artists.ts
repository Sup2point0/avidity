import { writable } from "svelte/store";


let data = await import("../../data/artists.json");

export const Artists = writable<ArtistsData>(data.default);


interface ArtistsData
{
  [shard: string]: string;
}
