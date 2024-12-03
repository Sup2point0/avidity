import { get } from "svelte/store";

import { Artists } from "#scripts/data";



export function display_time(t: number | null | undefined): string
{
  if (t == null) return "--:--";
  if (typeof(t) == "string") {
    t = parseInt(t);
  }

  if (t < 0) {
    t = 0;
  }

  let mins = Math.floor(t / 60);

  let secs = (Math.round(t % 60)).toString();
  if (secs.length < 2) {
    secs = "0" + secs;
  }

  return `${mins}:${secs}`;
}


export function display_artist(shard: string | string[] | null | undefined): string
{
  if (Array.isArray(shard)) {
    return (shard
      .map((shard) => display_artist(shard))
      .join("<span class=\"separator\">/</span>")
    );
  } else {
    return shard ? (get(Artists)[shard]?.name ?? shard) : "unkown artist";
  }
}
