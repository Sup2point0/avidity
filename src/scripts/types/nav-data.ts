export class NavData
{
  page: "home" | "tracks" | "lists" = "home";
  popup: string | null = null;
  selected_track: string | null = null;
  selected_playlist: string | null = null;

  condensed_view: boolean = false;
  show_personal: boolean = false;
}
