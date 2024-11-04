export class SearchData
{
  query: string = "";
  name: string = "";
  artist: string = "";
  lists: string[] = [];

  sort: "alpha" | "plays" = "plays";
  reverse: boolean = false;
}
