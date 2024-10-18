export class NavData
{
  page: "home" | "tracks" | "lists" = "home";
  selectedTrack: string | null = null;

  condensedView: boolean = false;
  showPersonal: boolean = false;
}
