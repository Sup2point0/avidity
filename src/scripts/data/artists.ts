import { writable } from "svelte/store";


let data = await import("../../data/artists.json");

export const Artists = writable<ArtistsData>(data.default);


export interface ArtistsData
{
  [shard: string]: string;
}
