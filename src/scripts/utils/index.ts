export function display_time(t: number | null): string
  {
    if (t === null) return "--:--";

    let mins = Math.floor(t / 60);

    let secs = (t % 60).toString();
    if (secs.length < 2) {
      secs = "0" + secs;
    }

    return `${mins}:${secs}`;
  }