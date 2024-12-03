export class NavData
{
  page: "home" | "tracks" | "lists" | "list" = "tracks";
  popup: string | null = null;
  notifs: string[] = [];
  
  selected_track: string | null = null;
  selected_playlist: string | null = null;

  condensed_view: boolean = false;
  show_personal: boolean = false;
}
