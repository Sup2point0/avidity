export class SearchData
{
  dirty: boolean = true;

  query: string = "";
  name: string = "";
  artist: string = "";
  lists: string[] = [];

  sort: "alpha" | "plays" = "plays";
  reverse: boolean = false;
}
