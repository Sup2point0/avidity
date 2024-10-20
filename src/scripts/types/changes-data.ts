import type { TracksData, PlaylistsData, ArtistsData } from "./interfaces";


export class Changes
{
  #saved: boolean = true;

  /* @ts-ignore */
  tracks: TracksData;
  /* @ts-ignore */
  lists: PlaylistsData;
  /* @ts-ignore */
  artists: ArtistsData;

  constructor()
  {
    this.reset();
  }

  reset(): boolean
  {
    if (!this.#saved) return false;

    this.tracks = {};
    this.lists = {};
    this.lists = {};

    return true;
  }

  export_json(): string
  {
    return JSON.stringify({
      tracks: this.tracks,
      lists: this.lists,
      artists: this.artists,
    });
  }
}
