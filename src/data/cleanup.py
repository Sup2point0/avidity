'''
Utility script for alphabetically sorting tracks, playlists and artists data.
'''

import json


def fill(data: str | dict) -> str | dict:
  if not isinstance(data, dict):
    return data
  
  data["plays"] = data.get("plays", 0)
  return data


def clean(file: str):
  print(f">>        / cleaning {file}")

  with open(file, "r") as source:
    load = json.load(source)

  out = {
    each: fill(data)
    for each, data in sorted(load.items())
  }

  with open(file, "w") as dest:
    json.dump(out, dest, indent = 2)
    dest.write("\n")


if __name__ == "__main__":
  print(">> python / running!")
  
  clean("tracks.json")
  clean("playlists.json")
  clean("artists.json")

  print(">> python / done!")
