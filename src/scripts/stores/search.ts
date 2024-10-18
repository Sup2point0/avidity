import { persisted } from "svelte-persisted-store";

import SearchData from "#scripts/types";


export const search = persisted<SearchData>("avid.search", new SearchData());
