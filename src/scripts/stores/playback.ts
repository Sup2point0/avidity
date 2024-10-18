import { persisted } from "svelte-persisted-store";

import PlaybackData from "#scripts/types";


export const playback = persisted<PlaybackData>("avid.play", new PlaybackData());
