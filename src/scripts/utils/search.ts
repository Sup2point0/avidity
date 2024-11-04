import type { Track, SearchData } from "#scripts/types";


/*
 * Filters a list of tracks by applying the given search options.
 */
export function filter_tracks(
  tracks: Track[],
  options: SearchData,
): Track[]
{
  let tracks = tracks.clone();

  let props = {
    name: options.name;
    query: 
  };

  if (options.value) {
    tracks = tracks.map(each => {
      data: each,
      score: calc_relevance(each, options.value, props)
    });
    tracks.sort((prot, deut) => prot.score - deut.score);
    tracks = tracks.map(each => each.data);
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
    (prop, state) => (
      (state && target[prop]) ? ratio(target[prop], value)) : -1
    )
  );

  return Math.max(scores);
}
