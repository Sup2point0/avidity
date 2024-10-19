let data = await import("../../data/artists.json")

export const Artists: ArtistsData = data.default;


interface ArtistsData
{
  [artist: string]: string;
}
