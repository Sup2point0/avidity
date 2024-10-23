/**
 * Stores the currently selected track and queue of upcoming tracks.
 * 
 * To queue new tracks, `.push` their `shard`s to `.queue`. To set a new track as the current track, access through `PlaybackExecutive`.
 */
export class PlaybackData
{
  current: string | null = null;
  queue: string[] = [];
}
