export class SearchData
{
  query: string = "";

  // The fields to match the query against.
  name: boolean = true;
  artist: boolean = true;
  album: boolean = true;
  list: boolean = true;

  // How to sort the results.
  sort: "rel" | "alpha" | "plays" = "rel";
  group: "artist" | "album" | null = null;
  reverse: boolean = false;
}
