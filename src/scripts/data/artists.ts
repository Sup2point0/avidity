import { writable } from "svelte/store";

import type { ArtistsData } from "#scripts/types/interfaces";


let data = await import("../../data/artists.json");

export const Artists = writable<ArtistsData>(data.default);
