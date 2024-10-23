export { find_track, find_playlist, find_artist } from "./find";


export function display_time(t: number | null): string
{
  if (t == null) return "--:--";
  if (typeof(t) == "string") {
    t = parseInt(t);
  }

  let mins = Math.floor(t / 60);

  let secs = (Math.round(t % 60)).toString();
  if (secs.length < 2) {
    secs = "0" + secs;
  }

  return `${mins}:${secs}`;
}
