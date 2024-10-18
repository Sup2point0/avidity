export class PlaybackData
{
  current: string | null = null;
  queue: string[] = [];

  nextTrack(): string | null
  {
    if (this.queue.length) {
      this.current = this.queue.shift() ?? null;
      return this.current;
    }
    return null;
  }
}
