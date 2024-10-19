'''
Avidity Cloud Engine
Archived from napkin.io
2024 October 19
'''

import json
import os
from base64 import b64decode, b64encode

import requests
from requests_oauthlib import OAuth1

from napkin import (
    request as REQUEST,
    response as RESPONSE,
    store as STORE,
)


SOURCE = "https://api.github.com/repos/Sup2point0/avidity/contents/src/data/tracks.json"

class CodeError(Exception):
    '''Exception raised with a status code and message.'''

    def __init__(self, code: int, body: str = None):
        self.code = code
        self.body = body


## Core

def process_request(methods: dict):
    try:
        validate_shard()

        handle = methods.get(REQUEST.method, None)
        if handle is None:
            raise CodeError(500, "Invalid request method!")
        
        handle()

    except CodeError as e:
        RESPONSE.status_code = e.code
        RESPONSE.body = e.body

    except AssertionError:
        RESPONSE.status_code = 500

    else:
        if not RESPONSE.status_code:
            RESPONSE.status_code = 200


def validate_shard():
    '''Check API passkey is correct.'''

    shard = REQUEST.body.get("shard", None)
    
    if shard is None:
        raise CodeError(401, "No shard provided!")

    if shard != os.environ["shard"]:
        raise CodeError(401, "Invalid shard!")


## Methods

def put():
    '''Update tracks data.'''

    tracks = REQUEST.body.get("tracks", None)

    if tracks is None:
        raise CodeError(400, "No track data provided!")

    data, sha = get_github()

    for track, info in tracks.items():
        current = data[track]

        plays = info.get("plays", None)
        if plays is not None:
            current["plays"] = plays

        lists = info.get("lists", None)
        if lists is not None:
            for playlist in lists:
                if playlist not in current:
                    current["lists"].append(playlist)
    
    save_github(data, sha)


## Callbacks

def get_github() -> tuple[dict, str]:
    '''Fetch existing tracks data from GitHub via REST API.'''

    data = requests.get(SOURCE).json()

    sha = data.get("sha", None)
    encoded = data.get("content", None)

    if None in (sha, encoded):
        raise CodeError(500, "Could not load existing tracks data!")
    
    decoded = b64decode(encoded).decode("utf-8")
    return json.loads(decoded), sha


def save_github(data: dict, sha: str) -> dict:
    '''Upload new tracks data to GitHub via REST API.'''

    export = json.dumps(data, indent = 2)
    encoded = b64encode(export.encode("utf-8"))

    response = requests.put(SOURCE,
        headers = {
            "accept": "application/vnd.github+json",
            "Authorization": "Bearer " + os.environ['key'],
        },
        json = {
            "message": "update tracks data",
            "content": encoded,
            "sha": sha,
        },
    )

    return response.json()


## Execute

print("status / running!")

process_request(methods = {
    "PUT": put,
})

print("status / done!")
