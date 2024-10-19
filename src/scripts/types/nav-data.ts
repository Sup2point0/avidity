export class NavData
{
  page: "home" | "tracks" | "lists" = "home";
  selected_track: string | null = null;

  condensed_wiew: boolean = false;
  show_personal: boolean = false;
}
