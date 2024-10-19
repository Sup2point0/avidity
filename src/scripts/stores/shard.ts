import { persisted } from "svelte-persisted-store";


class ShardData
{
  valid = false;
}

export const shard = persisted<ShardData>("avid.shard", new ShardData());
