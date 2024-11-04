import { ratio as fuzzyRatio } from "fuzzball";

import type { Track, SearchData } from "#scripts/types";


/*
 * Filters a list of tracks by applying the given search options.
 */
export function filter_tracks(
  tracks: Track[],
  options: SearchData,
): Track[]
{
  tracks = tracks.clone();

  let props = {
    name: options.name,
    query: options.query,
  };

  if (options.query) {
    let scores = tracks.map(each => (
      {
        data: each,
        score: calc_relevance(each, options.query, props)
      }
    ));
    scores.sort((prot, deut) => prot.score - deut.score);
    tracks = scores.map(each => each.data);
  }

  switch (options.sort) {
    case "plays":
      tracks.sort((prot, deut) => prot.plays - deut.plays);
      break;
  }

  if (options.reverse) {
    tracks.reverse();
  }

  return tracks;
}


function calc_relevance(
  target: Track,
  value: string,
  props: object,
): number
{
  if (!target) return -1;

  let scores = Object.entries(props).map(
    prop => (
      (prop[1] && target[prop[0]]) ? fuzzyRatio(target[prop[0]], prop[1]) : -1
    )
  );

  return Math.max(...scores);
}
