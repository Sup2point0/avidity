/**
 * Exports interfaces for changing tracks, playlists and artists data.
 */

import { Playlists } from "../data/playlists";  // non-module import to avoid circular imports
import { Playlist } from "#scripts/types";



/**
 * Add a track to a playlist.
 */
export function add_to_playlist(list: string, track: string)
{
  Playlists.update(s => {
    let existing = s[list];
    
    if (existing) {
      existing.tracks.push(track);
    } else {
      s[list] = new Playlist(list);
      s[list].tracks.push(track);
    }

    return s;
  })
}
