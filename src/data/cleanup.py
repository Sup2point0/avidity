'''
Utility script for alphabetically sorting tracks, playlists and artists data.
'''

import json


def clean(file: str):
  print(f">> python / cleaning {file}")
  with open(file) as source:
    load = json.load(source)

  out = {
    each: data
    for each, data in sorted(load.items())
  }

  with open(file) as dest:
    json.dump(out, dest, indent = 2)


if __name__ == "__main__":
  clean("tracks.json")
  clean("playlists.json")
  clean("artists.json")
