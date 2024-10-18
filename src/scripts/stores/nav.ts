import { persisted } from "svelte-persisted-store";

import { NavData } from "#scripts/types";


export const nav = persisted<NavData>("avid.nav", new NavData());
