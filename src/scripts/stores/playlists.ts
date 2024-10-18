import { persisted } from "svelte-persisted-store";

import { Playlist } from "#scripts/types";


export const Playlists = persisted<PlaylistsData>("avid.lists", {});


interface PlaylistsData
{
  [list: string]: Playlist;
}
