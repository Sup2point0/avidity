/// Exports the `$changes` store for tracking changes to track and playlist data, which should be sent to the Napkin API.

import { persisted } from "svelte-persisted-store";

import { Changes } from "#scripts/types";


export const changes = persisted<Changes>("avid.changes", new Changes());
