import { persisted } from "svelte-persisted-store";

import { PrefsData } from "#scripts/types";


export const prefs = persisted<PrefsData>("avid.prefs", new PrefsData());
