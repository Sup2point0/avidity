import { ratio as fuzzyRatio } from "fuzzball";

import type { Track, SearchData } from "#scripts/types";


interface ScoredTrack {
  data: Track;
  score: number;
}


/*
 * Filters a list of tracks by applying the given search options.
 */
export function filter_tracks(
  tracks: (Track | null)[],
  options: SearchData,
): Track[]
{
  let out = tracks.filter(Boolean) as Track[];

  let fields = [
    options.name ? "name" : null,
    options.artist ? "artist" : null,
    options.album ? "album" : null,
    options.list ? "list" : null,
  ].filter(Boolean);

  // FILTER
  let scores: ScoredTrack[] = [];

  if (options.query) {
    scores = out.map(each => (
      {
        data: each,
        score: calc_relevance(each, options.query, fields)
      }
    ));
  }

  console.log("out =", out);

  // SORT
  switch (options.sort) {
    case "rel":
    case null:
      if (scores) {
        scores.sort((prot, deut) => prot.score - deut.score);
        out = scores.map(each => each.data);
      }
      break;

    case "alpha":
      if (scores) {
        out = keep_relevant(scores, 0.1).map(each => each.data);
      }
      out.sort((prot, deut) => prot.name.localeCompare(deut.name));
      break;

    case "plays":
      if (scores) {
        out = keep_relevant(scores, 0.1).map(each => each.data);
      }
      out.sort((prot, deut) => prot.plays - deut.plays);
      break;
  }

  if (options.reverse) {
    out.reverse();
  }

  console.log("out =", out);
  return out;
}


function calc_relevance(
  source: Track | null,
  query: string,
  fields: (string | null)[],
): number
{
  if (!source) return -1;

  let scores = fields.map(
    field => (
      field ? fuzzyRatio(source[field], query) : -1
    )
  );

  return Math.max(...scores);
}


function keep_relevant(
  scores: ScoredTrack[],
  threshold: number
): ScoredTrack[]
{
  return scores.filter(each => each.score > threshold);
}
