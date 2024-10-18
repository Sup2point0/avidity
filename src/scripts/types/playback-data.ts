export class PlaybackData
{
  current: string | null = null;
  queue: string[] = [];

  function nextTrack(): string | null
  {
    if (this.queue.length) {
      this.current = this.queue.shift();
      return this.current;
    }
    return null;
  }
}
