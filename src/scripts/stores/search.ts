import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";

import { SearchData } from "#scripts/types";


export const search = persisted<SearchData>("avid.search", new SearchData());
export const searchDirty = writable(true);
